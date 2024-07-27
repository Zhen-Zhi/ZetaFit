import { ImageBackground, Pressable, StyleSheet, Text, View, Image, FlatList, TouchableWithoutFeedback, requireNativeComponent } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack } from 'expo-router'
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAuth } from '@/src/providers/AuthProvider'
import { useUpdateUser, useUserData } from '@/src/api/users'
import { LogBox } from 'react-native';
import { usePetClanWarAction } from '@/src/api/pets'
import { Tables } from '@/src/database.types'
import { useUpdateClanWar } from '@/src/api/clan'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createMaterialTopTabNavigator();

const Attack = ({ route }: any) => {
  const { onClose, clanId, clanWarId, isSecondClan, opponentClanHealth } = route.params;
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useUserData(session.user.id)

  const { mutate: insertAttack } = usePetClanWarAction();
  const { mutate: updateUserEnergy } = useUpdateUser();
  const { mutate: updateClanHealth } = useUpdateClanWar();
  const [attackSelected, setAttackSelected] = useState(false);
  const [skillSelected, setSkillSelected] = useState(false);

  const handleAttack = () => {
    let damage = 0
    const currentEnergy = userData?.energy
    if(!currentEnergy || currentEnergy < 20) {
      onClose()
      return
    }

    if(skillSelected) {
      damage = 80
    } else {
      damage = 40
    }

    insertAttack(
      {
        clan_war_id: clanWarId,
        clan_id: clanId,
        user_id: session.user.id,
        action: 'attack',
        contribute: damage
      }, 
      {
        onSuccess() {
          updateUserEnergy(
            { id: session.user.id, energy: currentEnergy - 20 }, 
          )

          isSecondClan 
            ?
          updateClanHealth(
            { 
              id: clanWarId,
              clan_1_health: opponentClanHealth - damage
            }, 
            {
              onSuccess() {
                onClose()
              }
            }
          )
            :
          updateClanHealth(
            { 
              id: clanWarId,
              clan_2_health: opponentClanHealth - damage
            }, 
            {
              onSuccess() {
                onClose()
              }
            }
          )
        }
      }
    )
  }

  return(
    <View className='flex-1'>
      <View className='mx-3 my-2 flex-row justify-between'>
        <Text className='font-bold text-[16px]'>Remaining Energy</Text>
        <View className='flex-row'>
          <View className='my-auto mr-1'>
            <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
          </View>
          <Text className='font-bold text-[16px]'>{userData?.energy} /160</Text>
        </View>
      </View>
      <AnimatedPressable
        pressInValue={0.98}
        onPress={() => {setAttackSelected(!attackSelected); setSkillSelected(false)}}
        className={`mx-3 mb-1.5 border rounded-lg p-2 bg-white ${attackSelected ? 'border-4 border-emerald-500' : 'border-slate-400'}`}
      >
        <View className='flex-row'>
          <Image className='w-12 h-14' source={require('@asset/images/attack_icon.png')} />
          <View className='flex-col mx-2'>
            <Text className='text-xl font-extrabold'>Attack Name</Text>
            <View className='flex-row'>
              <View className='flex-row mr-4'>
                <View className='my-auto mr-1'>
                  <FontAwesome name="bomb" size={24} color="black" />
                </View>
                <Text className='font-semibold my-auto text-lg'>40</Text>
              </View>
              <View className='flex-row mr-4'>
                <View className='my-auto mr-1'>
                  <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
                </View>
                <Text className='font-semibold my-auto text-lg'>20</Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedPressable>
      <AnimatedPressable
        pressInValue={0.98}
        onPress={() => {setSkillSelected(!skillSelected); setAttackSelected(false)}}
        className={`mx-3 border rounded-lg p-2 bg-white ${skillSelected ? 'border-4 border-emerald-500' : 'mb-1.5 border-slate-400'}`}
      >
        <View className='flex-row'>
          <Image className='w-12 h-14' source={require('@asset/images/skill_icon.png')} />
          <View className='flex-col mx-2'>
            <Text className='text-xl font-extrabold'>Attack Name</Text>
            <View className='flex-row'>
              <View className='flex-row mr-4'>
                <View className='my-auto mr-1'>
                  <FontAwesome name="bomb" size={24} color="black" />
                </View>
                <Text className='font-semibold my-auto text-lg'>80</Text>
              </View>
              <View className='flex-row mr-4'>
                <View className='my-auto mr-1'>
                  <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
                </View>
                <Text className='font-semibold my-auto text-lg'>20</Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedPressable>
      <AnimatedPressable 
        // style={{ backgroundColor: userData?.energy ? userData.energy < 20 ? themeColors.disabled : themeColors.danger : themeColors.disabled }}
        style={{
          backgroundColor: !userData?.energy || userData.energy < 20 || (!skillSelected && !attackSelected) ? themeColors.disabled : themeColors.danger
        }}
        pressInValue={0.98}
        className='m-3 mt-auto border border-slate-400 rounded-lg p-2 bg-white'
        disabled={!userData?.energy || userData.energy < 10 || (!skillSelected && !attackSelected)}
        onPress={handleAttack}
      >
        <Text style={{ color: themeColors.backgroundColor }} className='font-bold my-auto text-lg text-center'>Attack</Text>
      </AnimatedPressable>
    </View>
  )
};

