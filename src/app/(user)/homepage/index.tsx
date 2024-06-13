import { StyleSheet, Text, View, Image, ImageBackground, Modal, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import ActiveChallengesCard from '@/src/components/ActiveChallengesCard';
import MoreOptionsModal from './optionListModal';
import { useNavigation } from 'expo-router';
import { themeColors } from '@/src/constants/Colors';

const ListOptions = [{name: 'Profile'},{name: 'Setting'},{name: 'Activities'}] 

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // define a event listerner to set modal visible false
  // come back from profile via back will not set to false without this
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView edges={['top']} className='flex-1 bg-slate-100 pt-2'>
      <ImageBackground
        className='flex-1' 
        source={require('@asset/images/background_image.png')}
      >
      {/* Top Part, Avatar, Level Bar, Username, Virtual Currency */}
      <View className='flex flex-row justify-between'>

        {/* Avartar Image, Level Bar, Username */}
        <AnimatedPressable pressInValue={0.98} className='flex flex-row w-3/5'>

          {/* Avatar Image */}
          <AnimatedPressable className='border rounded-lg m-2' pressInValue={0.93}>
            <View className='bg-transparent'> 
              <Image
                className='h-16 w-16 aspect-square border'
                source={require('@asset/images/CyberKongz.jpg')}  
              />
            </View>
          </AnimatedPressable>
          
          {/* Level Bar and Username*/}
          <ImageBackground
            source={require('@asset/images/star.png')}
            className='absolute z-10 w-12 aspect-square top-[-7px] left-[67px] ml-3'
          >
            <Text className='absolute z-10 text-lg ml-2 mt-3 w-8 text-center text-black font-extrabold'>1</Text>
          </ImageBackground>
          <View className='flex flex-col mt-2'>
            <Progress.Bar className='h-7 justify-center left-[12px]'
              progress={0.5}
              width={140}
              height={28}
              color='rgba(0,109,255,1)'
              unfilledColor='rgba(143,148,155,1)'
              borderWidth={2}
              borderRadius={10}
            >
              <Text className='absolute text-white font-extrabold self-center'>50/100</Text>
            </Progress.Bar>
            <Text style={{ color: themeColors.primary }} className='text-lg font-bold'>Username</Text>
          </View>
        </AnimatedPressable>

        {/* Virtual Currency */}
        <View className='flex flex-col w-2/5'>
          <View style={styles.shadowAndriod} className='border border-slate-300 h-7 rounded-xl mt-2 mx-2 flex flex-row justify-between bg-white shadow shadow-slate-400'>
            <Image 
              className='w-5 mx-4 my-auto aspect-square'
              source={require('@asset/images/coin_icon.png')} 
            />
            <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>9999</Text>
          </View>
          <View style={styles.shadowAndriod} className='border border-slate-300 mt-1 h-7 rounded-xl mx-2 flex flex-row justify-between bg-white shadow shadow-slate-400'>
            <Image 
              className='w-5 mx-4 my-auto aspect-square'
              source={require('@asset/images/diamond_icon.png')} 
            />
            <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>9999</Text>
          </View>
        </View>
      </View>

      {/* Clan Name and More setting */}
      <View className='flex flex-row mx-2 h-12'>

        {/* Clan */}
        <AnimatedPressable
          style={[styles.image, styles.shadowAndriod]} 
          className='bg-white border border-slate-400 flex-1 flex-row mr-2 mt-1.5 rounded-lg shadow shadow-slate-400'
          pressInValue={0.97}
          >
          <Image
            className='w-10 h-14 mx-2'
            source={require('@asset/images/logo_clan.png')} 
          />
          <Text style={{ color: themeColors.primary }} className='text-center font-extrabold text-lg p-1'>Clan Name</Text>
        </AnimatedPressable>
        
        {/* More functions list */}
        <AnimatedPressable
          style={styles.shadowAndriod}
          onPress={() => setModalVisible(true)}
          className='bg-white border border-slate-400 rounded-lg shadow shadow-slate-400 mt-1.5'
          pressInValue={0.9}
        >
          <View className='mx-3 my-auto'>
            <Ionicons name="list" size={22} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        
      </View>

      {/* Function list options*/}
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <MoreOptionsModal onClose={() => setModalVisible(false)} />
      </Modal>
      
      {/* middle image - main */}
      <View className='mx-auto mt-12 mb-6'>
        <AnimatedPressable pressInValue={0.95}>
          <Image
            className='w-56 h-56 mx-auto'
            source={require('@asset/images/pets/turtle.png')} 
            />
        </AnimatedPressable>
        <View className='flex-row justify-between mt-2'>
          <View className='flex-row flex-1'>
            <View className='my-auto'>
              <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
            </View>
            <Text style={{ color: themeColors.primary }} className='bg-slate-200 rounded-lg px-2 text-lg text-center font-semibold flex-1 mx-2'>9999</Text>
          </View>
          <View className='flex-row flex-1'>
            <View className='my-auto'>
              <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
            </View>
            <Text style={{ color: themeColors.primary }} className='bg-slate-200 rounded-lg px-2 text-lg text-center font-semibold flex-1 mx-2'>20</Text>
          </View>
        </View>
        <AnimatedPressable
          style={{ backgroundColor: themeColors.secondary }}
          className='m-1 h-[40px] w-[240px] bg-slate-200 p-1 rounded-lg justify-center mt-1 flex-row'
          pressInValue={0.98}
        >
          <Text style={{ color: themeColors.backgroundColor }} className='text-center font-extrabold text-lg'>Add Activity</Text>
        </AnimatedPressable>
      </View>

      {/* Active challenges part */}
      <View className='m-3 absolute bottom-0'>
        <Text style={{ color: themeColors.primary }} className='font-extrabold text-xl'>Active Challenges</Text>
        <FlatList
          data={ListOptions}
          renderItem={() => (
            <ActiveChallengesCard />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      </ImageBackground>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    alignItems: 'center', // Centers horizontally
  },
  shadowAndriod: {
    elevation: 15
  }
})