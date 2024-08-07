import { ImageBackground, Image, StyleSheet, Text, View, FlatList, ScrollView, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { difficultiesColors, themeColors } from '@/src/constants/Colors';
import Checkbox from 'expo-checkbox';
import AchievementElement from './achievementElement';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/src/lib/supabase';
import { useUpdateUser, useUpdateUserShownBadges, useUserAllBadges } from '@/src/api/users';
import { Tables } from '@/src/database.types';
import RemoteImage from '@/src/components/RemoteImage';
import AnimatedModal from '@/src/components/AnimatedModal';

type ModalProps = {
  userData: Tables<'users'>;
  onClose: () => void;
};

const EditProfileScreen = ({ userData, onClose }: ModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)
  const [blankUsername, setBlankUsername] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const { mutate: updateUser } = useUpdateUser()

  const { 
    data: userAllAchievements,
    error: userAllAchievementsError,
    isLoading: userAllAchievementsIsLoading,
   } = useUserAllBadges(userData.id)

  useEffect(() => {
    if(userData.username) {
      setUsername(userData.username)
    }
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }
  };

  const handleUpdateProfile = async () => {
    setBlankUsername(false)
    setError(false)
    
    if(username == '') {
      setBlankUsername(true)
      return
    }

    const imagePath = await uploadImage()

    updateUser(
      { 
        id: userData.id,
        username: username,
        avatar_image: imagePath
      }, 
      {
      onSuccess() {
        onClose()
      },
      onError(error) {
        setError(true)
      }
    })
  }

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
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-xl font-bold'>Profile</Text>
        <AnimatedPressable pressInValue={0.9} className='h-0' onPress={() => {console.log('pressed')}}>
        <View className='p-1'>
            <FontAwesome5 name="pencil-alt" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        { image ?
          <Image
            className='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
            source={{ uri: image }}
          />
          :
          <RemoteImage
            classNameAsProps='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
            path={userData.avatar_image} 
            fallback={require('@asset/images/default_profile.png')}
            bucket='avatars'
          />
        }
        <AnimatedPressable pressInValue={0.98} onPress={pickImage}>
          <Text style={{ color: themeColors.secondary }} className='font-bold text-xl text-center mt-2.5'>Upload Image</Text>
        </AnimatedPressable>
        <View className='px-4 h-full'>
          <View className='mt-6 mb-8 justify-center'>
            <Text className='mx-8 mb-1 font-medium text-lg'>Edit Username</Text>
            <TextInput 
              style={{ color: themeColors.primary }} 
              className='text-xl font-bold border rounded bg-white border-slate-400 text-center p-2 mx-8' 
              value={username}
              onChangeText={setUsername}
            />
            { blankUsername && <Text className='ml-8 font-medium mt-1 text-red-500'>Username is required</Text>}
            { error && <Text className='ml-8 font-medium mt-1 text-red-500'>Username is already taken</Text>}
          </View>

          <View className='mt-4 p-2'>
            <View className='flex-row justify-between'>
              <Text style={{ color: themeColors.primary }} className='text-lg font-medium my-2'>Show Achivements</Text>
              <AnimatedPressable 
                pressInValue={0.9}
                onPress={() => setModalVisible(true)}
              >

                <View className='my-auto mr-2'>
                  <FontAwesome5 name="question-circle" size={20} color="black" />
                </View>
              </AnimatedPressable>
            </View>
            {/* <View className='border-b border-slate-400' /> */}
            <FlatList
              data={userAllAchievements}
              initialNumToRender={5}
              renderItem={({ item }) => <AchievementElement achievement={item} />}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              ListFooterComponent={<View className='h-20' />}
              ListEmptyComponent={
                <View className='px-4 py-8 border rounded-lg border-slate-300 bg-white/50'>
                  <Text className='text-slate-500 font-medium m-auto'>You have no achievements yet</Text>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        className='h-32 w-full z-10 absolute bottom-0 justify-end'
        colors={['#ffffff00', '#fff']}
        start={{ x: 0, y: 0 }}  // Gradient starts at the top
        end={{ x: 0, y: 0.6 }}  // Gradient ends at the bottom
      >
      <View className='flex-1 justify-end items-center'>
        <AnimatedPressable
          style={{ backgroundColor: themeColors.secondary }}
          pressInValue={0.98}
          className='w-4/5 p-1.5 rounded-xl mb-6'
          onPress={handleUpdateProfile}
        >
          <Text style={{ color: themeColors.backgroundColor }} className='text-center text-xl my-auto font-bold'>Save</Text>
        </AnimatedPressable>
      </View>
      </LinearGradient>

      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <AnimatedModal
          classNameAsProps='flex max-h-[90%]'
          onClose={() => setModalVisible(false)}
        >
          <ImageBackground
            source={require('@asset/images/background_image.png')}
            className='p-4'
          >
            <ScrollView className='bg-white/30 px-2'>
              <View className='flex-row justify-center mb-3'>
                <Text className='text-2xl text-center font-extrabold mx-2'>Update Displayed Achievements</Text>
              </View>
              <Text className='text-[16px] font-medium text-center mt-2 mb-4'>
                Achievements displayed status is autosaved when updated
              </Text>

              <AnimatedPressable 
                pressInValue={0.98}
                className='rounded-lg p-1'
                style={{ backgroundColor: themeColors.secondary }}
                onPress={() => setModalVisible(false)}
              >
                <View className=''>
                  <Text className='text-center font-extrabold text-white text-xl'>Okay</Text>
                </View>
              </AnimatedPressable>
            </ScrollView>
          </ImageBackground>
        </AnimatedModal>
      </Modal>

    </ImageBackground>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  image: {
    alignItems: 'center', // Centers horizontally
  },
  shadowAndriod: {
    elevation: 15
  }
})