const Defense = ({ route }: any) => {
  const { onClose, clanId, clanWarId, isSecondClan, clanHealth, clanMaxHealth } = route.params;
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useUserData(session.user.id)

  const { mutate: insertDefense } = usePetClanWarAction();
  const { mutate: updateUserEnergy } = useUpdateUser();
  const { mutate: updateClanHealth } = useUpdateClanWar();
  const [defenseSelected, setDefenseSelected] = useState(false);

  const handleDefense = () => {
    let heal = 20
    let clanHealthAfterHeal = 0
    const currentEnergy = userData?.energy
    if(!currentEnergy || currentEnergy < 10) {
      onClose()
      return
    }

    if(clanHealth + heal >= clanMaxHealth) {
      clanHealthAfterHeal = clanMaxHealth
    } else {
      clanHealthAfterHeal = clanHealth + heal
    }

    insertDefense(
      {
        clan_war_id: clanWarId,
        clan_id: clanId,
        user_id: session.user.id,
        action: 'defense',
        contribute: heal
      }, 
      {
        onSuccess() {
          updateUserEnergy(
            { id: session.user.id, energy: currentEnergy - 10 }, 
          )

          isSecondClan 
            ?
          updateClanHealth(
            { 
              id: clanWarId,
              clan_2_health: clanHealthAfterHeal
            }, 
            {
              onSuccess() {
                onClose()
              }
            }
          )
            :
          updateClanHealth(
            { 
              id: clanWarId,
              clan_1_health: clanHealthAfterHeal
            }, 
            {
              onSuccess() {
                onClose()
              }
            }
          )
        }
      }
    )
  }


  return (
    <View className='flex-1'>
    <View className='mx-3 my-2 flex-row justify-between'>
      <Text className='font-bold text-[16px]'>Remaining Energy</Text>
      <View className='flex-row'>
        <View className='my-auto mr-1'>
          <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
        </View>
        <Text className='font-bold text-[16px]'>{userData?.energy} /160</Text>
      </View>
    </View>
    <AnimatedPressable
      pressInValue={0.98}
      onPress={() => setDefenseSelected(!defenseSelected)}
      className={`mx-3 mb-1.5 border rounded-lg p-2 bg-white ${defenseSelected ? 'border-4 border-emerald-500' : 'border-slate-400'}`}
    >
      <View className='flex-row'>
        <Image className='w-12 h-14' source={require('@asset/images/defense_icon.png')} />
        <View className='flex-col mx-2'>
          <Text className='text-xl font-extrabold'>Defense Skill</Text>
          <View className='flex-row'>
            <View className='flex-row mr-4'>
              <View className='my-auto mr-1'>
                <FontAwesome name="plus" size={24} color={themeColors.tetiary} />
              </View>
              <Text className='font-semibold my-auto text-lg'>20</Text>
            </View>
            <View className='flex-row mr-4'>
              <View className='my-auto mr-1'>
                <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
              </View>
              <Text className='font-semibold my-auto text-lg'>10</Text>
            </View>
          </View>
        </View>
      </View>
    </AnimatedPressable>
    <AnimatedPressable 
      // style={{ backgroundColor: userData?.energy ? ((userData.energy < 10 && !defenseSelected) ? themeColors.disabled : themeColors.secondary) : themeColors.disabled }}
      style={{ backgroundColor: !userData?.energy || userData.energy < 10 || !defenseSelected ? themeColors.disabled : themeColors.secondary }}
      pressInValue={0.98}
      className='m-3 mt-auto border border-slate-400 rounded-lg p-2 bg-white'
      disabled={!userData?.energy || userData.energy < 10 || !defenseSelected}
      onPress={handleDefense}
    >
      <Text style={{ color: themeColors.backgroundColor }} className='font-bold my-auto text-lg text-center'>Defense</Text>
    </AnimatedPressable>
    </View>
  )
};

