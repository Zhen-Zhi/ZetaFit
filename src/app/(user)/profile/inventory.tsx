import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, Animated } from 'react-native'
import React, { useRef } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Stack, router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const inventoryItems = [
  { id: 1, itemName: 'Classy Cat Statue', image: require('@asset/images/cat_statue.png') },
  { id: 2, itemName: 'Golden Hero', image: require('@asset/images/golden_statue.png') },
  { id: 3, itemName: 'Cyberpunk Ape', image: require('@asset/images/cyberpunk_ape.png') },
  { id: 4, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 5, itemName: 'Chest', image: require('@asset/images/chest.png') },
  { id: 6, itemName: 'Chest', image: require('@asset/images/chest.png') },
]

const InventoryScreen = () => {
  const ITEMSIZE = Dimensions.get('window').width / 2 - 16;
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Inventory</Text>
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



      <View 
        className='my-4 border-slate-300 border-y-2 p-2 flex-row justify-between'
        style={{ backgroundColor: themeColors.backgroundColor }}
      >
        <Text
          className='text-2xl font-extrabold ml-4'
          style={{ color: themeColors.primary }}
        >
          Inventory Items
        </Text>
      </View>



      <View 
        className='my-4 border-slate-300 border-y-2 p-2 flex-row justify-between'
        style={{ backgroundColor: themeColors.backgroundColor }}
      >
        <Text
          className='text-2xl font-extrabold ml-4'
          style={{ color: themeColors.primary }}
        >
          Inventory Items
        </Text>
      </View>

      <Animated.FlatList
        className='bg-white/30'
        data={inventoryItems}
        renderItem={({ item }) => 
          <View className='m-1'>
            <Image
              style={{ height: ITEMSIZE, width: ITEMSIZE }}
              source={item.image}
            />
            <Text className='text-center font-medium'>{item.itemName}</Text>
          </View>
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
        style={{ backgroundColor: themeColors.tetiary }}
        className='rounded-full p-3.5 absolute bottom-3 right-5'
        pressInValue={0.93}
        onPress={() => router.replace('/profile')}
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

export default InventoryScreen

const styles = StyleSheet.create({})