import { ImageBackground, Image, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5 } from '@expo/vector-icons';
import { themeColors } from '@/src/constants/Colors';

type ModalProps = {
  onClose: () => void;
};

const ProfileScreen = ({ onClose }: ModalProps) => {
  const [image, setImage] = useState<string | null>(null);

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
    // const { data, error } = await supabase.storage
    //   .from('product-images')
    //   .upload(filePath, decode(base64), { contentType });
  
    // if (data) {
    //   return data.path;
    // }
  };

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
        <AnimatedPressable pressInValue={0.9} className='z-10'>
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
          <View className='flex-row mt-3 mb-4 justify-center'>
            {/* <ImageBackground
              source={require('@asset/images/star.png')}
              className='z-10 w-12 aspect-square ml-3'
            >
              <Text className='z-10 text-lg ml-2 mt-3 w-8 text-center text-black font-extrabold'>1</Text>
            </ImageBackground> */}
            <Text style={{ color: themeColors.primary }} className='text-xl font-bold '>Username</Text>
          </View>
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
          {/* <AnimatedPressable 
            onPress={onClose}
            style={[styles.image, styles.shadowAndriod]} 
            className='bg-white border border-slate-400 h-12 flex-row my-4 mx-2 rounded-lg shadow shadow-slate-400'
            pressInValue={0.97}
            >
            <Image
              className='w-16 ml-2 mt-4 aspect-square'
              source={require('@asset/images/CyberKongz.jpg')} 
            />
            <Text className='text-center font-extrabold text-lg p-1'>Clan Name</Text>
          </AnimatedPressable> */}

          <View className='mt-4 p-2'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-medium my-2'>Achivements</Text>
            {/* <View className='border-b border-slate-400' /> */}
            <FlatList
              numColumns={4}
              data={[1,2,3,4,5,6,7,8]}
              renderItem={({ item }) => <View><Text>item</Text></View>}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
            />
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