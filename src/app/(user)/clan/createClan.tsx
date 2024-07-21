import { ImageBackground, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Modal, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Zocial } from '@expo/vector-icons';
import ClanLogoListModal from './clanLogoList';
import AwesomeButton from "react-native-really-awesome-button";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack, router } from 'expo-router';
import { useCreateNewClan, useDeleteClan } from '@/src/api/clan';
import { useAuth } from '@/src/providers/AuthProvider';
import ActiveChallengesCard from '@/src/components/ActiveChallengesCard';
import { Mutation } from '@tanstack/react-query';
import { Tables } from '@/src/database.types';
import { useUpdateUserClanId, useUpdateUserCoin, useUserData } from '@/src/api/users';

type CreateClanScreenProps = {
  onClose: () => void
}

const CreateClanScreen = ({ onClose }: CreateClanScreenProps) => {
  const { session } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const [clanLogo, setClanLogo] = useState<{ id: number; image: any; }>({id: 1, image: require('@asset/images/clan_logo/clan_logo_1.png')})
  const [clanName, setClanName] = useState('');
  const [clanDescription, setClanDescription] = useState('');
  const [requiredActiveScore, setRequiredActiveScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { mutate: updateCoin } = useUpdateUserCoin()
  const { mutate: createClan } = useCreateNewClan()
  const { mutate: deleteClan } = useDeleteClan()
  const { mutate: updateUserClanId } = useUpdateUserClanId()
  const { data: user, isLoading: userDataLoading, error } = useUserData(session.user.id)

  const increment = () => {
    setRequiredActiveScore(prevScore => prevScore + 100);
  };

  const decrement = () => {
    setRequiredActiveScore(prevScore => prevScore > 0 ? prevScore - 100 : 0);
  };

  const handleCreateClan = async () => {
    setIsLoading(true)
    setErrorCode(null)
    
    console.log("User coin : " + user?.coin)
    if (!user?.coin) {
      console.error("User coin not found!!  Please debug in '@/src/app/(user)/clan/createClan.tsx'")
      return
    }

    // duplicated coin balance checking
    // in case disable is broken
    if (Number(user?.coin) < 2000) {
      console.warn('Not enuf money');
      onClose();
      return
    }

    const userId = user?.id;
    const newUserCoin = user?.coin - 2000;

    createClan(
      { 
        founder_id: userId,
        clan_name: clanName,
        required_active_score: requiredActiveScore,
        clan_description: clanDescription
      },
      {
        onSuccess(createdClan) {
          updateCoin(
            { userId, newUserCoin },
            {
              onSuccess() {
                onClose();
                setIsLoading(false)
              },
              onError(error) {
                setErrorCode(error.message.split(":")[0])
                deleteClan(createdClan.clan_id)
                setIsLoading(false)
              }
            }
          )
        },
        onError(error) {
          setErrorCode(error.message.split(":")[0])
          setIsLoading(false)
        }
      }
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      className='justify-end bg-black flex-1'
    >
    
    <ImageBackground
      className='h-full'
      source={require('@asset/images/background_image.png')}
    >
      <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pt-3 pb-2 px-4 border-b border-slate-300 ${Platform.OS == 'ios' ? 'h-20' : 'h-14'}`}>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10 absolute left-3 bottom-2'
          onPress={onClose}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-2xl font-extrabold'>Create Clan</Text>
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
            className='mx-auto p-2'
            pressInValue={0.95}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: themeColors.secondary }} className='text-lg font-bold mx-auto'>Select Clan Logo</Text>
          </AnimatedPressable>
          <View className='my-2 flex-col'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Clan Name</Text>
            <TextInput
              value={clanName}
              className={
                `rounded-lg p-3 bg-white/50
                ${ !isLoading && errorCode != null
                  ? 'border-b border-red-600' 
                  : 'border-b border-slate-400'
                }`
              }
              placeholder='Enter Clan Name......'
              maxLength={20}
              style={{ color: themeColors.primary }}
              onChangeText={setClanName}
            />
            { !isLoading && errorCode == '23505' 
                // duplicate key value violates unique constraint "clans_clan_name_key"
                  ? <Text className='mx-2 my-1 text-red-600'>This clan name already existed!</Text>
                  : 
                !isLoading && errorCode == '23514'
                //new row for relation "clans" violates check constraint "clans_clan_name_check"
                  ? <Text className='mx-2 my-1 text-red-600'>Clan name must more than 3 characters!</Text>
                  : 
                !isLoading && errorCode != null
                  && <Text className='mx-2 my-1 text-red-600'>Unexpected error. Please try again.</Text>
              }
          </View>
          <View className='my-2'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Clan Descriptions</Text>
            <TextInput
              className='border-b border-slate-400 rounded-lg p-3 bg-white/50'
              placeholder='Your Descriptions......'
              maxLength={100}
              multiline
              style={{ color: themeColors.primary }}
              onChangeText={setClanDescription}
            />
          </View>

          <View className='my-2 flex-col'>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold my-auto'>Required ActiveScore</Text>
            <View className='flex-row'>
            <AnimatedPressable pressInValue={0.96} onPress={decrement}>
             <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_left.png')} />
            </AnimatedPressable>
            <TextInput
              value={requiredActiveScore.toString()}
              className='p-3 w-1/4 text-center text-lg font-bold'
              style={{ color: themeColors.primary }}
              editable={false}
            />
            <AnimatedPressable pressInValue={0.96} onPress={increment}>
              <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_right.png')} />
            </AnimatedPressable>
            </View>
          </View>

          <View className='flex-row justify-center mt-8'>
            <Image className='aspect-square w-8' source={require('@asset/images/coin_icon.png')} />
            <Text 
              className='my-auto mx-2 text-lg font-bold'
              style={{ color: Number(user?.coin) < 2000 
                ? themeColors.danger 
                : themeColors.primary 
              }} 
            >
              2000
            </Text>
          </View>

          <AnimatedPressable
            style={{ backgroundColor: 
              Number(user?.coin) < 2000 
                ? themeColors.disabled 
                : themeColors.secondary 
            }}
            className='w-3/5 mx-auto h-10 rounded-lg my-auto mt-2'
            pressInValue={0.95}
            onPress={handleCreateClan}
            disabled={Number(user?.coin) < 2000}
          >
            { isLoading 
              ? <ActivityIndicator className='my-auto' size={30} color='white' />
              : <Text className='text-lg text-white font-bold text-center my-auto'>Create Clan</Text>
            }
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
        <ClanLogoListModal 
          onClose={() => setModalVisible(false)} 
          onSelectLogo={(logo) => setClanLogo(logo)}
        />
      </Modal>
    </ImageBackground>
    <View className='flex-1' />
    </KeyboardAvoidingView>
  )
}

export default CreateClanScreen

const styles = StyleSheet.create({})