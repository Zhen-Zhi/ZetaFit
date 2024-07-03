import { ImageBackground, StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router } from 'expo-router'
import * as Progress from 'react-native-progress';
import { Badge } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'

type inventoryItemProps = {
  id: number;
  itemName: string;
  image: any;
}

type EnergyGemsComponentProps = {
  item: inventoryItemProps;
}

const inventoryItems: inventoryItemProps[] = [
  { id: 1, itemName: 'Lv 1 Energy Gem', image: require('@asset/images/energy_gems.png') },
  { id: 2, itemName: 'Lv 2 Energy Gem', image: require('@asset/images/energy_gems_2.png') },
  { id: 3, itemName: 'Lv 3 Energy Gem', image: require('@asset/images/energy_gems_3.png') },
]

const PetsUpgradeScreen = () => {
  const ITEMSIZE = Dimensions.get('window').width / 3 - 12;
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const star = [];
  for (let i = 0; i < 4; i++) {
    star.push(
      <View key={i} className='mx-0.5'>
        <FontAwesome6 name="diamond" size={20} color={themeColors.tetiary} />
      </View>
    );
  }

  const EnergyGemsComponent= ({ item }: EnergyGemsComponentProps) => {
    const [selectedValue, setSelectedValue] = useState(0);
    const intervalRef = useRef<number | null>(null)

    const startIncrementing = () => {
      intervalRef.current = window.setInterval(() => {
        // use updater function to prevent value not updated in multiple setter function call
        setSelectedValue(prevSelectedValue => prevSelectedValue + 1); 
      }, 100);
    };

    const stopIncrementing = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    return (
      <AnimatedPressable 
        pressInValue={0.97} 
        className='m-1'
        onPress={() => setSelectedValue(selectedValue + 1)}
        onPressOut={stopIncrementing}
        onLongPress={startIncrementing}
      >
        <Image
          style={{ height: ITEMSIZE, width: ITEMSIZE }}
          source={item.image}
          />
        <Text className='text-center font-medium mt-1'>{item.itemName}</Text>
        <Badge
          value={1}
          textStyle={{ fontSize: 16, fontWeight: 700 }}
          badgeStyle={{ height: 24, width: ITEMSIZE * 0.6, borderRadius: 20, marginTop: 6, backgroundColor: themeColors.tetiary }} 
          status="primary"
          />
        <Badge
          value={selectedValue}
          textStyle={{ fontSize: 16, fontWeight: 700, color: themeColors.primary }}
          containerStyle={{ position: 'absolute', top: -12, right: -20 }} 
          badgeStyle={{ height: selectedValue == 0 ? 0 : 24, width: ITEMSIZE * 0.6, borderRadius: 20, marginTop: 6, backgroundColor: 'transparent' }} 
          status="primary"
        />
      </AnimatedPressable>
    )
  }
  
  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require('@asset/images/background_image.png')}
        className='flex-1'
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Upgrade Pets</Text>
          <AnimatedPressable 
            pressInValue={0.9}
            className='z-10 absolute left-3 top-2.5'
            onPress={() => router.back()}
          >
            <View className='my-auto'>
              <FontAwesome5 name='arrow-left' size={27} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>

        <View>
          <Image
            className='w-56 h-56 mx-auto'
            source={require('@asset/images/pets/turtle.png')} 
          />

          <View className='mx-auto mt-2 flex-row'>
            {star}
          </View>

          <View className='flex-row mx-3 bg-white/50'>
            <View className='w-auto my-auto'>
              <Text className='text-lg text-center font-semibold'>LV 100</Text>
            </View>
            <View className='mt-4'>
              <Progress.Bar 
                className='ml-4'
                progress={0.2}
                height={12}
                width={Dimensions.get('window').width * 0.65}
                color={themeColors.tetiary}
                unfilledColor={themeColors.secondary}
                borderWidth={2}
                borderColor={themeColors.primary}
                borderRadius={4}
              />
              <Text className='ml-4 font-medium mt-0.5'>100/900</Text>
            </View>
          </View>
          <View className='m-auto'>
            <FontAwesome5 name="arrow-down" size={30} color={themeColors.primary} />
          </View>

          {/* preview */}
          <View className='flex-row mx-3 bg-white/50'>
            <View className='w-auto my-auto'>
              <Text className='text-lg text-center font-semibold'>LV 100</Text>
            </View>
            <View className='mt-4'>
              <Progress.Bar 
                className='ml-4'
                progress={0.2}
                height={12}
                width={Dimensions.get('window').width * 0.65}
                color={'#ebe70c'}
                unfilledColor={themeColors.secondary}
                borderWidth={2}
                borderColor={themeColors.primary}
                borderRadius={4}
              />
              <Text className='ml-4 font-medium mt-0.5'>100/900</Text>
            </View>
          </View>
        </View>

        <Animated.FlatList
          className='bg-white/30 p-2'
          data={inventoryItems}
          renderItem={({ item }) => 
            <EnergyGemsComponent item={item} />
          }
          horizontal
        />

        <LinearGradient
          className='h-24 w-full z-10 absolute bottom-0 justify-end'
          colors={['#ffffff00', '#ffffff']}
          start={{ x: 0, y: 0 }}  // Gradient starts at the top
          end={{ x: 0, y: 1 }}  // Gradient ends at the bottom
        >
          <AnimatedPressable
            style={{ backgroundColor: themeColors.secondary }}
            className='mx-3 mb-2 rounded-lg p-1.5'
            pressInValue={0.98}
          >
            <Text className='text-center text-lg text-white font-bold'>Upgrade</Text>
          </AnimatedPressable>
        </LinearGradient>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default PetsUpgradeScreen

const styles = StyleSheet.create({})