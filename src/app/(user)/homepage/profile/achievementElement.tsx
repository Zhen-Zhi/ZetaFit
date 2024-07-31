import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Checkbox from 'expo-checkbox'
import { themeColors } from '@/src/constants/Colors'
import { Tables } from '@/src/database.types'
import RemoteImage from '@/src/components/RemoteImage'
import { useUpdateUserShownBadges } from '@/src/api/users'
import AnimatedPressable from '@/src/components/AnimatedPressable'

type AchievementElementProps = {
  achievement: Tables<'user_badges'> & { badges: Tables<'badges'> | null }
}

const AchievementElement = ({achievement}: AchievementElementProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  useEffect(() => {
    if(achievement.displayed) {
      setToggleCheckBox(achievement.displayed)
    }
  }, [achievement])

  const { mutate: updateShownAchievements } = useUpdateUserShownBadges()

  const handleCheckboxValueChange = (newValue: boolean) => {
    updateShownAchievements(
      { updateFields: { displayed: !toggleCheckBox }, userBadgeId: achievement.id},
      {
        onSuccess() {
          console.log(achievement.id + "   :::  " + !toggleCheckBox)
          setToggleCheckBox(newValue)
        },
        onError() {
          console.log('error')
        }
      }
    )
  }
  
  return (
      <AnimatedPressable
        pressInValue={0.98}
        className='bg-white border border-slate-400 rounded-lg p-1 flex-row'
        onPress={() => handleCheckboxValueChange(!toggleCheckBox)}
      >
        {/* <Image className='w-20 h-20' source={require('@asset/images/badges.png')} /> */}
        <RemoteImage
          classNameAsProps='w-20 h-20 m-1'
          path={achievement.badges?.image_name} 
          fallback={require('@asset/images/default.png')}
          bucket='badges'
        />
        <Text numberOfLines={2} style={{ color: themeColors.primary }} className='text-xl font-bold my-auto ml-3 flex-1'>{achievement.badges?.name}</Text>
        <Checkbox
          className='my-auto mx-4'
          value={toggleCheckBox}
          onValueChange={(newValue) => handleCheckboxValueChange(newValue)}
        />
      </AnimatedPressable>
    )
}

export default AchievementElement

const styles = StyleSheet.create({})