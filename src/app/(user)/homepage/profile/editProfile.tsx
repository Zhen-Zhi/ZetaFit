import { ImageBackground, Image, StyleSheet, Text, View, FlatList, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5 } from '@expo/vector-icons';
import { themeColors } from '@/src/constants/Colors';
import Checkbox from 'expo-checkbox';
import AchievementElement from './achievementElement';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/src/lib/supabase';
import { useUpdateUser } from '@/src/api/users';
import { Tables } from '@/src/database.types';
import RemoteImage from '@/src/components/RemoteImage';

type ModalProps = {
  userData: Tables<'users'>;
  onClose: () => void;
};

const EditProfileScreen = ({ userData, onClose }: ModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState('')

  const { mutate: updateUser } = useUpdateUser()

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
    const imagePath = await uploadImage()

    updateUser(
      { 
        id: userData.id,
        username: username,
        avatar_image: imagePath
      }, 
      {
      onSuccess() {

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
        {/* <Image
          className='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
          source={image ? { uri: image } : require('@asset/images/CyberKongz.jpg')}
        /> */}
        <RemoteImage
          classNameAsProps='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
          path={userData.avatar_image} 
          fallback={require('@asset/images/CyberKongz.jpg')}
          bucket='avatars'
        />
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
          </View>

          <View className='mt-4 p-2'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-medium my-2'>Show Achivements</Text>
            {/* <View className='border-b border-slate-400' /> */}
            <FlatList
              data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}
              initialNumToRender={5}
              renderItem={({ item }) => <AchievementElement />}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              ListFooterComponent={<View className='h-16' />}
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