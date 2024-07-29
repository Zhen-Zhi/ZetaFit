import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedPressable from './AnimatedPressable'
import { Tables } from '../database.types'
import RemoteImage from './RemoteImage'
import { useInsertTransaction, useUpdateItemOwnership, useUpdateMarketplaceItem } from '../api/marketplace'
import { createAndSendTransaction } from '../utility/solana'
import { useAuth } from '../providers/AuthProvider'
import { Redirect } from 'expo-router'
import { getItem } from 'expo-secure-store'

// type itemType = {
//   id: number;
//   name: string;
//   itemType: string;
//   image: any;
// }

type MarketItemsComponentProps = {
  item: Tables<'marketplace'> & { inventory: Tables<'inventory'> };
}

const MarketItemsComponent = ({ item }: MarketItemsComponentProps) => {
  const { session } = useAuth()

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { mutate: insertTransaction } = useInsertTransaction()
  const { mutate: updateItemOwnership } = useUpdateItemOwnership()
  const { mutate: updateListing } = useUpdateMarketplaceItem()

  const handleBuy = async () => {
    const txSignature = await createAndSendTransaction(item.wallet_address, item.selling_price)
    
    if(!txSignature) {
      console.log("transaction fail")
    }

    const marketplaceId = item.id
    const userId = session.user.id

    insertTransaction(
      {  
        marketplace_id: marketplaceId, 
        user_id: userId,
        transaction_id: txSignature,
      }, 
      {
        onSuccess() {
          updateItemOwnership(
            {
              inventoryId: (item.inventory.id),
              updateDetails: {
                user_id: userId
              }
            }
          )
          updateListing(marketplaceId)
        }
      }
    )
  }

  return (
    <View>
      <AnimatedPressable
        pressInValue={0.97}
        className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
        onPress={handleBuy}
      >
        <View className='flex-row'>
          {/* <Image 
            source={item.inventory.image}
            className='aspect-square w-14 h-14 rounded-xl'
          /> */}
          <RemoteImage
            classNameAsProps='aspect-square w-14 h-14 rounded-xl'
            path={item.inventory.image} 
            fallback={require('@asset/images/default.png')}
            bucket='items'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>{item.inventory.name}</Text>
              <Text className='font-semibold text-slate-600'>{item.inventory.type}</Text>
            </View>
            <View className='flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2'>
              <Image
                className='w-6 h-6 my-auto'
                source={require('@asset/images/sol_icon_2.png')}
              />
              <Text className='text-center text-lg rounded font-semibold ml-2'>{item.selling_price.toFixed(4)}</Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </View>
  )
}

export default MarketItemsComponent

const styles = StyleSheet.create({})