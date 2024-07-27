import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"
import { Tables } from "@/src/database.types"
import { InsertTables, UpdateTables } from "@/src/types"

export const useInventoryItems = (userId: string) => {
  return (
    useQuery({
      queryKey: ['inventory_items', userId],
      queryFn: async () => {
        const { data: inventoryItems, error } = await supabase
          .from('inventory')
          .select('*')
          .eq('user_id', userId)
          .eq('type', 'item')

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return inventoryItems
      }
    })
  )
}

export const useInventoryChest = (userId: string) => {
  return (
    useQuery({
      queryKey: ['inventory_chest', userId],
      queryFn: async () => {
        const { data: inventoryChest, error } = await supabase
          .from('inventory')
          .select('*')
          .eq('user_id', userId)
          .eq('type', 'chest')

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return inventoryChest
      }
    })
  )
}

export const useSellItemToMarketplace = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (itemDetails: InsertTables<'marketplace'>) => {
        const { data: sellingDetails, error } = await supabase
          .from('marketplace')
          .insert({ ...itemDetails })
          .select()
          .single()

        if (error) {
          console.log("Selling item to marketplace fail: " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return sellingDetails
      },
      async onSuccess() {
        // await queryClient.invalidateQueries({ queryKey: ['user_challenge_details'] })
        // await queryClient.invalidateQueries({ queryKey: ['user_joined_challenges'] })
      }
    })
  )
}