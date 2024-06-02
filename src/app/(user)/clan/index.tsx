import { ImageBackground, StyleSheet, Text, View, Image, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons';
import ClanList from '@/src/components/ClanList'

import { clanListData } from '@/src/constants/dummyData'

type Clan = {
  clanName: string;
  numberOfMember: number;
  maxMember: number;
  activeScore: number;
};

const ClanScreen = () => {
  return (
    <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex-1'>

          {/* Top image - Clan */}
          <Image 
            className='mx-auto my-10 w-72 h-40 rounded-xl' 
            source={require('@asset/images/clan_banner.png')} 
          />

          <View className='flex-1 p-2'>
            {/* Search component */}
            <View className='bg-white/60 flex flex-row mx-4'>
              <TextInput 
                className='border border-slate-400 rounded-lg py-2 px-4 flex-1 mr-2 bg-white shadow shadow-slate-400'
                placeholder='Search clan......'
              />
              <AnimatedPressable 
                pressInValue={0.9} 
                className='border border-slate-400 rounded-lg justify-center p-3 bg-white shadow shadow-slate-400'
              >
                <FontAwesome6 class name="magnifying-glass" size={18} color="black" />
              </AnimatedPressable>
            </View>

            {/* Clan list */}
            <FlatList
              className='mx-4 mt-6'
              data={clanListData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ClanList clan={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 3 }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default ClanScreen

const styles = StyleSheet.create({})