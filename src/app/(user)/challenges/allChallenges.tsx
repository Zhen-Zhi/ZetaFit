import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import ChallengesCard from '@/src/components/ChallengesCard'
import { themeColors } from '@/src/constants/Colors'

type ChallengesType = {
  id: number;
  name: string;
};

const Challenges = [
  { id: 1, name: '1. Urban Jungle Marathon' },
  { id: 2, name: '2. Desert Trek Challenge' },
  { id: 3, name: '3. Arctic Swim Adventure' },
  { id: 4, name: '4. Rainforest Escape Run' },
  { id: 5, name: '5. Mountain Peak Sprint' },
  { id: 6, name: '6. Volcano Climbing Quest' },
  { id: 7, name: '7. Night City Cycling Rally' },
  { id: 8, name: '8. Sahara Ultra Marathon' },
  { id: 9, name: 'Coral Reef Diving Expedition' },
  { id: 10, name: 'Highland Hiking Challenge' },
  { id: 11, name: 'Winter Biathlon' },
  { id: 12, name: 'Deep Forest Orienteering' },
  { id: 13, name: 'Urban Parkour Race' },
  { id: 14, name: 'Suburban Triathlon' },
  { id: 15, name: 'Tropical Island Kayaking' }
];


const AllChanllengesScreen = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0); // 0 = page 1
  const [displayedChallenges, setDisplayedChallenges] = useState(Challenges.slice(currentPage * itemsPerPage, currentPage + 1 * itemsPerPage));
  const scrollViewRef = useRef<ScrollView>(null);
  
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }

  useEffect(() => {
    setDisplayedChallenges(Challenges.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage));
  }, [Challenges, currentPage]);
  
  return (
    <View className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className='flex-1' edges={['top']}>
        <ImageBackground
          source={require('@asset/images/background_image.png')}
          className='flex-1'
        >
        <View className='flex-1 p-2'>
          <View className='flex-row m-2'>
            <TextInput
              className='border border-slate-400 p-2 rounded-lg bg-white flex-1 mr-2'
              placeholder='Search by name'
            />
            <AnimatedPressable
              className='border border-slate-400 rounded-lg bg-white'
              pressInValue={0.9}
            >
              <View className='my-auto mx-3'>
                <FontAwesome6 name="magnifying-glass" size={20} color="black" />
              </View>
            </AnimatedPressable>
          </View>
          <ScrollView ref={scrollViewRef} className='flex-1'>
            <View className='flex-row'>
              <AnimatedPressable className='mx-2' pressInValue={0.95}>
                <View className='p-1 my-auto'>
                  <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
                </View>
              </AnimatedPressable>
              <Text className='text-3xl font-bold bg-white/50'>All Chanllenges</Text>
            </View>
          <View className='mx-2.5'>
            { displayedChallenges.map(( challenge ) => <ChallengesCard key={challenge.id} classNameAsProps='my-3' data={challenge} />) }
          </View>
          <View className='flex-row justify-between bg-white/50 mx-3'>
            <AnimatedPressable
              style={ currentPage == 0 ? { opacity: 0.5 } : { opacity: 1 } }
              className='flex-1'
              pressInValue={0.9}
              onPress={previousPage}
              disabled={ currentPage == 0 }
            >
              <View className='flex-row mx-1'>
                <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_left.png')} />
                <Text className='mx-2 font-medium'>Previous</Text>
              </View>
            </AnimatedPressable>
            <Text className='font-bold flex-1 text-md text-center'>{currentPage + 1}</Text>
            <AnimatedPressable
              style={ currentPage * itemsPerPage + itemsPerPage >= Challenges.length ? { opacity: 0.5 } : { opacity: 1 } }
              className='flex-1'
              pressInValue={0.9}
              onPress={nextPage}
              disabled={currentPage * itemsPerPage + itemsPerPage >= Challenges.length}
            >
              <View className='flex-row self-end mx-1'>
                <Text className='mx-2 font-medium'>Next</Text>
                <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_right.png')} />
              </View>
            </AnimatedPressable>
          </View>
          </ScrollView>
        </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  )
}

export default AllChanllengesScreen

const styles = StyleSheet.create({})