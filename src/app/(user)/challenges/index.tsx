import { ImageBackground, Platform, StyleSheet, Text, View, Image, FlatList, LayoutChangeEvent } from 'react-native'
import React, { useRef, useState } from 'react'
import { Stack } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChallengesCard from '@/src/components/ChallengesCard'

type ListItemType = {
  id: number;
  name: string;
  // any other properties
};

const ListOptions: ListItemType[] = [
  { id: 1, name: 'Profile' },
  { id: 2, name: 'Setting' },
  { id: 3, name: 'Activities' },
];

const ChallengesScreen = () => {
  const flatListRef = useRef<FlatList<ListItemType>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flatListWidth, setFlatListWidth] = useState(0);

  const scrollToNextItem = () => {
    if (flatListRef.current) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < ListOptions.length) {
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
        <SafeAreaView edges={['top']} className='px-6 flex-1'>
          <Stack.Screen options={{ headerShown: false }} />
          <Text className='text-[32px] font-extrabold mt-6 bg-white/50'>Your Challenges</Text>
          
          <View className='flex-row justify-between mt-2'>
            <AnimatedPressable
              className='mx-1'
              pressInValue={0.9}
              onPress={scrollToPreviousItem}
            >
              <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_left.png')} />
            </AnimatedPressable>
            <FlatList
              ref={flatListRef}
              className='flex-1'
              data={ListOptions}
              renderItem={({ item }) => <ChallengesCard fullWidth={flatListWidth - 2} />} // 2 px for border
              keyExtractor={item => item.name}
              contentContainerStyle= {{ gap: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              onLayout={handleLayout}
              scrollEnabled={false}
            />
            <AnimatedPressable
              className='mx-1'
              pressInValue={0.9}
              onPress={scrollToNextItem}
            >
              <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_right.png')} />
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
          <Text className='text-xl font-bold mt-4 mb-2 bg-white/50'>Recommended For You</Text>
          <AnimatedPressable
            className='rounded-lg border border-slate-600 bg-white'
            pressInValue={0.95}
          >
            <View className='flex-row'>
            <Image
              className='w-20 h-20 my-auto mx-1'
              source={require('@asset/images/badges.png')}
            />
            <Image
              className='flex-1 h-32 rounded-tr-lg'
              source={require('@asset/images/challenges_banner.png')}
            />
            </View>
            <View style={{ backgroundColor: themeColors.backgroundColor }} className='p-2'>
              <Text className='text-lg font-bold'>1000 Minute Run Challenges</Text>
            </View>
          </AnimatedPressable>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default ChallengesScreen

const styles = StyleSheet.create({})