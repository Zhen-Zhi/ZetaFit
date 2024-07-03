import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClanMember from '@/src/components/ClanMember'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import { themeColors } from '@/src/constants/Colors'

const MemberScreen = () => {
  const headerComponent = (
    <View className='bg-white flex-row'>
      <View className='mx-2 my-auto'>
        <FontAwesome6 name="user-group" size={18} color={themeColors.primary} />
      </View>
      <Text className='text-lg font-semibold' style={{ color: themeColors.primary }}>Member 12/20</Text>
    </View>
  )

  const footerComponent = (
    <View className='bg-white'><Text className='text-slate-400 text-md text-center font-semibold'>You had reach the end</Text></View>
  )

  return (
    <View className='px-2'>
    {/* <View className='border flex-row justify-between mt-2 px-3 py-2 rounded-t-xl bg-white'>
      <Text className='text-lg font-semibold my-auto'>Members</Text>
      <AnimatedPressable 
        className='bg-sky-500 my-2 p-2 rounded-lg px-4'
        pressInValue={0.9}
      >
        <Text className='font-semibold text-white text-[16px]'>Join Clan</Text>
      </AnimatedPressable>
    </View> */}

      <FlatList
        className='mt-1 mb-2 mx-0.5'
        data={[1,2,3,4,5,6,7,8,9,10]}
        renderItem={({ item }) => <ClanMember id={1} />}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 3 }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
      />
    </View>
  )
}

export default MemberScreen

const styles = StyleSheet.create({})