import { ImageBackground, StyleSheet, Text, View, Image, FlatList, Platform, Modal } from 'react-native'
import React, { useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { difficultiesColors, themeColors } from '@/src/constants/Colors';
import { ScrollView } from 'react-native';
import LeaderboardMemberScreen from '@/src/components/LeaderboardMember';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChallengesActionScreenModal from './challengesActions';

const ChallengesDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [joinedChallenge, setJoinedChallenge] = useState(false)
  const [actionModalVisible, setActionModalVisible] = useState(false)

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-between pt-3 pb-2 px-4 border-b border-slate-300'>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10'
          onPress={() => router.back()}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-xl font-semibold'>Challenge Detials</Text>
        <AnimatedPressable pressInValue={0.9} className='z-10' disabled={!joinedChallenge} onPress={() => setActionModalVisible(true)}>
          <View className='p-1'>
            <Image
              className={`w-6 h-8 ${joinedChallenge ? null : 'h-0'}`}
              source={require('@asset/images/attack_icon.png')}
            />
          </View>
        </AnimatedPressable>
      </View>
        <ScrollView className='flex-1'>
        <View className='p-4'>
          <Image
            className='h-[220px] rounded-lg w-full'
            source={require('@asset/images/challenges_banner.png')}
          />
          <View className='flex-row mt-2 bg-white/50 justify-between'>
            <View className='flex-row'>
              <MaterialCommunityIcons name="calendar-month" size={28} color={themeColors.primary} />
              <Text className='font-bold text-[16px] my-auto mx-2'>15/6/2024 - 21/6/2024</Text>
            </View>
            <View className='flex-row'>
              {/* <MaterialCommunityIcons name="speedometer-slow" size={28} color={difficultiesColors.beginner_darker} /> */}
              <MaterialCommunityIcons name="speedometer-medium" size={28} color={difficultiesColors.intermediate_darker} />
              {/* <MaterialCommunityIcons name="speedometer" size={28} color={difficultiesColors.expert_darker} /> */}
              <Text style={{ color: difficultiesColors.expert_darker }} className='font-bold text-[16px] my-auto mx-2'>Intermediate</Text>
            </View>
          </View>
          <Text className='text-center font-extrabold text-[36px] mt-3 bg-white/50'>Arctic Swin Adventure</Text>
          <View className='mt-4 bg-white/50'>
            <Text className='font-bold text-2xl'>Challenges Details</Text>
            <Text className='font-medium text-md mt-2 text-justify'>
              Commit to your fitness journey by completing 8 workout sessions this month. 
              Whether it's yoga, running or any other exercise you prefer, 
              the goal is to stay active and consistent.
              To win the challenge, do as much damage as possible.
            </Text>
          </View>
          <View className='mt-6 bg-white/50'>
            <Text className='font-bold text-2xl'>Rewards</Text>
          </View>
          <Image
            className='w-64 h-64 mx-auto'
            source={require('@asset/images/starter achievement.png')}
          />
          <Text className='font-semibold text-lg text-center'>Starter Sprinter</Text>
          <View className='mt-6'>
            <Text className='font-bold text-2xl'>Leaderboard</Text>
            <LeaderboardMemberScreen />
          </View>
        </View>
        <View className='h-20' />
        </ScrollView>
        <LinearGradient
          className='h-32 w-full z-10 absolute bottom-0 justify-end'
          colors={['transparent', '#fff']}
          start={{ x: 0, y: 0 }}  // Gradient starts at the top
          end={{ x: 0, y: 0.55 }}  // Gradient ends at the bottom
        >
        {joinedChallenge 
          ? 
        <View className='mx-3 p-2 mb-2'>
          <View className='flex-row justify-between'>
            <Text className='font-bold text-lg mb-1'>Your Progress</Text>
            <View className='flex-row'>
              <Image className='w-6 h-8 mb-1 mr-1.5' source={require('@asset/images/attack_icon.png')}/>
              <Text className='font-bold text-lg mr-3 mb-1'>880/1000</Text>
            </View>
          </View>
          <Progress.Bar
            width={350}
            height={10}
            progress={0.6}
            borderWidth={0}
            color={themeColors.tetiary}
            borderRadius={10}
            unfilledColor='red'
          />
        </View>
        :
        <AnimatedPressable
          style={{ backgroundColor: themeColors.secondary }}
          className='mx-3 mb-2 rounded-lg p-1.5'
          pressInValue={0.98}
          onPress={() => setJoinedChallenge(true)}
        >
          <Text className='text-center text-lg text-white font-bold'>Join Challenges</Text>
        </AnimatedPressable>
        }
        </LinearGradient>
      </ImageBackground>

      <Modal
        animationType='fade'
        visible={actionModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setActionModalVisible(false)}
      >
        <ChallengesActionScreenModal onClose={() => setActionModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  )
}

export default ChallengesDetailsScreen

const styles = StyleSheet.create({})