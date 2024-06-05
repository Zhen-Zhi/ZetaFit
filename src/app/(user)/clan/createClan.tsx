import { ImageBackground, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ClanLogoListModal from './clanLogoList';

type CreateClanScreenProps = {
  onClose: () => void
}

const CreateClanScreen = ({ onClose }: CreateClanScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Pressable className='bg-black/70 flex-1' onPress={onClose}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      className='flex-1 justify-end'
    >
    {/* <View className='flex-none'> */}
    <ImageBackground
      imageStyle={{ borderRadius: 20, width: '96%', marginLeft: '2%' }}
      className='mx-4 mt-24'
      source={require('@asset/images/background_image.png')}
    >
      <View style={{ backgroundColor: themeColors.secondary }} className='flex-row justify-normal py-1 px-4 rounded-t-lg'>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10'
          onPress={onClose}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.backgroundColor} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.backgroundColor }} className='text-center m-auto text-xl font-semibold'>Create New Clan</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='bg-[#f8f8f8]/50 mx-2 p-4 rounded-xl'>
          <View className='my-2 flex-col'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Clan Name</Text>
            <TextInput
              className='border-b border-slate-400 rounded-lg p-3'
              placeholder='Enter Clan Name......'
              maxLength={20}
              style={{ color: themeColors.primary }}
            />
          </View>
          <View className='my-2 flex-row'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Clan Logo</Text>
            <Image
              style={{ maxHeight: 80, maxWidth: 65 }}
              source={require('@asset/images/clan_logo/clan_logo_4.png')}
              className='mx-5'
            />
            <AnimatedPressable
              style={{ backgroundColor: themeColors.secondary }}
              pressInValue={0.95}
              className='border border-slate-400 w-24 h-10 rounded-lg my-auto'
              onPress={() => setModalVisible(true)}
            >
              <View className='flex-row my-auto ml-1'>
                <MaterialIcons name="expand-more" size={24} color='white' />
                <Text className='font-bold text-center text-white my-auto'>Browse</Text>
              </View>
            </AnimatedPressable>
          </View>
          <View className='my-2'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Clan Descriptions</Text>
            <TextInput
              className='border-b border-slate-400 rounded-lg p-3'
              placeholder='Your Descriptions......'
              maxLength={100}
              multiline
              style={{ color: themeColors.primary }}
            />
          </View>

          <AnimatedPressable
            style={{ backgroundColor: themeColors.secondary }}
            className='w-3/5 mx-auto h-10 rounded-lg my-auto mt-8'
            pressInValue={0.98}
          >
            <Text className='text-lg text-white font-bold text-center my-auto'>Create Clan</Text>
          </AnimatedPressable>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <ClanLogoListModal onClose={() => setModalVisible(false)}/>
      </Modal>
    </ImageBackground>
    {/* </View> */}
    <View className='flex-1' />
    </KeyboardAvoidingView>
    </Pressable>
  )
}

export default CreateClanScreen

const styles = StyleSheet.create({})