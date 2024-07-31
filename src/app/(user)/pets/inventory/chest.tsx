import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, Animated, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Redirect, Stack, router } from 'expo-router'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedModal from '@/src/components/AnimatedModal'
import InventoryActionScreenModal from '../modal/inventoryAction'
import { useInventoryChest } from '@/src/api/pets/inventory'
import { useAuth } from '@/src/providers/AuthProvider'
import RemoteImage from '@/src/components/RemoteImage'

const inventoryItems = [
  { id: 1, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 2, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 3, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 4, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 5, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 6, itemName: 'Chest', image: require('@asset/images/chest.png') },

  { id: 11, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 12, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 13, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 14, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 15, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 16, itemName: 'Chest', image: require('@asset/images/chest.png') },
]

const InventoryChestScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }
  const [inventoryActionModalVisible, setInventoryActionModalVisible] = useState(false)
  const [openChestModalVisible, setOpenChestModalVisible] = useState(false);
  const ITEMSIZE = Dimensions.get('window').width / 2 - 24;
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    data: inventoryItems,
    error: inventoryItemsError,
    isLoading: inventoryItemsIsLoading,
  } = useInventoryChest(session.user.id)

  const num = (ITEMSIZE + 8 + 20) * Math.floor(inventoryItems?.length ?? 0 / 2) - (ITEMSIZE + 8 + 20) * 3
  // itemsize (image height) + 8px margin + 20px text line height
  // minus top 3 row

  const opacity = scrollY.interpolate({
    inputRange: [num - 50, num], 
    outputRange: [0.5, 1],
    extrapolate: 'clamp'
  })

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Chest</Text>
        <AnimatedPressable 
          pressInValue={0.9}
          className='z-10 absolute left-3 top-2.5'
          onPress={() => router.back()}
        >
          <View className='my-auto'>
            <FontAwesome5 name='arrow-left' size={26} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
      </View>

      <Animated.FlatList
        className='bg-white/30 p-2'
        data={inventoryItems}
        renderItem={({ item }) => 
          <AnimatedPressable 
            pressInValue={0.9} 
            className='m-1'
            onPress={() => setOpenChestModalVisible(true)}
          >
            {/* <Image
              style={{ height: ITEMSIZE, width: ITEMSIZE }}
              source={item.image}
            /> */}
            <RemoteImage
              style={{ height: ITEMSIZE, width: ITEMSIZE }}
              path={item.image} 
              fallback={require('@asset/images/default.png')}
              bucket='items'
            />
            <Text className='text-center text-sm font-medium'>{item.name}</Text>
          </AnimatedPressable>
        }
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        // ListHeaderComponent={onBattlePets}
        ListFooterComponent={
          <Text className='mt-4 mb-20 text-center text-slate-400 font-semibold'>You had reach the end</Text>
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY }}}],
          { useNativeDriver: true }
        )}
      />


      {/* absolute button for inventory */}
      <AnimatedPressable
        style={{ backgroundColor: themeColors.tetiary, opacity }}
        className='rounded-full p-3.5 absolute bottom-3 right-5'
        pressInValue={0.93}
        onPress={() => setInventoryActionModalVisible(true)}
      >
        <Image
          className='w-10 h-10'
          source={require('@asset/images/inventory.png')}
        />
      </AnimatedPressable>
      </ImageBackground>

      <Modal
        animationType='fade'
        visible={inventoryActionModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setInventoryActionModalVisible(false)}
      >
        <AnimatedModal onClose={() => setInventoryActionModalVisible(false)}>
          <InventoryActionScreenModal 
            onClose={() => setInventoryActionModalVisible(false)} 
            currentRoute='chest'
          />
        </AnimatedModal>
      </Modal>

      <Modal
        animationType='fade'
        visible={openChestModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setOpenChestModalVisible(false)}
      >
        <AnimatedModal onClose={() => setOpenChestModalVisible(false)}>
          <ImageBackground
            source={require('@asset/images/background_image.png')}
            className='p-4'
          >
            <Image
              className='w-32 h-32 self-center'
              source={require('@asset/images/chest.png')}
            />
            <Text className='font-semibold text-center'>Chest Legendary</Text>
            <AnimatedPressable
              pressInValue={0.95}
              className='p-2 rounded-lg border border-slate-400 bg-white mt-8'
            >
              <Text className='font-bold text-lg text-center'>Open Chest</Text>
            </AnimatedPressable>
          </ImageBackground>
        </AnimatedModal>
      </Modal>
    </SafeAreaView>
  )
}

export default InventoryChestScreen

const styles = StyleSheet.create({})