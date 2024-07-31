import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import * as Progress from 'react-native-progress';
import { themeColors } from '../constants/Colors';
import { Tables } from '../database.types';
import RemoteImage from './RemoteImage';
import { router } from 'expo-router';

type ActiveChallengesCardProps = {
  challengeData : (Tables<'user_challenges'> & { challenges: Tables<'challenges'> | null } & { user_challenge_details: Tables<'user_challenge_details'>[] }) | null;
}

const ActiveChallengesCard = ({challengeData}: ActiveChallengesCardProps) => {
  const calculateDamage = () => {
    if (!challengeData || !challengeData.user_challenge_details) {
      return 0; // Return 0 if challengeData or user_challenge_details is not defined
    }
  
    return challengeData.user_challenge_details.reduce((acc, details) => acc + details.damage, 0);
  };
  
  return (
    <AnimatedPressable
      style={styles.activeChallangesPressable}
      className='border-x border-t border-slate-200 rounded-md h-auto m-2 bg-white shadow shadow-slate-400'
      pressInValue={0.96}
      onPress={() => router.push(`/challenges/${challengeData?.challenge_id}`)}
    >
      {/* <Image 
        className='h-28 w-full rounded-t-md shadow-xl' 
        source={require('@asset/images/challenges_banner.png')} 
      /> */}
      <RemoteImage
        classNameAsProps='h-28 w-full rounded-t-md shadow-xl' 
        path={challengeData?.challenges?.banner_image}
        // resizeMode='contain'
        fallback={require('@asset/images/default.png')}
        bucket='challenges_banner'
      />
      <View className='mt-2'>
        <Text 
          numberOfLines={1}
          className='text-md font-bold my-2 mx-3'
          style={{ color: themeColors.primary }}
        >{challengeData?.challenges?.title}</Text>
        <Progress.Bar
          width={190}
          height={2}
          className='mx-auto'
          // progress={0.4}
          progress={ calculateDamage() / (challengeData?.challenges?.health ?? 99999)}
          borderWidth={0}
          color={themeColors.tetiary}
          unfilledColor={themeColors.backgroundColor}
        />
      </View>
    </AnimatedPressable>
  )
}

export default ActiveChallengesCard

const styles = StyleSheet.create({
  activeChallangesPressable: {
    width: 200,
    elevation: 15,
  },
})