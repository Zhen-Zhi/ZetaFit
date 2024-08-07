import { ImageBackground, StyleSheet, Text, View, Image, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedModal from '@/src/components/AnimatedModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useClanDetails, useClanMembers, useDeleteClan, useEditClanMemberRole, useInsertClanLog, useJoinClan, useLeaveClan } from '@/src/api/clan'
import { useAuth } from '@/src/providers/AuthProvider'
import ClanLoadingScreenComponent from '@/src/components/ClanLoadingScreen'
import { useUpdateUserClanId, useUserData } from '@/src/api/users'
import TabLayout from './clanDetailTabs'
import RemoteImage from '@/src/components/RemoteImage'

const ClanDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const clanId = parseInt(typeof id == 'string' ? id : id?.[0] ?? '0')
  const { session } = useAuth();
  const [isClanMember, setIsClanMember] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [insufficientActiveScoreModalVisible, setInsufficientActiveScoreModalVisible] = useState(false);
  const [highLevelMember, setHighLevelMember] = useState(false);
  const [leaveClanLoading, setLeaveClanLoading] = useState(false)

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { 
    data: clanDetails, 
    isLoading: clanDetailsLoading, 
    error: clanDetailsError 
  } = useClanDetails(clanId)

  const {
    data: clanMembers, 
    isLoading: clanMembersLoading, 
    error: clanMembersError 
  } = useClanMembers(clanId)

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData(session.user.id)

  

  const { mutate: joinClan } = useJoinClan()
  const { mutate: leaveClan } = useLeaveClan()
  const { mutate: updateUserClanId } = useUpdateUserClanId()
  const { mutate: insertClanLog } = useInsertClanLog()
  const { mutate: editMemberRole } = useEditClanMemberRole()
  const { mutate: deleteClan } = useDeleteClan()

  useEffect(() => {
    if (clanMembers?.some(member => member.user_id === session.user.id)) {
      setIsClanMember(true);
      const getUserrole = clanMembers.find((member) => member.user_id == session.user.id)
      setHighLevelMember(getUserrole?.role == 'Leader' || getUserrole?.role == 'Co-Leader')
    }
  },[clanMembers])

  if(clanDetailsLoading || clanMembersLoading) {
    return <ClanLoadingScreenComponent />
  }

  if(!clanMembers) {
    console.log("Clan members not found. debug in '/clan/clan_detials/[id].tsx'")
    return <ClanLoadingScreenComponent />
  }

  if(!clanDetails) {
    console.log("Clan details not found. debug in '/clan/clan_detials/[id].tsx'")
    return <ClanLoadingScreenComponent />
  }

  if(!userData) {
    console.log("User data not found. debug in '/clan/clan_detials/[id].tsx'")
    return <ClanLoadingScreenComponent />
  }
  
  const handleCLanInOut = () => {
    const userId = session.user.id
    const clanId = clanDetails.clan_id
    const username = userData.username

    if(isClanMember) {
      setModalVisible(true)
    }
    else {
      if(userData?.active_score < clanDetails.required_active_score) {
        setInsufficientActiveScoreModalVisible(true)
        return
      }

      joinClan(
        {
          clanId: clanId,
          newMember: { clan_id: clanId, user_id: userId, },
          userId: userId,
        },
        {
          onSuccess() {
            updateUserClanId(
              { userId, clanId }, 
              {
                onSuccess() {
                  setIsClanMember(true);
                  router.push(`/clan/clan_details/clanActivityLog/${clanId}`);
                },
                onError() {
                  console.log("Error update user clan ID")
                }
              }
            )
            insertClanLog(
              { 
                clan_id: clanId, 
                user_id: null, 
                message: `${username} had join the clan` 
              }, 
            )
          },
          onError(error) {
            console.log(error.message)
          }
        }
      )
    }
  }

  const handleLeaveClan = () => {
    setModalVisible(false)
    setLeaveClanLoading(true)
    const userDataInClan = clanMembers.find((member) => member.user_id == session.user.id)

    if(!userDataInClan) {
      console.log('Id not found, cannot leave clan')
      return
    }

    leaveClan(
      { 
        clanId: userDataInClan.clan_id, 
        clanMemberId: userDataInClan.id, 
        userId: userDataInClan.user_id 
      },
      {
        onSuccess() {

          updateUserClanId(
            { userId: userDataInClan.user_id, clanId: null }, 
            {
              onSuccess() {
                if(userDataInClan.role == "Leader") {
                  const coLeader = clanMembers.find((member) => member.role == "Co-Leader")

                  if(!coLeader) {
                    const randomMember = clanMembers.find((member) => member.role == "Member")
                    if(!randomMember) {
                      deleteClan(
                        userDataInClan.clan_id, 
                        {
                          onSuccess() {
                            setLeaveClanLoading(false);
                            setIsClanMember(false);
                            router.replace('/clan')
                            return
                          },
                          onError(e) {
                            console.log("Unable to delete clan")
                            console.log(e.message)
                          }
                        }
                      )
                      return
                    }

                    editMemberRole(
                      { clanId: clanId, clanMemberId: randomMember?.id, role: "Leader" }, 
                      {
                        onSuccess() {
                          insertClanLog(
                            { 
                              clan_id: clanId, 
                              user_id: null, 
                              message: `${userDataInClan.users?.username} had left the clan` 
                            }, 
                            {
                              onSuccess() {
                                console.log("Msg insert successful")
                                setLeaveClanLoading(false);
                                setIsClanMember(false);
                                router.replace('/clan')
                              }
                            }
                          )
                        }
                      }
                    )
                    return
                  }

                  editMemberRole(
                    { clanId: clanId, clanMemberId: coLeader?.id, role: "Leader" }, 
                    {
                      onSuccess() {
                        insertClanLog(
                          { 
                            clan_id: clanId, 
                            user_id: null, 
                            message: `${userDataInClan.users?.username} had left the clan` 
                          }, 
                          {
                            onSuccess() {
                              setLeaveClanLoading(false);
                              setIsClanMember(false);
                              router.replace('/clan')
                            }
                          }
                        )
                      }
                    }
                  )
                }
                insertClanLog(
                  { 
                    clan_id: clanId, 
                    user_id: null, 
                    message: `${userDataInClan.users?.username} had left the clan` 
                  }, 
                  {
                    onSuccess() {
                      setLeaveClanLoading(false);
                      setIsClanMember(false);
                      router.replace('/clan')
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
  }

  const handleGoClanWar = () => {
    if(clanDetails.battle_status == "On Battle") {
      router.push(`clan/clan_war/clanWar?clan_id=${clanId}`)
    } else {
      router.push(`clan/clan_war/clanPreWar?clan_id=${clanId}&battle_status=${clanDetails.battle_status}`)
    }
  }
    

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >
    
    {/* Clan Details top part */}
    <View className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pb-2 px-4 border-b border-slate-300`}>
        {/* <Link href={'/clan'} asChild> */}
          <AnimatedPressable 
            pressInValue={0.9} 
            className={`z-10 absolute left-3 bottom-2 ${userData.clan_id == clanId && 'hidden'}`}
            onPress={() => router.replace('/clan')}
          >
            <View className='p-1'>
              <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        {/* </Link> */}
        <AnimatedPressable 
          pressInValue={0.9} 
          className={`z-10 absolute right-3 bottom-3 ${ !isClanMember && 'h-0' }`}
          onPress={handleGoClanWar}
        >
          <View className='my-auto'>
            <MaterialCommunityIcons name="sword-cross" size={28} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>CLAN</Text>
      </View>

      <View className='flex-row my-3'>
        <View>
          {/* <Image 
            className='w-[120px] h-36 mx-4'
            source={require('@asset/images/clan_logo/clan_logo_1.png')}
          /> */}
          <RemoteImage
            classNameAsProps='w-[120px] h-36 mx-4'
            path={clanDetails.clan_logo} 
            fallback={require('@asset/images/clan_logo/clan_logo_no_clan.png')}
            bucket='clan_logo'
          />

          { highLevelMember 
            &&
            <AnimatedPressable
              pressInValue={0.95}
            >
              <Text style={{ color: themeColors.secondary }} className='text-lg font-bold text-center'>Edit</Text>
            </AnimatedPressable>
          }
        </View>
        <View className='flex-1 pr-4'>
          <Text style={{ color: themeColors.primary }} className='text-[24px] text-left font-[800]'>{clanDetails.clan_name}</Text>
          <Text numberOfLines={4} style={{ color: themeColors.secondary }} className='font-semibold mt-1 text-justify'>{clanDetails.clan_description}</Text>
          <View className='flex-row mt-auto justify-between'>
            <AnimatedPressable 
              style={{ backgroundColor: isClanMember ? themeColors.danger : userData.clan_id != null ? themeColors.disabled : themeColors.secondary }}
              className='w-[75%] rounded-xl p-2'
              pressInValue={0.95}
              onPress={() => handleCLanInOut()}
              disabled={
                isClanMember 
                  ? false 
                  : (
                    userData.clan_id != null
                      ? false
                      : (
                        clanMembers.length >= 25
                          ? true
                          : false
                      )
                  )
                }
              >
              { isClanMember
                ? 
                <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-lg text-center' >Leave</Text>
                :
                <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-lg text-center' >Join Clan</Text>
              }
            </AnimatedPressable>
            { isClanMember && 
              <AnimatedPressable 
                style={{ backgroundColor: themeColors.secondary }}
                className='w-[20%] rounded-xl p-2'
                pressInValue={0.95}
                onPress={() => router.push(`clan/clan_details/clanActivityLog/${clanId}`)}
                >
                  <View className='m-auto'>
                    <Entypo name="chat" size={24} color="white" />
                  </View>
              </AnimatedPressable>
            }
          </View>
        </View>
      </View>
      <TabLayout isClanMember={isClanMember} clanId={clanId} clanDetails={clanDetails}/>
      {/* <CustomTabLayout isClanMember={isClanMember} clanId={clanId} clanDetails={clanDetails}/> */}
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <AnimatedModal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
          <View className='p-4'>
            <Text style={{ color: themeColors.danger }} className='font-extrabold text-2xl'>Leave Clan</Text>
            <Text style={{ color: themeColors.primary }} className='font-bold text-lg'>Are you sure you want to leave clan?</Text>
            <View className='flex-row justify-around mt-6'>
              <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='rounded-lg px-3 py-2 w-5/12' pressInValue={0.95} onPress={() => setModalVisible(false)}>
              <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Stay</Text>
              </AnimatedPressable>
              <AnimatedPressable style={{ backgroundColor: themeColors.danger }} className='rounded-lg px-3 py-2 w-5/12' pressInValue={0.95} onPress={() => handleLeaveClan()}>
              <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Leave</Text>
              </AnimatedPressable>
            </View>
          </View>
        </AnimatedModal>
      </Modal>

      <Modal
        animationType='fade'
        visible={leaveClanLoading}
        presentationStyle='overFullScreen'
        transparent={true}
      >
        <AnimatedModal modalVisible={leaveClanLoading} onClose={() => {}}>
          <View className='p-4'>
            <Text style={{ color: themeColors.danger }} className='font-extrabold text-2xl'>Leave Clan</Text>
            <ActivityIndicator className='mt-8' size={64} color={themeColors.tetiary} />
            <View className='flex-row justify-around mt-6'>
              <Text style={{ color: themeColors.secondary }} className='font-bold text-lg'>Leaving Clan ......</Text>
            </View>
          </View>
        </AnimatedModal>
      </Modal>

      <Modal
        animationType='fade'
        visible={insufficientActiveScoreModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setInsufficientActiveScoreModalVisible(false)}
      >
        <AnimatedModal modalVisible={insufficientActiveScoreModalVisible} onClose={() => setInsufficientActiveScoreModalVisible(false)}>
          <View className='p-4'>
            <Text style={{ color: themeColors.danger }} className='font-extrabold text-2xl'>Insufficient Active Score</Text>
            <Text style={{ color: themeColors.primary }} className='font-bold text-lg mt-2'>Your active score is below the clan required active score.</Text>
            <View className='flex-row justify-around mt-6'>
              <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='rounded-lg px-3 py-2 w-5/12' pressInValue={0.95} onPress={() => setInsufficientActiveScoreModalVisible(false)}>
              <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>OK</Text>
              </AnimatedPressable>
            </View>
          </View>
        </AnimatedModal>
      </Modal>

    </View>
    </ImageBackground>
    </SafeAreaView>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})