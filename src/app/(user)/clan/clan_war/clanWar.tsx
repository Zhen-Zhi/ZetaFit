import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Image, Platform, Modal } from 'react-native'
import React, { useState } from 'react'
import { Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';
import ClanWarBattleLogScreen from './clanWarBattleLog'

const ClanWarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground className='flex-1' source={require('@asset/images/background_image.png')}>
        <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pt-3 pb-2 px-4 border-b border-slate-300 ${Platform.OS == 'ios' ? 'h-12' : 'h-20'}`}>
          <AnimatedPressable 
            pressInValue={0.9} 
            className='z-10 absolute left-3 bottom-2'
            onPress={() => router.back()}
          >
            <View className='p-1'>
              <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
          <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>BATTLEGROUND</Text>
        </View>

        <View style={{ borderColor: themeColors.primary }} className='mx-auto mt-0.5 bg-slate-200 px-10 rounded border'>
          <Text style={{ color: themeColors.primary }}>Time Remaning: 12:00:00</Text>
        </View>

        {/* absolute image */}
        <View className='flex-1'>
          <View className='flex-row'>
            <View className='ml-4'>
              <Image className='w-44 h-52 mt-2' source={require('@asset/images/clan_logo/clan_logo_5.png')} />
              <View className='flex-row justify-center'>
                <View className='my-auto mx-1'>
                  <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center bg-slate-200 px-2 rounded'>999990</Text>
              </View>
            </View>
            <View className='mx-6 my-10'>
              <Text className='text-xl font-bold mb-2'>Samsung Galaxy</Text>
              <Text className='font-semibold text-md'>Clan Health</Text>
              <Progress.Bar className='my-1'
                progress={0.9}
                height={14}
                width={130}
                color={themeColors.tetiary}
                unfilledColor={themeColors.secondary}
                borderWidth={1}
                borderRadius={0}
                borderColor={themeColors.primary}
              />
              <Text>900/1000</Text>
              <AnimatedPressable 
                style={{ backgroundColor: themeColors.secondary }}
                className='rounded mt-auto p-2'
                onPress={() => setModalVisible(true)}
                pressInValue={0.96}
              >
                <Text style={{ color: themeColors.backgroundColor }} className='font-semibold text-md mx-auto'>Battle Log</Text>
              </AnimatedPressable>
            </View>
          </View>
          <View className='flex-1'>
            <Image className='z-10 w-44 h-44 mx-auto my-auto' source={require('@asset/images/vs_logo.png')} />
          </View>
          <View className='flex-row'>
            <View className='mx-6 my-10'>
              <Text style={{ color: themeColors.danger }} className='text-xl font-bold mb-2'>Samsung Galaxy</Text>
              <Text className='font-semibold text-md'>Clan Health</Text>
              <Progress.Bar className='my-1'
                progress={0.9}
                height={14}
                width={130}
                color={themeColors.tetiary}
                unfilledColor={themeColors.secondary}
                borderWidth={1}
                borderRadius={0}
                borderColor={themeColors.primary}
              />
              <Text>900/1000</Text>
              <AnimatedPressable 
                style={{ backgroundColor: themeColors.danger }}
                className='rounded mt-auto p-2'
                pressInValue={0.96}
              >
                <Text style={{ color: themeColors.backgroundColor }} className='font-semibold text-md mx-auto'>Attack</Text>
              </AnimatedPressable>
            </View>
            <View className='ml-auto mr-4 mb-2'>
              <Image className='w-44 h-52 mt-2' source={require('@asset/images/clan_logo/clan_logo_2.png')} />
              <View className='flex-row justify-center'>
                <View className='my-auto mx-1'>
                  <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center bg-slate-200 px-2 rounded'>999990</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <ClanWarBattleLogScreen onClose={() => setModalVisible(false)}/>
      </Modal>
    </SafeAreaView>
  )
}

export default ClanWarScreen

const styles = StyleSheet.create({})