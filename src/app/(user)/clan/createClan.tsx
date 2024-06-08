import { ImageBackground, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ClanLogoListModal from './clanLogoList';
import AwesomeButton from "react-native-really-awesome-button";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

type CreateClanScreenProps = {
  onClose: () => void
}

const CreateClanScreen = ({ onClose }: CreateClanScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [clanLogo, setClanLogo] = useState<{ id: number; image: any; }>({id: 1, image: require('@asset/images/clan_logo/clan_logo_1.png')})
  const [amount, setAmount] = useState(0);

  const increment = () => {
    setAmount(prevAmount => prevAmount + 100);
  };

  const decrement = () => {
    setAmount(prevAmount => prevAmount > 0 ? prevAmount - 100 : 0);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      className='justify-end bg-black flex-1'
    >
    <ImageBackground
      className='h-full'
      source={require('@asset/images/background_image.png')}
    >
      <View className='flex-row justify-normal pt-3 pb-2 px-4 bg-white border-b border-slate-300'>
        <Stack.Screen />
        <AnimatedPressable 
          pressInValue={0.9} 
          className='absolute left-2 top-2 z-10'
          onPress={onClose}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center m-auto text-xl font-semibold'>Create New Clan</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className=''>
        <View className='bg-[#f8f8f8]/50 mx-2 p-4 rounded-xl'>
          <Image
            style={{ width: 130, height: 160 }}
            className='mx-auto mt-4'
            // source={require(`@asset/images/clan_logo/clan_logo_1.png`)}
            source={clanLogo.image}
          />
          {/* <AwesomeButton style={{ margin: 'auto', marginTop: 10 }} width={160} backgroundColor={themeColors.primary} height={45} raiseLevel={4} springRelease={false} >
            <Text className='text-white font-bold'>Select Clan Logo</Text>
          </AwesomeButton> */}
          <AnimatedPressable 
            pressInValue={0.95}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: themeColors.secondary }} className='text-lg font-bold mx-auto mt-2'>Select Clan Logo</Text>
          </AnimatedPressable>
          <View className='my-2 flex-col'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Clan Name</Text>
            <TextInput
              className='border-b border-slate-400 rounded-lg p-3'
              placeholder='Enter Clan Name......'
              maxLength={20}
              style={{ color: themeColors.primary }}
            />
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

          <View className='my-2 flex-col'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Required ActiveScore</Text>
            <View className='flex-row'>
            <AnimatedPressable pressInValue={0.96} onPress={decrement}>
             <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_left.png')} />
            </AnimatedPressable>
            <TextInput
              value={amount.toString()}
              className='p-3 w-1/4 text-center text-lg font-bold'
              style={{ color: themeColors.primary }}
            />
            <AnimatedPressable pressInValue={0.96} onPress={increment}>
              <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_right.png')} />
            </AnimatedPressable>
            </View>
          </View>

          <View className='flex-row justify-center mt-8'>
            <Image className='aspect-square w-8' source={require('@asset/images/coin_icon.png')} />
            <Text style={{ color: themeColors.primary }} className='my-auto mx-2 text-lg font-bold'>2000</Text>
          </View>

          <AnimatedPressable
            style={{ backgroundColor: themeColors.secondary }}
            className='w-3/5 mx-auto h-10 rounded-lg my-auto mt-2'
            pressInValue={0.95}
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
        onRequestClose={() => setModalVisible(false)}
      >
        <ClanLogoListModal onClose={() => setModalVisible(false)} onSelectLogo={(logo) => setClanLogo(logo)}/>
      </Modal>
    </ImageBackground>
    <View className='flex-1' />
    </KeyboardAvoidingView>
  )
}

export default CreateClanScreen

const styles = StyleSheet.create({})