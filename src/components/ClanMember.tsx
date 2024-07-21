import { StyleSheet, Text, View, Image, Modal, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedModal from './AnimatedModal'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { themeColors } from '../constants/Colors'
import ProfileScreen from '../app/(user)/homepage/profile/profileModal'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Tables } from '../database.types'
import { useAuth } from '../providers/AuthProvider'
import { useEditClanMemberRole, useInsertClanLog, useLeaveClan } from '../api/clan'
import ClanLoadingScreenComponent from './ClanLoadingScreen'
import { useUpdateUserClanId } from '../api/users'

type ClanMemberProps = {
  member: { users: Tables<'users'> | null } &Tables<'clan_members'> | null;
  role: string | null | undefined;
  clanMemberViewerId: number | undefined;
}

const ClanMember = ({ member, role, clanMemberViewerId }: ClanMemberProps) => {
  const { session } = useAuth()
  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  if(!member) {
    console.log("Clan member not found. debug in '/components/ClanMember.tsx'")
    return <ClanLoadingScreenComponent />
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [profileModalVisible, setProfileModalVisible] = useState(false)
  const [highLevelMember, setHighLevelMember] = useState(0);
  const [allowPromoteAndKick, setAllowPromoteAndKick] = useState(false);
  const [allowDemote, setAllowDemote] = useState(false);
  // 1 = member, 2 = Co-Leader, 3 = Leader, 0 = guest

  const { mutate: editMemberRole } = useEditClanMemberRole()
  const { mutate: kickMember } = useLeaveClan()
  const { mutate: insertClanLog } = useInsertClanLog()
  const { mutate: updateUserClanId } = useUpdateUserClanId()

  const checkRoleForPromote = () => {
    if(member.user_id == session.user.id) {
      return false
    }
    switch(member.role) {
      case "Leader":
        return false
      case "Co-Leader": 
        return highLevelMember > 2
      default:
        return highLevelMember > 1
    }
  }

  const checkRoleForDemote = () => {
    if(member.user_id == session.user.id && member.role != "Leader" && member.role != "Member") {
      return true
    }
    switch(member.role) {
      case "Leader":
        return false
      case "Co-Leader": 
        return highLevelMember > 2
      default:
        return false
    }
  }

  const handlePromote = () => {
    console.log("In promote")
    if(!clanMemberViewerId) {
      console.log("You are not authorized!")
      return
    }

    const clanId = member.clan_id;
    const clanMemberId = member.id;

    if(member.role == "Member") {       // promote
      editMemberRole(    
        { clanId, clanMemberId, role: "Co-Leader" }, 
        {
          onSuccess() {
            console.log("Promote member success");
            setModalVisible(false);
          },
          onError() {
            console.log("Promote error")
          }
        }
      )
    }
    else if(member.role == "Co-Leader") {       // promote co-leader to leader
      const clanMemberLeaderId = clanMemberViewerId;
      editMemberRole(
        { clanId, clanMemberId, role: "Leader" }, 
        {
          onSuccess() {
            console.log("Promote Co-Leader to leader success");
            editMemberRole(
              { clanId, clanMemberId: clanMemberLeaderId, role: "Co-Leader" },
              {
                onSuccess() {
                  console.log("Demote leader to co leader success");
                },
                onError() {
                  editMemberRole(
                    { clanId, clanMemberId, role: "Co-Leader" },
                    {
                      onSuccess() {
                        console.log("Demote back to co leader success");
                      }
                    }
                  )
                }
              }
            )
          },
          onError() {
            console.log("Promote co leader error")
          }
        }
      )
    }
  }

  const handleDemote = () => {
    if(!clanMemberViewerId) {
      console.log("You are not authorized!")
      return
    }

    const clanId = member.clan_id;
    const clanMemberId = member.id;

    if(member.role == "Co-Leader") {
      editMemberRole(    
        { clanId, clanMemberId, role: "Member" }, 
        {
          onSuccess() {
            console.log("Demote member success");
            setModalVisible(false);
          },
          onError() {
            console.log("Demote error")
          }
        }
      )
    }
  }

  const handleKickMember = () => {
    if(!clanMemberViewerId) {
      console.log("You are not authorized!")
      return
    }

    const clanId = member.clan_id;
    const clanMemberId = member.id;
    const kickedUserId = member.user_id;

    kickMember(    
      { clanId, clanMemberId, userId: kickedUserId }, 
      {
        onSuccess() {
          updateUserClanId(
            { clanId, userId: kickedUserId }, 
            {
              onSuccess() {
                insertClanLog(
                  { 
                    clan_id: clanId, 
                    user_id: null, 
                    message: `${member.users?.username} had been kicked` 
                  }
                )
              }
            }
          )
          console.log("Kick member success");
          setModalVisible(false);
        },
        onError() {
          console.log("Kick error")
        }
      }
    )
  }

  useEffect(() => {
    if(role == 'Leader') {
      setHighLevelMember(3);
    }
    else if(role == 'Co-Leader') {
      setHighLevelMember(2);
    }
    else if(role == 'Member') {
      setHighLevelMember(1)
    }
    else {
      setHighLevelMember(0);
    }

    setAllowPromoteAndKick(checkRoleForPromote);
    setAllowDemote(checkRoleForDemote)
  }, [handleDemote, handlePromote])

  return (
    <View>
      <AnimatedPressable
        onLongPress={() => setModalVisible(true)}
        pressInValue={0.97}
        className={
          `border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 
          ${ member?.user_id == session?.user.id ? 'bg-green-200' : 'bg-white' } `
        }
      >
        <View className='flex-row'>
          <Image 
          source={require('@asset/images/CyberKongz.jpg')}
          className='aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>{member?.users?.username}</Text>
              <Text className='font-semibold text-slate-600'>{member?.role}</Text>
            </View>
            <View className={
              `flex-row my-auto mr-2 rounded-lg p-2
              ${ member?.user_id == session?.user.id ? 'bg-white' : 'bg-slate-200' }`
            }>
              <FontAwesome6 name="fire" size={28} color="rgba(240, 93, 9, 0.8)" />
              <Text className='text-center text-lg rounded font-semibold ml-2'>{member?.users?.active_score}</Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>

      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
      <AnimatedModal onClose={() => setModalVisible(false)}>
        <ImageBackground 
          source={require('@asset/images/background_image.png')} 
          className='p-4'
        >
        <AnimatedPressable 
          pressInValue={0.97}
          className={
            `border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 
            ${ member?.user_id == session?.user.id ? 'bg-green-200' : 'bg-white' } `
          }
        >
          <View className='flex-row'>
            <Image 
            source={require('@asset/images/CyberKongz.jpg')}
            className='aspect-square w-14 h-14 rounded-xl'
            />
            <View className='flex-1 flex-row justify-between'>
              <View className='flex-col ml-4 my-auto'>
                <Text className='text-lg font-bold'>{member.users?.username}</Text>
                <Text className='font-semibold text-slate-600'>{member.role}</Text>
              </View>
            </View>
          </View>
        </AnimatedPressable>
          <View className='flex-col justify-between mt-6'>
            <AnimatedPressable
              className='p-1 rounded-lg border border-slate-500 bg-white'
              pressInValue={0.95}
              onPress={() => setProfileModalVisible(true)}
            >
              <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>View Profile</Text>
            </AnimatedPressable>

            <View className='flex-row mt-1'>
              <AnimatedPressable
                className='p-1 rounded-lg border border-slate-500 my-1 flex-1 mr-1 bg-white'
                pressInValue={0.95}
                disabled={!allowPromoteAndKick}
                onPress={handlePromote}
              >
                <Text style={{ color: allowPromoteAndKick ? themeColors.secondary : themeColors.disabled }} className='text-lg text-center font-bold text-white'>Promote</Text>
              </AnimatedPressable>

              <AnimatedPressable
                className='p-1 rounded-lg border border-slate-500 my-1 flex-1 ml-1 bg-white'
                pressInValue={0.95}
                disabled={!allowDemote}
                onPress={handleDemote}
              >
                <Text style={{ color: allowDemote ? themeColors.danger : themeColors.disabled }} className='text-lg text-center font-bold text-white'>Demote</Text>
              </AnimatedPressable>
            </View>

            <AnimatedPressable
              style={{ backgroundColor: allowPromoteAndKick ? themeColors.danger : themeColors.disabled }}
              className='p-1.5 rounded-lg mt-2'
              pressInValue={0.95}
              disabled={!allowPromoteAndKick}
              onPress={handleKickMember}
            >
              <Text className='text-lg text-center font-bold text-white'>Kick</Text>
            </AnimatedPressable>
          </View>
        </ImageBackground>
      </AnimatedModal>
      </Modal>

      <Modal
        animationType='fade'
        visible={profileModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setProfileModalVisible(false)}
      >
        <SafeAreaProvider className='flex-1'>
          <SafeAreaView className='flex-1' edges={['top']}>
            <ProfileScreen onClose={() => setProfileModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </View>
  )
}

export default ClanMember

const styles = StyleSheet.create({})