type ClanWarBattleLogProps = {
  clanId: number;
  clanWar: Tables<'clan_war'>;
  actionType: string;
  isSecondClan: boolean;
  clanMaxHealth: number;
  onClose: () => void
}

const ClanWarActionScreenModal = ({ clanId, clanWar, actionType, isSecondClan, clanMaxHealth, onClose }: ClanWarBattleLogProps) => {
  const clanWarId = clanWar.id
  const opponentClanHealth = isSecondClan ? clanWar.clan_1_health : clanWar.clan_2_health
  const clanHealth = isSecondClan ? clanWar.clan_2_health : clanWar.clan_1_health

  return (
    <Pressable className='flex-1 bg-black/50' onPress={onClose}>
    <Pressable className='flex-1 my-16 mx-8' onPress={(event) => event.stopPropagation()}>
    <Stack.Screen />
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      imageStyle={{ borderRadius: 20 }}
      className='flex-1'
    >
    <View className='bg-white/40 rounded-xl pt-2'>
      <Image
        source={require('@asset/images/pets/dragon.png')} 
        className='h-64 w-64 mx-auto mt-2'
      />
      <Text className='text-center font-semibold text-xl mb-4'>Dragon</Text>
      <AnimatedPressable 
        pressInValue={0.9} 
        className='z-10 m-3 absolute'
        onPress={onClose}
      >
        <View className='p-1'>
          <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
        </View>
      </AnimatedPressable>
    </View>

    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent',}}
      initialRouteName={actionType}
      screenOptions={{
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
        tabBarIndicatorStyle: { backgroundColor: themeColors.tetiary, borderRadius: 0 },
        tabBarLabelStyle: {
          fontWeight: 700,
          fontSize: 16
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#cbd5e1',
          height: 45,
          backgroundColor: themeColors.backgroundColor
        },
      }}
    >
      <Tab.Screen 
        name='attack' 
        component={Attack} 
        options={{ tabBarLabel: 'Attack' }} 
        initialParams={{ onClose, clanWarId, clanId, isSecondClan, opponentClanHealth }} 
      />
      <Tab.Screen 
        name='defense' 
        component={Defense} 
        options={{ tabBarLabel: 'Defense' }}
        initialParams={{ onClose, clanWarId, clanId, isSecondClan, clanHealth, clanMaxHealth }}  
      />
    </Tab.Navigator>
    </ImageBackground>
    </Pressable>
    </Pressable>
  )
}

export default ClanWarActionScreenModal

const styles = StyleSheet.create({})