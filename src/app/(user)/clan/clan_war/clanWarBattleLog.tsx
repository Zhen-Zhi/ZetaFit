import { ImageBackground, Pressable, StyleSheet, Text, View, Image, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClanWarAttackDetialsScreen from './clanWarAttackDetials'
import ClanWarDefenseDetialsScreen from './clanWarDefenseDetails'
import { useClanWarDetails } from '@/src/api/clan'

const Tab = createMaterialTopTabNavigator();

const Attack = ({ route }: any) => {
  const { attackList } = route.params;

  return ( 
    <FlatList
      className='mt-2'
      data={attackList}
      renderItem={({ item }) => <ClanWarAttackDetialsScreen details={item} />}
    />
  )
};

const Defense = ({ route }: any) => {
  const { defenseList } = route.params;

  return ( 
    <FlatList
      className='mt-2'
      data={defenseList}
      renderItem={({ item }) => <ClanWarDefenseDetialsScreen details={item} />}
    />
  )
};

// const Defense = () => (
//   <FlatList
//     className='mt-2'
//     data={[1,2,3,4,5]}
//     renderItem={({ item }) => <ClanWarDefenseDetialsScreen />}
//   />
// );

type ClanWarBattleLogProps = {
  clanWarId: number;
  clanId: number;
  onClose: () => void
}

const ClanWarBattleLogScreen = ({ onClose, clanWarId, clanId }: ClanWarBattleLogProps) => {
  const {
    data: clanWarDetails,
    error: clanWarDetailsError,
    isLoading: clanWarDetailsIsLoading,
  } = useClanWarDetails(clanWarId, clanId)

  const attackList = clanWarDetails?.filter(detail => detail.action === "attack");
  const defenseList = clanWarDetails?.filter(detail => detail.action === "defense");

  if(clanWarDetailsIsLoading) {
    return <ActivityIndicator />
  }

  return (
    <Pressable className='flex-1 bg-black/50' onPress={onClose}>
    <Pressable className='flex-1 my-16 mx-8' onPress={(event) => event.stopPropagation()}>
    <Stack.Screen />
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      imageStyle={{ borderRadius: 20 }}
      className='flex-1'
    >
    <View className='bg-white/40 rounded-xl'>
      <Image
        source={require('@asset/images/battle_log_logo.png')} 
        className='h-36 w-36 mx-auto my-2'
      />
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
        initialParams={{ attackList }}
      />
      <Tab.Screen 
        name='defense' 
        component={Defense} 
        options={{ tabBarLabel: 'Defense' }} 
        initialParams={{ defenseList }}
      />
    </Tab.Navigator>
    </ImageBackground>
    </Pressable>
    </Pressable>
  )
}

export default ClanWarBattleLogScreen

const styles = StyleSheet.create({})