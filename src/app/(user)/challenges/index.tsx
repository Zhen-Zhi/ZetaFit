import { ImageBackground, Platform, StyleSheet, Text, View, Image, FlatList, LayoutChangeEvent, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChallengesCard from '@/src/components/ChallengesCard'
import { CurvedTransition } from 'react-native-reanimated'

type ChallengesType = {
  id: number;
  name: string;
  progress ?: number;
};

const Challenges: ChallengesType[] = [
  { id: 1, name: '1000 Minute Run Challenges', progress: 0.3 },
  { id: 2, name: 'Full Marathon', progress: 0.8 },
  { id: 3, name: 'Swimming With Passion', progress: 0.15 },
];

const ReChallenges: ChallengesType[] = [
  { id: 1, name: '1000 Minute Run Challenges' },
  { id: 2, name: 'Full Marathon' },
  { id: 3, name: 'Swimming With Passion' },
  { id: 4, name: '1000 Minute Run Challenges' },
  { id: 5, name: 'Full Marathon' },
  { id: 6, name: 'Swimming With Passion' },
];

const ChallengesScreen = () => {
  const flatListRef = useRef<FlatList<ChallengesType>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flatListWidth, setFlatListWidth] = useState(0);

  const scrollToNextItem = () => {
    if (flatListRef.current) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < Challenges.length) {
        flatListRef.current.scrollToIndex({ index: nextIndex });
        setCurrentIndex(nextIndex);
      }
    }
  };

  const scrollToPreviousItem = () => {
    if (flatListRef.current) {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        flatListRef.current.scrollToIndex({ index: prevIndex });
        setCurrentIndex(prevIndex);
      }
    }
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setFlatListWidth(width);  // Update state with new width
  };

  return (
    <View className='flex-1'>
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
        <ScrollView className='mb-2'>
        <SafeAreaView edges={['top']} className='px-6 flex-1'>
          <Stack.Screen options={{ headerShown: false }} />
          <Text className='text-[32px] font-extrabold mt-6 bg-white/50'>Your Challenges</Text>
          
          <View className='flex-row mt-2'>
            <FlatList
              ref={flatListRef}
              className='flex-1'
              data={Challenges}
              renderItem={({ item }) => <ChallengesCard data={item} fullWidth={flatListWidth - 2} />} // 2 px for border
              keyExtractor={item => item.name}
              contentContainerStyle= {{ gap: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              onLayout={handleLayout}
              scrollEnabled={false}
            />
          </View>
          <View className='flex-row justify-between mt-2'>
            <AnimatedPressable
              style={ currentIndex == 0 ? { opacity: 0.5 } : { opacity: 1 } }
              className='mx-1'
              pressInValue={0.9}
              onPress={scrollToPreviousItem}
              disabled={ currentIndex == 0 }
            >
              <View className='flex-row'>
                <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_left.png')} />
                <Text className='mx-2 font-medium'>Previous</Text>
              </View>
            </AnimatedPressable>
            <AnimatedPressable
              style={ currentIndex == Challenges.length - 1 ? { opacity: 0.5 } : { opacity: 1 } }
              className='mx-1'
              pressInValue={0.9}
              onPress={scrollToNextItem}
              disabled={ currentIndex == Challenges.length - 1 }
            >
              <View className='flex-row'>
                <Text className='mx-2 font-medium'>Next</Text>
                <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_right.png')} />
              </View>
            </AnimatedPressable>
          </View>

          <View className='mt-8 flex-row'>
            <AnimatedPressable 
              pressInValue={0.95}
              className='border border-slate-600 rounded-lg p-2 mr-3 bg-white'
            >
              <View>
                <Text className='font-bold'>Trending</Text>
              </View>
            </AnimatedPressable>
            <AnimatedPressable 
              pressInValue={0.95}
              className='border border-slate-600 rounded-lg p-2 bg-white'
            >
              <View>
                <Text className='font-bold'>Latest</Text>
              </View>
            </AnimatedPressable>
          </View>
          <View className='flex-row justify-between mt-1'>
            <Text className='text-xl font-bold bg-white/50'>Recommended For You</Text>
            <AnimatedPressable pressInValue={0.95} onPress={() => router.push('/challenges/allChallenges')}>
              <Text style={{ color: themeColors.secondary }} className='my-auto mr-2 text-md font-semibold'>View All</Text>
            </AnimatedPressable>
          </View>
          { ReChallenges.map(( challenge ) => <ChallengesCard classNameAsProps='mt-2' data={challenge} />) }
          <Text className='text-center text-slate-500 font-semibold'>You had reach the end</Text>
        </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

export default ChallengesScreen

const styles = StyleSheet.create({})