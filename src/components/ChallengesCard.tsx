import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { difficultiesColors, themeColors } from '../constants/Colors'
import AnimatedPressable from './AnimatedPressable'
import {LinearGradient} from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type ChallengesCardProps = {
  onPress ?: () => void;
  classNameAsProps ?: string;
  fullWidth ?: number;
  data ?: ChallengesType;
}

type ChallengesType = {
  id: number;
  name: string;
  progress ?: number;
};

const ChallengesCard = ({ classNameAsProps, fullWidth, data, onPress }: ChallengesCardProps) => {
  return (
    <AnimatedPressable
      className={classNameAsProps}
      pressInValue={0.98}
      onPress={onPress}
    >
      <View className='bg-white border-x border-slate-600 border-t rounded-xl overflow-hidden'>
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
              <View className='flex-row px-2 mb-1'>
                <View className='my-auto mr-2'>
                  <Ionicons name="extension-puzzle-sharp" size={26} color={difficultiesColors.beginner} />
                  {/* <Ionicons name="extension-puzzle-sharp" size={26} color={difficultiesColors.intermediate} /> */}
                  {/* <Ionicons name="extension-puzzle-sharp" size={26} color={difficultiesColors.expert} /> */}
                </View>
                <Text numberOfLines={1} className='flex-1 text-white text-2xl font-bold'>
                  {data?.name}
                </Text>
              </View>
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