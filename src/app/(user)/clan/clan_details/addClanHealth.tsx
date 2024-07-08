import { Pressable, StyleSheet, Text, TextInput, View, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import AnimatedModal from '@/src/components/AnimatedModal'
import { useUpdateClanHealth } from '@/src/api/clan'
import { useUpdateUserCoin, useUserData } from '@/src/api/users'
import { useAuth } from '@/src/providers/AuthProvider'
import { Redirect } from 'expo-router'

type AddClanHeatlhModalProps = {
  onClose: () => void;
  clanHealth: number;
  clanId: number;
}

const AddClanHealthModal = ({ onClose, clanHealth, clanId }: AddClanHeatlhModalProps) => {
  const { session } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null)

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { mutate: updateClanHealth, error: updateClanHealthError } = useUpdateClanHealth()
  const { mutate: updateCoin, error: updateUserCoinError } = useUpdateUserCoin()
  const { data: user, isLoading: userDataLoading, error: getUserDataError } = useUserData(session.user.id)

  const handleUpdateClanHealth = async () => {
    setIsLoading(true)

    if (!user?.coin) {
      console.error("User coin not found!!  Please debug in '@/src/app/(user)/clan/clan_details/addClanHealth.tsx'")
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
    const newUserCoin = user.coin - 2000;
    clanHealth += 500


    updateClanHealth(
      { clanId , clanHealth },
      {
        onSuccess() {
          updateCoin(
            { userId, newUserCoin },
            {
              onSuccess() {
                onClose();
                setIsLoading(false)
              },
              onError(error) {
                setErrorCode(error.message.split(":")[0])
                console.log(error.message)
                clanHealth -= 500
                updateClanHealth(
                  { clanId , clanHealth }, 
                  {
                    onSuccess() {
                      onClose();
                      setIsLoading(false)
                    }
                  })
              }
            }
          )
        },
        onError(error) {
          setErrorCode(error.message.split(":")[0])
          setIsLoading(false)
        }
      },
    )
  }

  return (
    <AnimatedModal onClose={onClose}>
      <View className='p-4'>
        <Text style={{ color: themeColors.primary }} className='font-extrabold text-lg'>Upgrade Clan Health</Text>
        <View className='flex-row justify-center my-6'>
          <View className='my-auto'>
            <FontAwesome6 name="shield-heart" size={26} color='red' />
          </View>
          <Text style={{ color: themeColors.primary }} className='font-extrabold text-2xl mx-2'>{clanHealth}</Text>
          <View className='my-auto'>
            <FontAwesome name="arrow-right" size={20} color="black" />
          </View>
          <Text className='font-extrabold text-2xl mx-2 text-emerald-500'>{clanHealth + 500}</Text>
        </View>
        <View className='flex-row justify-between'>
          <AnimatedPressable 
            style={{ backgroundColor: Number(user?.coin) < 2000 ? themeColors.disabled : themeColors.secondary }} 
            className='flex-1 p-2 rounded-lg h-12' 
            pressInValue={0.95} 
            onPress={handleUpdateClanHealth}
            disabled={Number(user?.coin) < 2000}
          >
            { isLoading
              ? 
              (
                <ActivityIndicator size={28} color='white' className='ay-auto' />
              )
              :
              (
                <View className='flex-row justify-center my-auto p-0.5'>
                  <Image className='w-8 h-8 mr-2' source={require('@asset/images/coin_icon.png')} />
                  <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>2000</Text>
                </View>
              )
            }
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedModal>
  )
}

export default AddClanHealthModal

const styles = StyleSheet.create({})