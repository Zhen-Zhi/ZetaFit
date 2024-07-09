import { ImageBackground, StyleSheet, Text, View, Image, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, Modal, Platform, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import ClanList from '@/src/components/ClanList'
import CreateClanScreen from './createClan';
import { Stack, router } from 'expo-router';
import { themeColors } from '@/src/constants/Colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useClanList } from '@/src/api/clan';
import { fullHeight } from '@/src/constants/heigth';
import ClanLoadingScreenComponent from '@/src/components/ClanLoadingScreen';

type Clan = {
  clanName: string;
  numberOfMember: number;
  maxMember: number;
  activeScore: number;
};

const ClanScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  const { data: clanListData, error, isLoading, refetch } = useClanList('%' + searchValue + '%');

  // if (isLoading) {
  //   return <ClanLoadingScreenComponent />
  // }

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <ImageBackground
        style={{ height: fullHeight }}
        source={require('@asset/images/background_image.png')}
      >
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex-1'>
          <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
            <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Clan</Text>
            <AnimatedPressable 
              pressInValue={0.9}
              className='z-10 absolute right-3 top-2.5'
              onPress={() => setModalVisible(true)}
            >
              <View className='my-auto'>
                <MaterialCommunityIcons name="shield-plus-outline" size={28} color={themeColors.primary} />
              </View>
            </AnimatedPressable>
          </View>

          {/* Top image - Clan */}
          <Image 
            className='mx-auto my-4 w-64 h-52 rounded-xl' 
            source={require('@asset/images/clan_banner.png')} 
          />

          <View className='flex-1 p-2'>
            {/* Search component */}
            <View className='bg-white/60 flex flex-row mx-4'>
              <TextInput 
                value={searchValue}
                className='border border-slate-400 rounded-lg py-2 px-4 flex-1 mr-2 bg-white shadow shadow-slate-400'
                placeholder='Search clan......'
                style={{ color: themeColors.primary }}
                onChangeText={setSearchValue}
              />
              <AnimatedPressable 
                pressInValue={0.9} 
                className='border border-slate-400 rounded-lg justify-center p-3 bg-white shadow shadow-slate-400'
                onPress={() => {
                  Keyboard.dismiss();
                  refetch();
                }}
              >
                <FontAwesome6 class name="magnifying-glass" size={18} color={themeColors.primary} />
              </AnimatedPressable>
            </View>

            {/* Clan list */}
            {
              isLoading
              ?
              <View className='bg-white/50 mx-4 mt-2 mb-20'>
                <ActivityIndicator 
                  size={80}
                  color={themeColors.secondary}
                />
              </View>
              :
              <FlatList
                className='mx-4 mt-2 mb-20'
                data={clanListData}
                keyExtractor={(item) => item.clan_id.toString()}
                renderItem={({ item }) => <ClanList clan={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 3 }}
              />
            }
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
    </SafeAreaView>
  )
}

export default ClanScreen

const styles = StyleSheet.create({})