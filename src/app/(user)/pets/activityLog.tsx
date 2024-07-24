import { ActivityIndicator, FlatList, ImageBackground, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import ActivityList from '@/src/components/ActivityList'
import AddActivityScreenModal from '@/src/components/AddActivity'
import { useUserActivities } from '@/src/api/activity'
import { useAuth } from '@/src/providers/AuthProvider'
import { useUserData } from '@/src/api/users'

const ActivityLogScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const [addActivityModalVisible, setAddActivityModalVisible] = useState(false)

  const { data: userData, error, isLoading } = useUserData(session.user.id)

  const {
    data: userActivities,
    error: userActivitiesError,
    isLoading: userActivitiesIsLoading,
  } = useUserActivities(session?.user.id)

  if(!userActivities) {
    console.log("User activity not found. Debug in '/(user)/pets/activityLog'")
    return <ActivityIndicator />
  }

  if(!userData) {
    console.log("User data not found. Debug in '/(user)/pets/activityLog'")
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require('@asset/images/background_image.png')}
        className='flex-1'
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-between pt-2 pb-1 px-4 border-b border-slate-300'>
          <AnimatedPressable 
            pressInValue={0.9}
            className='z-10'
            onPress={() => router.back()}
          >
            <View className='my-auto'>
              <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Activity Log</Text>
          <AnimatedPressable 
            pressInValue={0.9}
            className='z-10'
            onPress={() => setAddActivityModalVisible(true)}
          >
            <View className='my-auto'>
              <Entypo name="plus" size={28} color="black" />
            </View>
          </AnimatedPressable>
        </View>
        
        <FlatList
          className='mt-3 mb-2 mx-0.5 px-2'
          data={userActivities}
          renderItem={({ item }) => <ActivityList activity={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 3 }}
          // ListHeaderComponent={headerComponent}
          // ListFooterComponent={footerComponent}
        />
      </ImageBackground>

      {/* Add activity modal */}
      <Modal
        animationType='fade'
        visible={addActivityModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setAddActivityModalVisible(false)}
      >
        <SafeAreaProvider className='flex-1'>
          <SafeAreaView edges={['top']} className='flex-1'>
            <AddActivityScreenModal energy={userData.energy} current_active_score={userData.active_score} onClose={() => setAddActivityModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </SafeAreaView>
  )
}

export default ActivityLogScreen

const styles = StyleSheet.create({})