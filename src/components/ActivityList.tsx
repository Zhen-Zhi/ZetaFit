import { StyleSheet, Text, View, Image, Modal, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedModal from './AnimatedModal'
import { router, useLocalSearchParams } from 'expo-router'
import { themeColors } from '../constants/Colors'
import ProfileScreen from '../app/(user)/homepage/profile/profileModal'
import { SafeAreaProvider, SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { Tables } from '../database.types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import ActivityDetailsScreenModal from './ActivityDetails'
import { useDeleteActivity } from '../api/activity'
import { useUpdateUser, useUserData } from '../api/users'

dayjs.extend(relativeTime);

type ClanMemberProps = {
  activity: Tables<'user_activities'>
}

const ActivityList = ({ activity }: ClanMemberProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [activityDetailsModalVisible, setActivityDetailsModalVisible] = useState(false)

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useUserData(activity.user_id);

  const { mutate: deleteActivity } = useDeleteActivity();
  const { mutate: updateUser } = useUpdateUser();

  if(userDataIsLoading) {
    return <ActivityIndicator />
  }

  if(!userData) {
    console.log("userData nor found.")
    return
  }

  const handleDeleteActivity = () => {
    setIsDeleting(true)

    deleteActivity(
      { activityId: activity.id, userId: activity.user_id }, 
      {
        onSuccess() {
          if(dayjs(activity.created_at).isAfter(dayjs().subtract(30, 'day'))) {
            updateUser(
              {
                id: activity.user_id,
                active_score: userData?.active_score - activity.active_score
              }, 
              {
                onSuccess() {
                  console.log("Success")
                  setModalVisible(false)
                  setIsDeleting(false)
                },
                onError() {
                  console.log("error in deleting activity")
                  setIsDeleting(false)
                }
              }
            )
          } else {
            console.log("Success")
            setModalVisible(false)
            setIsDeleting(false)
          }
        }
      }
    )
  }

  return (
    <View>
      <AnimatedPressable
        onLongPress={() => setModalVisible(true)}
        pressInValue={0.97}
        className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      >
        <View className='flex-row'>
          <Image 
            source={require('@asset/images/swimming.png')}
            className='my-auto aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto max-w-[60%]'>
              <Text className='text-lg font-bold'>{activity.activity_title}</Text>
              <Text className='font-semibold text-slate-600'>{dayjs(activity.created_at).fromNow()}</Text>
            </View>
            <View className='flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2'>
              <FontAwesome6 name="fire" size={28} color="rgba(240, 93, 9, 0.8)" />
              <Text className='text-center text-lg rounded font-semibold ml-2'>{activity.active_score}</Text>
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
        <ImageBackground source={require('@asset/images/background_image.png')} className='p-4'>
        <AnimatedPressable 
          pressInValue={0.97}
          className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
          onPress={() => setActivityDetailsModalVisible(true)}
        >
          <View className='flex-row'>
            <Image 
            source={require('@asset/images/running.png')}
            className='aspect-square w-14 h-14 rounded-xl'
            />
            <View className='flex-1 flex-row justify-between'>
              <View className='flex-col ml-4 my-auto'>
                <Text className='text-lg font-bold'>{activity.activity_title}</Text>
                <Text className='font-semibold text-slate-600'>{dayjs(activity.created_at).fromNow()}</Text>
              </View>
            </View>
          </View>
        </AnimatedPressable>
        <View className='flex-col justify-between mt-6'>
          <AnimatedPressable
            className='p-1 rounded-lg border border-slate-500 bg-white'
            pressInValue={0.95}
            onPress={() => setActivityDetailsModalVisible(true)}
          >
            <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>View Details</Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={{ backgroundColor: isDeleting ? themeColors.disabled : themeColors.danger }}
            className='p-1.5 rounded-lg mt-2'
            pressInValue={0.95}
            onPress={handleDeleteActivity}
            disabled={isDeleting}
          >
            {
              isDeleting
                ?
              <ActivityIndicator />  
                :
              <Text className='text-lg text-center font-bold text-white'>Delete</Text>
            }
          </AnimatedPressable>
        </View>
        </ImageBackground>
      </AnimatedModal>
      </Modal>

      <Modal
        animationType='fade'
        visible={activityDetailsModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setActivityDetailsModalVisible(false)}
      >
        <SafeAreaProvider className='flex-1'>
          <SafeAreaView className='flex-1' edges={['top']}>
            <ActivityDetailsScreenModal activity={activity} onClose={() => setActivityDetailsModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </View>
  )
}

export default ActivityList

const styles = StyleSheet.create({})