import { ImageBackground, Image, StyleSheet, Text, View, FlatList, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5 } from '@expo/vector-icons';
import { themeColors } from '@/src/constants/Colors';
import EditProfileScreen from './editProfile';

type ModalProps = {
  onClose: () => void;
};

const ProfileScreen = ({ onClose }: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      className='flex-1' 
      source={require('@asset/images/background_image.png')}
    >
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-between pt-3 pb-2 px-4 border-b border-slate-300'>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10'
          onPress={onClose}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-xl font-semibold'>Profile</Text>
        <AnimatedPressable pressInValue={0.9} className='z-10' onPress={() => setModalVisible(true)}>
        <View className='p-1'>
            <FontAwesome5 name="pencil-alt" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          className='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
          source={require('@asset/images/CyberKongz.jpg')}
        />
        <View className='px-4 h-full'>
          <View className='flex-row mt-3 justify-center'>
            <Text style={{ color: themeColors.primary }} className='text-xl font-bold '>Username</Text>
          </View>
          <Text style={{ color: themeColors.primary }} className='text-center text-lg font-semibold mb-4'>LV 1</Text>
          <Text style={{ color: themeColors.primary }} className='text-[64px] font-bold text-center'>9999</Text>
          <Text style={{ color: themeColors.primary }} className='text-center'>ActiveScore</Text>
          <AnimatedPressable
            style={[styles.image, styles.shadowAndriod]} 
            className='bg-white border border-slate-400 h-12 flex-row my-4 mx-2 rounded-lg shadow shadow-slate-400'
            pressInValue={0.97}
            >
            <Image
              className='w-16 h-24 mx-2 mb-8'
              source={require('@asset/images/logo_clan.png')} 
            />
            <Text style={{ color: themeColors.primary }} className='text-center font-extrabold text-lg p-1'>Clan Name</Text>
          </AnimatedPressable>

          <View className='mt-4 p-2'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-medium my-2'>Battle Pets</Text>
            <Image
              className='w-56 h-56 mx-auto'
              source={require('@asset/images/pets/dragon.png')} 
            />
            <Text style={{ color: themeColors.primary }} className='text-xl font-semibold my-2 text-center'>Turtle</Text>
          </View>

          <View className='mt-4 p-2'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-medium my-2'>Achivements</Text>
            {/* <View className='border-b border-slate-400' /> */}
            <FlatList
              numColumns={3}
              data={[1,2,3,4,5,6]}
              renderItem={({ item }) => <View className='p-1'><Image className='w-24 h-24' source={require('@asset/images/badges.png')} /></View>}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <EditProfileScreen onClose={() => setModalVisible(false)} />
      </Modal>
    </ImageBackground>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  image: {
    alignItems: 'center', // Centers horizontally
  },
  shadowAndriod: {
    elevation: 15
  }
})