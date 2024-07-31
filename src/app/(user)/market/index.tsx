import { ImageBackground, StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Redirect, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import MarketItemsComponent from '@/src/components/MarketItems'
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { connectToWallet, createAndSendTransaction } from '@/src/utility/solana';
import { useUserData } from '@/src/api/users'
import { useAuth } from '@/src/providers/AuthProvider'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useMarketplaceItem } from '@/src/api/marketplace/index'
import { useQueryClient } from '@tanstack/react-query'


const items = [
  {id: 1, name: 'Golden Statue', itemType: 'Item', image: require('@asset/images/golden_statue.png')},
  {id: 2, name: 'Cat Statue', itemType: 'Item', image: require('@asset/images/cat_statue.png')},
  {id: 3, name: 'Chest', itemType: 'Chest', image: require('@asset/images/chest.png')},
  {id: 4, name: 'Energy Gems', itemType: 'Resources', image: require('@asset/images/energy_gems_2.png')},
  {id: 5, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},
  {id: 6, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},

  {id: 11, name: 'Golden Statue', itemType: 'Item', image: require('@asset/images/golden_statue.png')},
  {id: 12, name: 'Cat Statue', itemType: 'Item', image: require('@asset/images/cat_statue.png')},
  {id: 13, name: 'Chest', itemType: 'Chest', image: require('@asset/images/chest.png')},
  {id: 14, name: 'Energy Gems', itemType: 'Resources', image: require('@asset/images/energy_gems_2.png')},
  {id: 15, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},
  {id: 16, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},

  {id: 21, name: 'Golden Statue', itemType: 'Item', image: require('@asset/images/golden_statue.png')},
  {id: 22, name: 'Cat Statue', itemType: 'Item', image: require('@asset/images/cat_statue.png')},
  {id: 23, name: 'Chest', itemType: 'Chest', image: require('@asset/images/chest.png')},
  {id: 24, name: 'Energy Gems', itemType: 'Resources', image: require('@asset/images/energy_gems_2.png')},
  {id: 25, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},
  {id: 26, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},

  {id: 31, name: 'Golden Statue', itemType: 'Item', image: require('@asset/images/golden_statue.png')},
  {id: 32, name: 'Cat Statue', itemType: 'Item', image: require('@asset/images/cat_statue.png')},
  {id: 33, name: 'Chest', itemType: 'Chest', image: require('@asset/images/chest.png')},
  {id: 34, name: 'Energy Gems', itemType: 'Resources', image: require('@asset/images/energy_gems_2.png')},
  {id: 35, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},
  {id: 36, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},

  {id: 41, name: 'Golden Statue', itemType: 'Item', image: require('@asset/images/golden_statue.png')},
  {id: 42, name: 'Cat Statue', itemType: 'Item', image: require('@asset/images/cat_statue.png')},
  {id: 43, name: 'Chest', itemType: 'Chest', image: require('@asset/images/chest.png')},
  {id: 44, name: 'Energy Gems', itemType: 'Resources', image: require('@asset/images/energy_gems_2.png')},
  {id: 45, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},
  {id: 46, name: 'Golden Statue', itemType: 'item', image: require('@asset/images/golden_statue.png')},
]

const MarketplaceScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(0); // 0 = page 1
  const [displayedItems, setDisplayedItems] = useState(items.slice(currentPage * itemsPerPage, currentPage + 1 * itemsPerPage));
  const flatListRef = useRef<FlatList>(null)
  const [solBalance, setSolBalance] = useState(0)
  const [walletConnected, setWalletConnected] = useState(false);
  const queryClient = useQueryClient()
  
  const { data: user, error, isLoading } = useUserData(session?.user.id)

  const {
    data: marketplaceItem,
    error: marketplaceItemError,
    isLoading: marketplaceItemIsLoading,
  } = useMarketplaceItem()

  const handleConnectWallet = async () => {
    const walletConnection = await connectToWallet();

    if(walletConnection.authorizationResult) {
      setWalletConnected(true)
    }
    setSolBalance(walletConnection.balance / LAMPORTS_PER_SOL)
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  useEffect(() => {
    setDisplayedItems(items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage));
  }, [items, currentPage]);

  const FlatListFooterComponent = (
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
        style={ currentPage * itemsPerPage + itemsPerPage >= items.length ? { opacity: 0.5 } : { opacity: 1 } }
        className='flex-1'
        pressInValue={0.9}
        onPress={nextPage}
        disabled={currentPage * itemsPerPage + itemsPerPage >= items.length}
      >
        <View className='flex-row self-end mx-1'>
          <Text className='mx-2 font-medium'>Next</Text>
          <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_right.png')} />
        </View>
      </AnimatedPressable>
    </View>
  )

  const searchBarAndConnectWallet = (
    <View>
      { !walletConnected &&
        <AnimatedPressable
          pressInValue={0.95}
          className='rounded-xl bg-[#ab9ff2] p-2.5 mb-2 flex-row justify-center'
          onPress={handleConnectWallet}
        >
          <Image className='h-10 w-10 mr-1' source={require('@asset/images/Phantom_SVG_Icon.png')} />
          <Text className='text-lg text-center my-auto text-[#fffdf8] font-bold'>Connect To Phantom Wallet</Text>
        </AnimatedPressable>
      }
      <View className='flex-row my-2'>
        <TextInput
          className='border border-slate-400 p-2 rounded-lg bg-white flex-1 mr-2'
          placeholder='Search by name'
        />
        <AnimatedPressable
          className='border border-slate-400 rounded-lg bg-white'
          pressInValue={0.9}
          onPress={() => {}}
        >
          <View className='my-auto mx-3'>
            <FontAwesome6 name="magnifying-glass" size={20} color="black" />
          </View>
        </AnimatedPressable>
      </View>
    </View>
  )

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require('@asset/images/background_image.png')}
        className='flex-1'
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Market</Text>
          <AnimatedPressable 
            pressInValue={0.9}
            className='z-10 absolute right-3 top-2.5'
            onPress={() => {queryClient.invalidateQueries({ queryKey: ['marketplace_item'] })}}
          >
            <View className='my-auto'>
              <FontAwesome name='refresh' size={27} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>

        <View className='flex-1 p-2'>
          {/* Virtual currency and Sol */}
          <View className='flex-row mb-3 bg-white/50'>
            <View className='border border-slate-300 h-7 rounded-xl mt-2 mx-2 flex-1 flex-row justify-between bg-white shadow shadow-slate-400'>
              <Image 
                className='w-5 mx-2 my-auto aspect-square'
                source={require('@asset/images/coin_icon.png')} 
              />
              <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>{user?.coin}</Text>
            </View>
            <View className='border border-slate-300 h-7 rounded-xl mt-2 mx-2 flex-1 flex-row justify-between bg-white shadow shadow-slate-400'>
              <Image 
                className='w-5 mx-2 my-auto aspect-square'
                source={require('@asset/images/diamond_icon.png')} 
              />
              <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>{user?.diamond}</Text>
            </View>
            <View className='border border-slate-300 h-7 rounded-xl mt-2 mx-2 flex-1 flex-row justify-between bg-white shadow shadow-slate-400'>
              <Image 
                className='w-5 mx-2 my-auto aspect-square'
                source={require('@asset/images/sol_icon_2.png')} 
              />
              <Text style={{ color: themeColors.primary }} className='text-right mx-2 my-auto'>{walletConnected ? solBalance.toFixed(4) : '-'}</Text>
            </View>
          </View>

          <FlatList
            className='mx-2'
            ref={flatListRef}
            data={marketplaceItem}
            renderItem={({ item }) => <MarketItemsComponent item={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 3 }}
            ListHeaderComponent={searchBarAndConnectWallet}
            ListFooterComponent={FlatListFooterComponent}
            removeClippedSubviews={false}
          />
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default MarketplaceScreen

const styles = StyleSheet.create({})