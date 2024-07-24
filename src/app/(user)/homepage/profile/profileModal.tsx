import { ImageBackground, Image, StyleSheet, Text, View, FlatList, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { themeColors } from '@/src/constants/Colors';
import EditProfileScreen from './editProfile';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Tables } from '@/src/database.types';
import { useClanDetails } from '@/src/api/clan';
import RemoteImage from '@/src/components/RemoteImage';
import { router } from 'expo-router';

type ModalProps = {
  userData: Tables<'users'>
  onClose: () => void;
};

const ProfileScreen = ({ userData, onClose }: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: clanData,
    error: clanDataError,
    isLoading: clanDataIsLoading,
  } = useClanDetails(userData.clan_id)

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
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-2xl font-extrabold'>Profile</Text>
        <AnimatedPressable pressInValue={0.9} className='z-10' onPress={() => setModalVisible(true)}>
        <View className='p-1'>
            <FontAwesome5 name="pencil-alt" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image
          className='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
          source={require('@asset/images/CyberKongz.jpg')}
        /> */}
        <RemoteImage
          classNameAsProps='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
          path={userData.avatar_image} 
          fallback={require('@asset/images/CyberKongz.jpg')}
          bucket='avatars'
        />
        <View className='px-4 h-full'>
          <View className='flex-row mt-3 justify-center'>
            <Text style={{ color: themeColors.primary }} className='text-xl font-bold '>{userData.username}</Text>
          </View>
          <Text style={{ color: themeColors.primary }} className='text-center text-lg font-semibold mb-4'>LV {userData.level}</Text>
          <View className='flex-row justify-center'>
            <View className='my-auto mr-4'>
              <FontAwesome6 name="fire" size={54} color="rgba(240, 93, 9, 0.8)" />
            </View>
            <Text style={{ color: themeColors.primary }} className='text-[64px] font-bold text-center'>{userData.active_score}</Text>
          </View>
          <Text style={{ color: themeColors.primary }} className='text-center'>ActiveScore</Text>
          <AnimatedPressable
            style={[styles.image, styles.shadowAndriod]} 
            className='bg-white border border-slate-400 h-12 flex-row my-4 mx-2 rounded-lg shadow shadow-slate-400'
            pressInValue={0.97}
            // onPress={() => {router.push('/clan'); onClose()}}
            onPress={() => {router.push(`/clan/clan_details/${userData.clan_id}`); onClose()}}
            disabled={!userData.clan_id}
            >
            {/* <Image
              className='w-20 h-24 mx-2'
              source={require('@asset/images/clan_logo/clan_logo_6.png')} 
            /> */}
            <RemoteImage
              classNameAsProps='w-20 h-24 mx-2' 
              path={clanData?.clan_logo} 
              fallback={require('@asset/images/clan_logo/clan_logo_no_clan.png')}
              bucket='clan_logo'
            />
            <Text style={{ color: themeColors.primary }} className='text-center font-extrabold text-lg p-1'>{clanData?.clan_name ?? 'No Clan'}</Text>
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
        <SafeAreaProvider>
          <SafeAreaView edges={['top']} className='flex-1'>
            <EditProfileScreen userData={userData} onClose={() => setModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
          
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