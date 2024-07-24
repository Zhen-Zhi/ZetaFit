import { ImageBackground, Platform, StyleSheet, Text, View, Image, FlatList, LayoutChangeEvent, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { Redirect, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { difficultiesColors, themeColors } from '@/src/constants/Colors'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedModal from '@/src/components/AnimatedModal'
import { useChallengesList, useUserJoinedChallenges } from '@/src/api/challenges'
import { useAuth } from '@/src/providers/AuthProvider'
import { Tables } from '@/src/database.types'
import ActiveChallengesCard_2 from '@/src/components/ActiveChallengesCard_2'
import ChallengesCard from '@/src/components/ChallengesCard'

type ChallengesType = {
  id: number;
  name: string;
  progress ?: number;
};

// const Challenges: ChallengesType[] = [
//   { id: 1, name: '1000 Minute Run Challenges', progress: 0.3 },
//   { id: 2, name: 'Full Marathon', progress: 0.8 },
//   { id: 3, name: 'Swimming With Passion', progress: 0.15 },
// ];

// const ReChallenges: ChallengesType[] = [
//   { id: 1, name: '1000 Minute Run Challenges, what if loong' },
//   { id: 2, name: 'Full Marathon' },
//   { id: 3, name: 'Swimming With Passion' },
//   { id: 4, name: '1000 Minute Run Challenges' },
//   { id: 5, name: 'Full Marathon' },
//   { id: 6, name: 'Swimming With Passion' },
// ];

const ChallengesScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  // const flatListRef = useRef<FlatList<(Tables<'user_challenge_details'> & { challenges: Tables<'challenges'> })>>(null);
  const flatListRef = useRef<FlatList<
    {
      challenge_id: number;
      created_at: string;
      damage: number;
      id: number;
      status: string;
      user_id: string;
      challenges: Tables<'challenges'> | null
  } | null >>(null);
  // const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: joinedChallenges,
    error: joinedChallengesError,
    isLoading: joinedChallengesIsLoading, 
  } = useUserJoinedChallenges(session.user.id)

  const {
    data: challengesList,
    error: challengesListError,
    isLoading: challengesListIsLoading,
  } = useChallengesList()

  if(!challengesList) {
    console.log("challenges list not found")
    return <ActivityIndicator />
  }

  console.log(joinedChallenges)
  
  const scrollToNextItem = () => {
    if (flatListRef.current) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < challengesList.length) {
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
          <View className='flex-row mt-6 justify-between'>
            <Text className='text-[32px] font-extrabold bg-white/50'>Your Challenges</Text>
            <AnimatedPressable 
              pressInValue={0.9}
              onPress={() => setModalVisible(true)}
            >
              <View className='mt-3 mr-1'>
                <FontAwesome5 name="question-circle" size={22} color="black" />
              </View>
            </AnimatedPressable>
          </View>
          
          { joinedChallenges && joinedChallenges.length > 0 &&
            <View>
              <View className='flex-row mt-2'>
                <FlatList
                  ref={flatListRef}
                  className='flex-1'
                  // data={Challenges}
                  data={joinedChallenges}
                  renderItem={({ item }) => <ActiveChallengesCard_2 challengeData={item} fullWidth={flatListWidth - 2} />} // 2 px for border
                  // keyExtractor={item => item.id.toString()}
                  keyExtractor={(item, index) => (item ? item.id.toString() : `null-item-${index}`)}
                  contentContainerStyle= {{ gap: 10 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  onLayout={handleLayout}
                  scrollEnabled={false}
                  ListEmptyComponent={() => (
                    <AnimatedPressable
                      style={{ width: flatListWidth - 2}}
                      className='bg-white/50 h-[180px] border border-slate-600/50 border rounded-xl'
                      pressInValue={0.98}
                      disabled
                    >
                      <Text className='text-center m-auto text-md text-slate-500'>No Active Challenges</Text>
                    </AnimatedPressable>
                  )}
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
                  style={ currentIndex == challengesList.length - 1 ? { opacity: 0.5 } : { opacity: 1 } }
                  className='mx-1'
                  pressInValue={0.9}
                  onPress={scrollToNextItem}
                  disabled={ currentIndex == challengesList.length - 1 }
                >
                  <View className='flex-row'>
                    <Text className='mx-2 font-medium'>Next</Text>
                    <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_right.png')} />
                  </View>
                </AnimatedPressable>
              </View>
            </View>
          }
          

          <View className='mt-8 flex-row bg-white/50'>
            <AnimatedPressable 
              pressInValue={0.95}
              onPress={() => setSelectedFilter('Weekly')}
              className={`border-2 rounded-lg p-2 mr-3 bg-white ${ selectedFilter == 'Weekly' ? 'border-emerald-500 bg-emerald-100/50' : 'border-slate-400' }`}
            >
              <View>
                <Text className='font-bold'>Weekly</Text>
              </View>
            </AnimatedPressable>
            <AnimatedPressable 
              pressInValue={0.95}
              onPress={() => setSelectedFilter('Advanced')}
              className={`border-2 rounded-lg p-2 bg-white ${ selectedFilter == 'Advanced' ? 'border-emerald-500 bg-emerald-100/50' : 'border-slate-400' }`}
            >
              <View>
                <Text className='font-bold'>Advanced</Text>
              </View>
            </AnimatedPressable>
          </View>
          <View className='flex-row justify-between mt-1'>
            <Text className='text-xl font-bold bg-white/50'>Recommended For You</Text>
            <AnimatedPressable pressInValue={0.95} onPress={() => router.push('/challenges/allChallenges')}>
              <Text style={{ color: themeColors.secondary }} className='my-auto mr-2 text-md font-semibold'>View All</Text>
            </AnimatedPressable>
          </View>
          { challengesList?.map(( challenge ) => <ChallengesCard key={challenge.id} classNameAsProps='mt-2' challengeData={challenge} />) }
          <Text className='text-center text-slate-500 font-semibold'>You had reach the end</Text>
        </SafeAreaView>
        </ScrollView>
      </ImageBackground>

      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <AnimatedModal
          classNameAsProps='flex max-h-[90%]'
          onClose={() => setModalVisible(false)}
        >
          <ImageBackground
            source={require('@asset/images/background_image.png')}
            className='p-4'
          >
            <ScrollView className='bg-white/30 px-2'>
              <View className='flex-row justify-center mb-3'>
                <Image
                  className='w-6 h-8'
                  source={require('@asset/images/attack_icon.png')}
                />
                <Text className='text-2xl text-center font-extrabold mx-2'>Challenges Details</Text>
                <Image
                  className='w-6 h-8'
                  source={require('@asset/images/attack_icon.png')}
                />
              </View>
              <Text className='text-[16px] font-medium text-justify mt-2 mb-4'>
                Greetings challenger, complete the challenges and get rewards!
              </Text>
              <Text className='font-semibold text-lg text-justify mt-2'>Difficulties Level</Text>
              {/* difficulties level */}
              <View className='px-4 py-2 bg-slate-200 rounded-lg mb-4'>
                <View className='flex-row'>
                  <View className='my-auto'>
                    <MaterialCommunityIcons name="speedometer-slow" size={32} color={difficultiesColors.beginner} />
                  </View>
                  <Text className='font-normal text-[16px] font-medium text-justify mx-4 my-auto'>Beginner Difficulties</Text>
                </View>
                <View className='flex-row'>
                  <View className='my-auto'>
                    <MaterialCommunityIcons name="speedometer-medium" size={32} color={difficultiesColors.intermediate} />
                  </View>
                  <Text className='font-normal text-[16px] font-medium text-justify mx-4 my-auto'>Intermediate Difficulties</Text>
                </View>
                <View className='flex-row'>
                  <View className='my-auto'>
                    <MaterialCommunityIcons name="speedometer" size={32} color={difficultiesColors.expert} />
                  </View>
                  <Text className='font-normal text-[16px] font-medium text-justify mx-4 my-auto'>Expert Difficulties</Text>
                </View>
              </View>

              <Text className='font-semibold text-lg text-justify mt-2'>Challenges Refresh</Text>
              <Text className='text-[16px] font-medium text-justify mb-4'>
                Every challenges ends on specific end date at <Text className='font-bold text-red-600'>4:00pm</Text>
              </Text>

              <AnimatedPressable 
                pressInValue={0.98}
                className='rounded-lg p-1'
                style={{ backgroundColor: themeColors.secondary }}
                onPress={() => setModalVisible(false)}
              >
                <View className=''>
                  <Text className='text-center font-extrabold text-white text-xl'>Okay</Text>
                </View>
              </AnimatedPressable>
            </ScrollView>
          </ImageBackground>
        </AnimatedModal>
      </Modal>
    </View>
  )
}

export default ChallengesScreen

const styles = StyleSheet.create({})