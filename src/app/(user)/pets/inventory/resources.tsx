import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, Animated, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Stack, router } from 'expo-router'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedModal from '@/src/components/AnimatedModal'
import InventoryActionScreenModal from '../modal/inventoryAction'
import { Badge } from 'react-native-elements'

const inventoryItems = [
  { id: 1, itemName: 'Lv 1 Energy Gem', image: require('@asset/images/energy_gems.png') },
  { id: 2, itemName: 'Lv 2 Energy Gem', image: require('@asset/images/energy_gems_2.png') },
  { id: 3, itemName: 'Lv 3 Energy Gem', image: require('@asset/images/energy_gems_3.png') },
]

const InventoryResourcesScreen = () => {
  const [inventoryActionModalVisible, setInventoryActionModalVisible] = useState(false)
  const ITEMSIZE = Dimensions.get('window').width / 2 - 16;

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Resources</Text>
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
        className='bg-white/30 p-2 mb-4'
        data={inventoryItems}
        renderItem={({ item }) => 
          <AnimatedPressable 
            pressInValue={0.97} 
            className='m-1 mt-2.5'
          >
            <Image
              style={{ height: ITEMSIZE, width: ITEMSIZE }}
              className=''
              source={item.image}
            />
            <Text className='text-center font-medium mt-1'>{item.itemName}</Text>
            <Badge
              value={1}
              textStyle={{ fontSize: 16, fontWeight: 700 }}
              badgeStyle={{ height: 24, width: ITEMSIZE * 0.6, borderRadius: 20, marginTop: 6, backgroundColor: themeColors.tetiary }} 
              status="primary"
            />
          </AnimatedPressable>
        }
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
      />


      {/* absolute button for inventory */}
      <AnimatedPressable
        style={{ backgroundColor: themeColors.tetiary }}
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
            currentRoute='resources'
          />
        </AnimatedModal>
      </Modal>
    </SafeAreaView>
  )
}

export default InventoryResourcesScreen

const styles = StyleSheet.create({})