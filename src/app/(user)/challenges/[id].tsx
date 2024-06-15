import { ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { themeColors } from '@/src/constants/Colors';
import { ScrollView } from 'react-native';
import LeaderboardMemberScreen from '@/src/components/LeaderboardMember';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';

const ChallengesDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [joinedChallenge, setJoinedChallenge] = useState(false)

  return (
    <View className='flex-1'>
      <Stack.Screen options={{ title: id?.toString() }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
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
              <MaterialCommunityIcons name="speedometer-slow" size={28} color={themeColors.primary} />
              {/* <MaterialCommunityIcons name="speedometer-medium" size={24} color={themeColors.primary} />
              <MaterialCommunityIcons name="speedometer" size={24} color={themeColors.primary} /> */}
              <Text className='font-bold text-[16px] my-auto mx-2'>Intermediate</Text>
            </View>
          </View>
          <Text className='text-center font-extrabold text-[36px] mt-3 bg-white/50'>Arctic Swin Advent</Text>
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
          end={{ x: 0, y: 0.6 }}  // Gradient ends at the bottom
        >
        {joinedChallenge 
          ? 
        <View className='mx-3 p-2 mb-2'>
          <Text className='font-bold text-lg mb-1'>Your Progress</Text>
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
    </View>
  )
}

export default ChallengesDetailsScreen

const styles = StyleSheet.create({})