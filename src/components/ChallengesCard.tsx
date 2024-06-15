import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../constants/Colors'
import AnimatedPressable from './AnimatedPressable'
import {LinearGradient} from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';

type ChallengesCardProps = {
  classNameAsProps ?: string;
  fullWidth ?: number;
  data ?: ChallengesType;
}

type ChallengesType = {
  id: number;
  name: string;
  progress ?: number;
};

const ChallengesCard = ({ classNameAsProps, fullWidth, data }: ChallengesCardProps) => {
  console.log(classNameAsProps)
  return (
    <AnimatedPressable
      className={classNameAsProps}
      pressInValue={0.98}
    >
      <View className='bg-white border-x border-t border-slate-400 rounded-xl'>
        <ImageBackground
          style={{ width: fullWidth }}
          className='h-[180px]'
          imageStyle={{ borderRadius: 8 }}
          source={require('@asset/images/challenges_banner.png')}
        >
          <View className='flex-1 justify-end'>
            <LinearGradient
              className='h-28 justify-end rounded-lg'
              colors={['transparent', '#000']}
              start={{ x: 0, y: 0 }}  // Gradient starts at the top
              end={{ x: 0, y: 1 }}  // Gradient ends at the bottom
            >
              {/* <Text numberOfLines={2} className='text-white text-2xl font-bold m-2'>1000 Minute Run Challenges</Text> */}
              <Text numberOfLines={2} className='text-white text-2xl font-bold m-2'>{data?.name}</Text>
              <Progress.Bar
                width={fullWidth}
                height={8}
                progress={data?.progress}
                borderWidth={0}
                color={themeColors.tetiary}
                borderRadius={10}
                unfilledColor='transparent'
              />
            </LinearGradient>
          </View>
          
        </ImageBackground>
      </View>
    </AnimatedPressable>
  )
}

export default ChallengesCard

const styles = StyleSheet.create({})