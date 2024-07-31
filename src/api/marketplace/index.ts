import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"
import { Tables } from "@/src/database.types"
import { InsertTables, UpdateTables } from "@/src/types"


export const useMarketplaceItem = () => {
  return (
    useQuery({
      queryKey: ['marketplace_item'],
      queryFn: async () => {
        const { data: marketplaceItem, error } = await supabase
          .from('marketplace')
          .select('*, inventory(*)')
          .eq('status', 'listed')

        if (error) {
          console.log("Get marketplace item error.  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return marketplaceItem
      }
    })
  )
}


export const useInsertTransaction = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (transactionDetails: InsertTables<'transaction'>) => {
        const { data: newTransaction, error } = await supabase
          .from('transaction')
          .insert({ ...transactionDetails })
          .select()
          .single()

        if (error) {
          console.log("Insert transaction fail: " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return transactionDetails
      },
      async onSuccess() {
        // await queryClient.invalidateQueries({ queryKey: ['user_challenge_details'] })
        // await queryClient.invalidateQueries({ queryKey: ['user_joined_challenges'] })
      }
    })
  )
}

export const useUpdateItemOwnership = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
          updateDetails,
          inventoryId
        } : {
          updateDetails: UpdateTables<'inventory'>,
          inventoryId: number
        }) => {
        const { data: newClan, error } = await supabase
          .from('inventory')
          .update({ ...updateDetails })
          .eq('id', inventoryId)
          .select()
          .single()

        if (error) {
          console.log("Update new ownership fail: " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newClan
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['inventory_items'] })
      }
    })
  )
}

export const useUpdateMarketplaceItem = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (marketplaceId: number) => {
        const { error } = await supabase
          .from('marketplace')
          .update({ status: 'sold' })
          .eq('id', marketplaceId)

        if (error) {
          console.log("Marketplace item update fail: " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['marketplace_item'] })
      }
    })
  )
}