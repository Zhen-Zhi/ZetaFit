import { ImageBackground, StyleSheet, Text, View, Image, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import ClanList from '@/src/components/ClanList'

import { clanListData } from '@/src/constants/dummyData'
import CreateClanScreen from './createClan';
import { Stack } from 'expo-router';
import { themeColors } from '@/src/constants/Colors';

type Clan = {
  clanName: string;
  numberOfMember: number;
  maxMember: number;
  activeScore: number;
};

const ClanScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex-1'>
        <Stack.Screen options={{ 
          title: 'Clan',
          headerTitleStyle: { color: themeColors.primary },
          headerRight: () => 
            <AnimatedPressable 
              pressInValue={0.9}
              className='rounded'
              onPress={() => setModalVisible(true)}
            >
              <View className=''>
                <MaterialCommunityIcons name="shield-plus-outline" size={28} color={themeColors.primary} />
              </View>
            </AnimatedPressable>
        }}/>

          {/* Top image - Clan */}
          <Image 
            className='mx-auto my-4 w-64 h-52 rounded-xl' 
            source={require('@asset/images/clan_banner.png')} 
          />

          <View className='flex-1 p-2'>
            {/* Search component */}
            <View className='bg-white/60 flex flex-row mx-4'>
              <TextInput 
                className='border border-slate-400 rounded-lg py-2 px-4 flex-1 mr-2 bg-white shadow shadow-slate-400'
                placeholder='Search clan......'
                style={{ color: themeColors.primary }}
              />
              <AnimatedPressable 
                pressInValue={0.9} 
                className='border border-slate-400 rounded-lg justify-center p-3 bg-white shadow shadow-slate-400'
              >
                <FontAwesome6 class name="magnifying-glass" size={18} color={themeColors.primary} />
              </AnimatedPressable>
            </View>

            {/* Clan list */}
            <FlatList
              className='mx-4 mt-2'
              data={clanListData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ClanList clan={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 3 }}
            />
          </View>

          <Modal
            animationType='fade'
            visible={modalVisible}
            presentationStyle='overFullScreen'
            transparent={true}
            onRequestClose={() =>setModalVisible(false)}
          >
            <CreateClanScreen onClose={() => setModalVisible(false)} />
          </Modal>
        </View>

        
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default ClanScreen

const styles = StyleSheet.create({})