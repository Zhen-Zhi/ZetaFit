import { ImageBackground, Pressable, StyleSheet, Text, View, Image, ScrollView, Dimensions, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Entypo, FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import PetDetailsScreen from './petDetails';
import AnimatedModal from '@/src/components/AnimatedModal'

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [petActionModalVisible, setPetActionModalVisible] = useState(false);
  const ITEMWIDTH = Dimensions.get('window').width / 2 - 16;

  const onBattlePets = (
    <View className='mt-2'>
      <AnimatedPressable
        pressInValue={0.98}
        onLongPress={() => setModalVisible(true)}
        delayLongPress={300}
        onPress={() => setPetActionModalVisible(true)}
      >
        <Image
          className='w-56 h-56 mx-auto'
          source={require('@asset/images/pets/turtle.png')}
        />
        <View>
          <View className='absolute left-[30%]'>
            <Image className='h-10 w-8' source={require('@asset/images/attack_icon.png')} />
          </View>
          <Text className='font-bold text-2xl text-center'>Turtle</Text>
          <Text className='font-medium text-center'>LV 40</Text>
        </View>
      </AnimatedPressable>

      <View 
        className='my-4 border-slate-300 border-y-2 p-2'
        style={{ backgroundColor: themeColors.backgroundColor }}
      >
        <Text
          className='text-2xl font-extrabold ml-4'
          style={{ color: themeColors.primary }}
        >
          Available Pets
        </Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }}  />
      <ImageBackground
        source={require('@asset/images/background_image.png')}
        className='flex-1'
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Profile</Text>
          <AnimatedPressable 
            pressInValue={0.9}
            className='z-10 absolute right-3 top-2.5'
            onPress={() => router.push('/profile/activityLog')}
          >
            <View className='my-auto'>
              <FontAwesome name='history' size={27} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>

        <FlatList
          className='bg-white/30'
          data={[1,2,3,4,5,6,7,8,9,10]}
          renderItem={() => 
            <AnimatedPressable
              className='m-1'
              pressInValue={0.98}
              onLongPress={() => setModalVisible(true)}
              delayLongPress={300}
              onPress={() => setPetActionModalVisible(true)}
            >
              <Image
                style={{ width: ITEMWIDTH, height: ITEMWIDTH }}
                source={require('@asset/images/pets/turtle.png')}
                resizeMode='contain'
              />
              <View className='flex-col mx-auto'>
                <Text className='font-semibold text-xl text-center'>Turtle</Text>
                <Text className='font-medium text-center'>LV 40</Text>
              </View>  
            </AnimatedPressable>
          }
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          ListHeaderComponent={onBattlePets}
          ListFooterComponent={<Text className='text-center text-slate-400 font-semibold'>You had reach the end</Text>}
        />


        <Modal
          animationType='fade'
          visible={modalVisible}
          presentationStyle='overFullScreen'
          transparent={true}
          onRequestClose={() =>setModalVisible(false)}
        >
          <SafeAreaProvider>
            <SafeAreaView edges={['top']} style={{ backgroundColor: themeColors.backgroundColor }} className='flex-1'>
              <PetDetailsScreen onClose={() => setModalVisible(false)} />
            </SafeAreaView>
          </SafeAreaProvider>
        </Modal>

        <Modal
          animationType='fade'
          visible={petActionModalVisible}
          presentationStyle='overFullScreen'
          transparent={true}
          onRequestClose={() =>setPetActionModalVisible(false)}
        >
          <AnimatedModal onClose={() => setPetActionModalVisible(false)}>
            <ImageBackground
              className='p-4'
              source={require('@asset/images/background_image.png')}
            >
              <Image
                className='w-44 h-44 mx-auto'
                source={require('@asset/images/pets/turtle.png')}
              />
              <Text className='font-bold text-lg text-center mb-4'>Turtle</Text>

              <AnimatedPressable
                className='border border-slate-600 rounded-lg p-1 my-1 bg-white'
                pressInValue={0.95}
              >
                <View>
                  <Image className='w-5 h-6 absolute left-[25%] top-0.5' source={require('@asset/images/attack_icon.png')} />
                  <Text style={{ color: themeColors.secondary }} className='font-bold text-lg text-center'>Go Battle</Text>
                </View>
              </AnimatedPressable>
              <AnimatedPressable
                className='border border-slate-600 rounded-lg p-1 my-1 bg-white'
                pressInValue={0.95}
              >
                <Text style={{ color: themeColors.secondary }} className='font-bold text-lg text-center'>Upgrade</Text>
              </AnimatedPressable>
            </ImageBackground>
          </AnimatedModal>
        </Modal>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})