import { ImageBackground, Pressable, StyleSheet, Text, View, Image, ScrollView, Dimensions, Modal, FlatList, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Entypo, FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import PetDetailsScreen from './petDetails';
import AnimatedModal from '@/src/components/AnimatedModal'

const petsData = [
  { id: 1, petsName: 'Turtle', level: '28', image: require('@asset/images/pets/turtle.png') },
  { id: 2, petsName: 'Parrot', level: '15', image: require('@asset/images/pets/dog.png') },
  { id: 3, petsName: 'Cat', level: '22', image: require('@asset/images/pets/dragon.png') },
  { id: 4, petsName: 'Dog', level: '30', image: require('@asset/images/pets/golem.png') },
  { id: 5, petsName: 'Fish', level: '5', image: require('@asset/images/pets/wolve.png') },
  { id: 6, petsName: 'Rabbit', level: '12', image: require('@asset/images/pets/unicorn.png') },
  { id: 7, petsName: 'Hamster', level: '18', image: require('@asset/images/pets/polar_bear.png') },
  { id: 8, petsName: 'Lizard', level: '20', image: require('@asset/images/pets/turtle.png') },
  { id: 9, petsName: 'Snake', level: '25', image: require('@asset/images/pets/dragon.png') },
  { id: 10, petsName: 'Frog', level: '8', image: require('@asset/images/pets/golem.png') },
  { id: 11, petsName: 'Hedgehog', level: '11', image: require('@asset/images/pets/wolve.png') },
  { id: 12, petsName: 'Guinea Pig', level: '14', image: require('@asset/images/pets/unicorn.png') },
  { id: 13, petsName: 'Chinchilla', level: '19', image: require('@asset/images/pets/polar_bear.png') },
  { id: 14, petsName: 'Gerbil', level: '17', image: require('@asset/images/pets/turtle.png') },
  { id: 15, petsName: 'Pig', level: '27', image: require('@asset/images/pets/dog.png') },
  { id: 16, petsName: 'Frog', level: '8', image: require('@asset/images/pets/golem.png') },
  { id: 17, petsName: 'Hedgehog', level: '11', image: require('@asset/images/pets/wolve.png') },
  // { id: 18, petsName: 'Guinea Pig', level: '14', image: require('@asset/images/pets/unicorn.png') },
  // { id: 19, petsName: 'Chinchilla', level: '19', image: require('@asset/images/pets/polar_bear.png') },
  // { id: 20, petsName: 'Gerbil', level: '17', image: require('@asset/images/pets/turtle.png') },
  // { id: 21, petsName: 'Pig', level: '27', image: require('@asset/images/pets/dog.png') },
  // { id: 22, petsName: 'Frog', level: '8', image: require('@asset/images/pets/golem.png') },
  // { id: 23, petsName: 'Hedgehog', level: '11', image: require('@asset/images/pets/wolve.png') },
  // { id: 24, petsName: 'Guinea Pig', level: '14', image: require('@asset/images/pets/unicorn.png') },
  // { id: 25, petsName: 'Chinchilla', level: '19', image: require('@asset/images/pets/polar_bear.png') },
  // { id: 26, petsName: 'Gerbil', level: '17', image: require('@asset/images/pets/turtle.png') },
  // { id: 27, petsName: 'Pig', level: '27', image: require('@asset/images/pets/dog.png') },
  // { id: 216, petsName: 'Frog', level: '8', image: require('@asset/images/pets/golem.png') },
  // { id: 127, petsName: 'Hedgehog', level: '11', image: require('@asset/images/pets/wolve.png') },
  // { id: 182, petsName: 'Guinea Pig', level: '14', image: require('@asset/images/pets/unicorn.png') },
  // { id: 29, petsName: 'Chinchilla', level: '19', image: require('@asset/images/pets/polar_bear.png') },
  // { id: 30, petsName: 'Gerbil', level: '17', image: require('@asset/images/pets/turtle.png') },
  // { id: 31, petsName: 'Pig', level: '27', image: require('@asset/images/pets/dog.png') },
];


const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [petActionModalVisible, setPetActionModalVisible] = useState(false);
  const ITEMSIZE = Dimensions.get('window').width / 2 - 16;

  const scrollY = useRef(new Animated.Value(0)).current;
  const opacity = scrollY.interpolate({
    inputRange: [ITEMSIZE * Math.ceil(petsData.length / 2) - ITEMSIZE, ITEMSIZE * Math.ceil(petsData.length / 2)],
    outputRange: [0.5, 1],
    extrapolate: 'clamp'
  })

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
        className='my-4 border-slate-300 border-y-2 p-2 flex-row justify-between'
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

        <Animated.FlatList
          className='bg-white/30'
          data={petsData}
          renderItem={({ item }) => 
            <AnimatedPressable
              // style={{ height: 100 }}
              className='m-1'
              pressInValue={0.98}
              onLongPress={() => setModalVisible(true)}
              delayLongPress={300}
              onPress={() => setPetActionModalVisible(true)}
            >
              <Image
                style={{ width: ITEMSIZE, height: ITEMSIZE }}
                source={item.image}
                resizeMode='contain'
              />
              <View className='flex-col mx-auto'>
                <Text className='font-semibold text-xl text-center'>{item.petsName}</Text>
                <Text className='font-medium text-center'>LV {item.level}</Text>
              </View>  
            </AnimatedPressable>
          }
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          ListHeaderComponent={onBattlePets}
          ListFooterComponent={
            <Text className='mb-20 text-center text-slate-400 font-semibold'>You had reach the end</Text>
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY }}}],
            { useNativeDriver: true }
          )}
          // onLayout={event => {
          //   const { height } = event.nativeEvent.layout;
          //   setFlatListHeight(height);
          //   console.log("FlatList Height:", height);  // Optional: for debugging
          // }}
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
                <Text style={{ color: themeColors.secondary }} className='font-bold text-lg text-center'>View Details</Text>
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

        {/* absolute button for inventory */}
        <AnimatedPressable
          style={{ backgroundColor: themeColors.tetiary, opacity }}
          className='rounded-full p-3.5 absolute bottom-3 right-5 opacity-50'
          pressInValue={0.93}
          onPress={() => router.replace('/profile/inventory')}
        >
          <Image
            className='w-10 h-10'
            source={require('@asset/images/inventory.png')}
          />
        </AnimatedPressable>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})