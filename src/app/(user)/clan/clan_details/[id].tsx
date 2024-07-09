import { ImageBackground, StyleSheet, Text, View, Image, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import TabLayout from './clanDetailTabs'
import { themeColors } from '@/src/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedModal from '@/src/components/AnimatedModal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useClanDetails, useClanMembers, useJoinClan, useLeaveClan } from '@/src/api/clan'
import { useAuth } from '@/src/providers/AuthProvider'
import ClanLoadingScreenComponent from '@/src/components/ClanLoadingScreen'
import { useUserData } from '@/src/api/users'

const ClanDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const clan_id = parseInt(typeof id == 'string' ? id : id?.[0] ?? '0')
  const { session } = useAuth();
  const [haveClan, setHaveClan] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { 
    data: clanDetails, 
    isLoading: clanDetailsLoading, 
    error: clanDetailsError 
  } = useClanDetails(clan_id)

  const {
    data: clanMembers, 
    isLoading: clanMembersLoading, 
    error: clanMembersError 
  } = useClanMembers(clan_id)

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData(session.user.id)

  const { mutate: joinClan } = useJoinClan()
  const { mutate: leaveClan } = useLeaveClan()

  useEffect(() => {
    if (clanMembers?.some(member => member.user_id === session.user.id)) {
      setHaveClan(true);
      const getUserrole = clanMembers.find((member) => member.user_id == session.user.id)
      setAllowEdit(getUserrole?.role == 'Leader' || getUserrole?.role == 'Co-Leader')
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

    if(haveClan) {
      setModalVisible(true)
    }
    else {
      if(userData?.active_score < clanDetails.required_active_score) {
        console.log("Active Score not enufff")
        return
      }

      joinClan(
        { userId, clanId },
        {
          onSuccess() {
            setHaveClan(true);
            router.push('/clan/clan_details/clanActivityLog');
          },
          onError(error) {
            console.log(error.message)
          }
        }
      )
    }
  }

  const handleLeaveClan = () => {
    const userDataInClan = clanMembers.find((member) => member.user_id == userData.id)

    if(!userDataInClan) {
      console.log('Id not found, cannot leave clan')
      return
    }

    leaveClan(userDataInClan.id);
    setModalVisible(false);
    router.navigate('/clan')
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
            className='z-10 absolute left-3 bottom-2'
            onPress={() => router.navigate('/clan')}
          >
            <View className='p-1'>
              <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        {/* </Link> */}
        <AnimatedPressable 
          pressInValue={0.9} 
          className={`z-10 absolute right-3 bottom-3 ${ !haveClan && 'h-0' }`}
          onPress={() => router.push('clan/clan_war/clanWar')}
        >
          <View className='my-auto'>
            <MaterialCommunityIcons name="sword-cross" size={28} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>CLAN</Text>
      </View>

      <View className='flex-row my-3'>
        <View>
          <Image 
            className='w-[120px] h-36 mx-4'
            source={require('@asset/images/clan_logo/clan_logo_1.png')}
          />
          { allowEdit 
            &&
            <AnimatedPressable
              pressInValue={0.95}
            >
              <Text style={{ color: themeColors.secondary }} className='text-lg font-bold text-center'>Edit</Text>
            </AnimatedPressable>
          }
        </View>
        <View className='flex-1 pr-4'>
          <Text style={{ color: themeColors.primary }} className='text-[24px] text-left font-[800]'>{clanDetails?.clan_name}</Text>
          <Text numberOfLines={4} style={{ color: themeColors.secondary }} className='font-semibold mt-1 text-justify'>{clanDetails?.clan_description}</Text>
          <View className='flex-row mt-auto justify-between'>
            <AnimatedPressable 
              style={{ backgroundColor: haveClan ? themeColors.danger : themeColors.secondary }}
              className='w-[75%] rounded-xl p-2'
              pressInValue={0.95}
              onPress={() => handleCLanInOut()}
              >
              {haveClan 
                ? 
                <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-lg text-center' >Leave</Text>
                :
                <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-lg text-center' >Join Clan</Text>
              }
            </AnimatedPressable>
            { haveClan && <AnimatedPressable 
              style={{ backgroundColor: themeColors.secondary }}
              className='w-[20%] rounded-xl p-2'
              pressInValue={0.95}
              onPress={() => router.push('/clan/clan_details/clanActivityLog')}
              >
                <View className='m-auto'>
                  <Entypo name="chat" size={24} color="white" />
                </View>
            </AnimatedPressable>}
          </View>
        </View>
      </View>
      <TabLayout haveClan={haveClan} clanId={clan_id} clanDetails={clanDetails}/>
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
    </View>
    </ImageBackground>
    </SafeAreaView>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})