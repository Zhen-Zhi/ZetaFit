import { StyleSheet, Text, View, Image, ImageBackground, Modal, FlatList, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import ActiveChallengesCard from '@/src/components/ActiveChallengesCard';
import MoreOptionsModal from './optionListModal';
import { Redirect, router, useNavigation } from 'expo-router';
import { themeColors } from '@/src/constants/Colors';
import AddActivityScreenModal from '@/src/components/AddActivity';
import EnterUsernameModal from '../../(auth)/username';
import { useUserClanMemberData, useUserClanName, useUserData } from '@/src/api/users';
import { useAuth } from '@/src/providers/AuthProvider';
import * as NavigationBar from 'expo-navigation-bar';
import ProfileScreen from './profile/profileModal';
import RemoteImage from '@/src/components/RemoteImage';
import { Tables } from '@/src/database.types';
import { supabase } from '@/src/lib/supabase';
import { useUserJoinedChallenges } from '@/src/api/challenges';

const ListOptions = [{name: 'Profile'},{name: 'Setting'},{name: 'Activities'}] 

const HomeScreen = () => {
  // Platform.OS == 'android' && NavigationBar.setVisibilityAsync("hidden");
  const { session } = useAuth();
  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { data: user, error, isLoading } = useUserData(session?.user.id)

  const {
    data: clan,
    error: clanError,
    isLoading: clanIsLoading,
    refetch
  } = useUserClanName(user?.clan_id, session.user.id)

  const {
    data: joinedChallenges,
    error: joinedChallengesError,
    isLoading: joinedChallengesIsLoading, 
  } = useUserJoinedChallenges(session.user.id)

  const [modalVisible, setModalVisible] = useState(false);
  const [addActivityModalVisible, setAddActivityModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const navigation = useNavigation();
  const [enterUsernameModalVisible, setEnterUsernameModalVisible] = useState(false);
  // const [d, sd] = useState<Tables<'clans'> | undefined | null>()
  // const [clanIsLoading, setClanIsLoading] = useState(false)


  // define a event listerner to set modal visible false
  // come back from profile via back will not set to false without this
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setModalVisible(false);
    });

    refetch()

    return unsubscribe;
  }, [navigation, user]);

  if (isLoading || clanIsLoading) {
    return (
      <ImageBackground
        source={require('@asset/images/background_image.png')} 
        className='flex-1'
      >
        <ActivityIndicator className='m-auto p-4 bg-white/50' size={100} color={themeColors.secondary} />
      </ImageBackground>
    )
  }

  if(!user) {
    console.log("User not found")
    return (
      <ImageBackground
        className='flex-1 pt-2'
        source={require('@asset/images/background_image.png')}
      />  
    )
  }
  
  const calculateLevel = (): number => {
    let required_xp = 99999   // if no level found
    if(user?.level) {
      
      if (user.level >= 1 && user.level < 10) {
        required_xp = 80 + (user.level * 20)
      }
      else if (user.level >= 10 && user.level < 29) {
        required_xp = 260 + ((user.level - 9) * 50)
      }
      else {
        required_xp = 1230 + ((user.level - 29) * 100)
      }
    }

    return required_xp
  }

  // if username not set, pop up modal
  setTimeout(() => {
    if (user?.username === null) {
      setEnterUsernameModalVisible(true);
    }
  }, 1000)

  const emptyActiveChallenge = () => {
    return (
      <AnimatedPressable
        className='border border border-slate-600 rounded-md h-auto m-2 bg-white/50'
        pressInValue={0.96}
        disabled
      >
        <View
          className='h-36 w-full rounded-t-md shadow-xl w-[190]' 
        >
          <Text 
            numberOfLines={1}
            className='text-md font-medium m-auto text-slate-500'
          >No Active Challenge</Text>
        </View>
      </AnimatedPressable>
    )
  }

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
    <ImageBackground
      className='flex-1 pt-2'
      source={require('@asset/images/background_image.png')}
    >  
      {/* Top Part, Avatar, Level Bar, Username, Virtual Currency */}
      <View className='flex flex-row justify-between'>

        {/* Avartar Image, Level Bar, Username */}
        <AnimatedPressable 
          pressInValue={0.98} 
          className='flex flex-row w-3/5'
          onPress={() => setProfileModalVisible(true)}
        >

          {/* Avatar Image */}
          <AnimatedPressable 
            className='border rounded-lg m-2' 
            pressInValue={0.93}
            onPress={() => setProfileModalVisible(true)}
          >
            <View className='bg-transparent'> 
              <RemoteImage
                classNameAsProps='h-16 w-16 aspect-square border' 
                path={user.avatar_image} 
                fallback={require('@asset/images/CyberKongz.jpg')}
                bucket='avatars'
              />
            </View>
          </AnimatedPressable>
          
          {/* Level Bar and Username*/}
          <Image
            source={require('@asset/images/crown.png')}
            className='absolute z-10 h-12 w-12 aspect-square top-[-7px] left-[67px] ml-3'
          />
          <View className='flex-col mt-2'>
            <Progress.Bar className='justify-center left-[24px]'
              progress={user?.experience / calculateLevel()}
              width={130}
              height={24}
              color={themeColors.tetiary}
              unfilledColor={themeColors.secondary}
              borderWidth={2}
              borderColor={themeColors.primary}
              borderRadius={4}
            >
              <Text className='absolute text-white font-extrabold self-center'>Level {user?.level}</Text>
            </Progress.Bar>
            <Text style={{ color: themeColors.primary }} className='font-medium text-xs ml-1 mb-[-4px]'>{user?.experience + " / " + calculateLevel()}</Text>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold ml-1'>{user?.username}</Text>
          </View>
        </AnimatedPressable>

        {/* Virtual Currency */}
        <View className='flex flex-col w-2/5'>
          <View style={styles.shadowAndriod} className='border border-slate-300 h-7 rounded-xl mt-2 mx-2 flex flex-row justify-between bg-white shadow shadow-slate-400'>
            <Image 
              className='w-5 mx-4 my-auto aspect-square'
              source={require('@asset/images/coin_icon.png')} 
            />
            <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>{user?.coin}</Text>
          </View>
          <View style={styles.shadowAndriod} className='border border-slate-300 mt-1 h-7 rounded-xl mx-2 flex flex-row justify-between bg-white shadow shadow-slate-400'>
            <Image 
              className='w-5 mx-4 my-auto aspect-square'
              source={require('@asset/images/diamond_icon.png')} 
            />
            <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>{user?.diamond}</Text>
          </View>
        </View>
      </View>

      {/* Clan Name and More setting */}
      <View className='flex flex-row mx-2 h-12'>

        {/* Clan */}
        <AnimatedPressable
          style={[styles.image, styles.shadowAndriod]} 
          className='bg-white border border-slate-400 flex-1 flex-row mr-2 mt-1.5 rounded-lg shadow shadow-slate-400'
          pressInValue={0.97}
          onPress={() => router.push('/clan')}
          >
            {
              user.clan_id
                ?
              <RemoteImage
                classNameAsProps='w-12 h-14 mx-2' 
                path={clan?.clan_logo}
                fallback={require('@asset/images/clan_logo/clan_logo_no_clan.png')}
                bucket='clan_logo'
              />
                :
              <Image
                className='w-12 h-14 mx-2'
                source={require('@asset/images/clan_logo/clan_logo_no_clan.png')} 
              />
            }
            <Text style={{ color: themeColors.primary }} className='text-center font-extrabold text-lg p-1'>{clan?.clan_name ?? 'No Clan'}</Text>
            {/* {
              user.clan_id
                ?
              <Text style={{ color: themeColors.primary }} className='text-center font-extrabold text-lg p-1'>{clan?.clan_name ?? 'No Clan'}</Text>
                :
              <Text style={{ color: themeColors.primary }} className='text-center font-extrabold text-lg p-1'>No Clan</Text>
            } */}
        </AnimatedPressable>
        
        {/* More functions list */}
        <AnimatedPressable
          style={styles.shadowAndriod}
          onPress={() => setModalVisible(true)}
          className='bg-white border border-slate-400 rounded-lg shadow shadow-slate-400 mt-1.5'
          pressInValue={0.9}
        >
          <View className='mx-3 my-auto'>
            <Ionicons name="list" size={22} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        
      </View>
      
      {/* middle image - main */}
      <View className='mx-auto mt-12 mb-6'>
        <AnimatedPressable pressInValue={0.95} onPress={() => router.push('/pets')}>
          <Image
            className='w-56 h-56 mx-auto'
            source={require('@asset/images/pets/turtle.png')} 
            />
        </AnimatedPressable>
        <View className='flex-row justify-between mt-2'>
          <View className='flex-row flex-1'>
            <View className='my-auto'>
              <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
            </View>
            <View className='bg-slate-200 rounded-lg px-2 mx-2 flex-1'>
              <Text style={{ color: themeColors.primary }} className='text-lg text-center font-semibold'>{user?.active_score}</Text>
            </View>
          </View>
          <View className='flex-row flex-1'>
            <View className='my-auto'>
              <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
            </View>
            <View className='bg-slate-200 rounded-lg px-2 mx-2 flex-1'>
              <Text style={{ color: themeColors.primary }} className='text-lg text-center font-semibold'>{user?.energy}/160</Text>
            </View>
          </View>
        </View>
        <AnimatedPressable
          style={{ backgroundColor: themeColors.secondary }}
          className='m-1 h-[40px] w-[240px] bg-slate-200 p-1 rounded-lg justify-center mt-2 flex-row'
          pressInValue={0.98}
          onPress={() => setAddActivityModalVisible(true)}
          // onPress={() => router.push('/homepage/addActivity')}
        >
          <Text style={{ color: themeColors.backgroundColor }} className='text-center font-extrabold text-lg'>Add Activity</Text>
        </AnimatedPressable>
      </View>

      {/* Active challenges part */}
      <View className='m-3 absolute bottom-0'>
        <Text style={{ color: themeColors.primary }} className='font-extrabold text-xl'>Active Challenges</Text>
        <FlatList
          data={joinedChallenges}
          renderItem={({item}) => (
            <ActiveChallengesCard challengeData={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={emptyActiveChallenge}
        />
      </View>

      {/* Function list options*/}
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <SafeAreaProvider className='flex-1'>
          <SafeAreaView className='flex-1' edges={['top']}>
            <MoreOptionsModal userData={user} onClose={() => setModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

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
            <AddActivityScreenModal energy={user.energy} current_active_score={user.active_score} onClose={() => setAddActivityModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

      {/* username modal */}
      <Modal
        animationType='fade'
        visible={enterUsernameModalVisible}
        // visible={true}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setEnterUsernameModalVisible(false)}
      >
        <SafeAreaProvider className='flex-1'>
          <SafeAreaView edges={['top']} className='flex-1'>
            <EnterUsernameModal onClose={() => setEnterUsernameModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

      {/* Profile modal */}
      <Modal
        animationType='fade'
        visible={profileModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setProfileModalVisible(false)}
      >
        <SafeAreaProvider>
          <SafeAreaView edges={['top']} className='flex-1'>
            <ProfileScreen userId={user.id} userClanId={user?.clan_id} onClose={() => setProfileModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    alignItems: 'center', // Centers horizontally
  },
  shadowAndriod: {
    elevation: 15
  }
})