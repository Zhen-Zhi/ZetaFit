import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { difficultiesColors, themeColors } from '../constants/Colors'
import AnimatedPressable from './AnimatedPressable'
import {LinearGradient} from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tables } from '../database.types';
import RemoteImage from './RemoteImage';
import RemoteImageBackground from './RemoteImageBackground';
import { router } from 'expo-router';

type ChallengesCardProps = {
  onPress ?: () => void;
  classNameAsProps ?: string;
  fullWidth ?: number;
  challengeData :  Tables<'challenges'> | null;
}

// type ChallengesType = {
//   id: number;
//   name: string;
//   progress ?: number;
// };

const ChallengesCard = ({ classNameAsProps, fullWidth, challengeData }: ChallengesCardProps) => {

  return (
    <AnimatedPressable
      className={classNameAsProps}
      pressInValue={0.98}
      onPress={() => router.push(`/challenges/${challengeData?.id}`)}
    >
      <View className='bg-white border-x border-slate-600 border-t rounded-xl overflow-hidden'>
        {/* <ImageBackground
          style={{ width: fullWidth }}
          className='h-[180px]'
          imageStyle={{ borderRadius: 8 }}
          source={require('@asset/images/challenges_banner.png')}
        > */}
        <RemoteImageBackground
          classNameAsProps='h-[180px]'
          path={challengeData?.banner_image}
          // resizeMode='contain'
          fallback={require('@asset/images/default.png')}
          bucket='challenges_banner'
        >
          <View className='flex-1 justify-end'>
            <LinearGradient
              className='h-28 justify-end rounded-lg'
              colors={['transparent', '#000']}
              start={{ x: 0, y: 0 }}  // Gradient starts at the top
              end={{ x: 0, y: 1 }}  // Gradient ends at the bottom
            >
              <View className='flex-row px-2 mb-1'>
                <View className='my-auto mr-2'>
                  {
                    challengeData?.difficulty == "Beginner"
                      ?
                    <MaterialCommunityIcons name="speedometer-slow" size={28} color={difficultiesColors.beginner} />
                      :
                      challengeData?.difficulty == "Intermediate"
                        ?
                      <MaterialCommunityIcons name="speedometer-medium" size={28} color={difficultiesColors.intermediate} />
                        :
                      <MaterialCommunityIcons name="speedometer" size={28} color={difficultiesColors.expert} />
                  }
                </View>
                <Text numberOfLines={1} className='flex-1 text-white text-2xl font-bold'>
                  {challengeData?.title}
                </Text>
              </View>
              {/* <Progress.Bar
                width={fullWidth}
                height={8}
                // progress={data?.progress}
                progress={challengeData?.damage ?? 0 / (challengeData?.challenges?.health ?? 99999)}
                borderWidth={0}
                color={themeColors.tetiary}
                borderRadius={10}
                unfilledColor='transparent'
              /> */}
            </LinearGradient>
          </View>
          
        </RemoteImageBackground>
      </View>
    </AnimatedPressable>
  )
}

export default ChallengesCard

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    right: -40,
    top: 20,
    width: 160,
    backgroundColor: 'black',
    color: 'white',
    padding: 1,
    textAlign: 'center',
  },
})