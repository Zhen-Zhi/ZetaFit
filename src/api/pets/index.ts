import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"
import { Tables } from "@/src/database.types"
import { InsertTables, UpdateTables } from "@/src/types"


export const usePetAttackChallenge = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (attackDetails: InsertTables<'user_challenge_details'>) => {
        const { data: newClan, error } = await supabase
          .from('user_challenge_details')
          .insert({ ...attackDetails })
          .select()
          .single()

        if (error) {
          console.log("Insert Attack fail: " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newClan
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['user_challenge_details'] })
        await queryClient.invalidateQueries({ queryKey: ['user_joined_challenges'] })
      }
    })
  )
}

export const usePetClanWarAction = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (attackDetails: InsertTables<'clan_war_details'>) => {
        const { data: newClan, error } = await supabase
          .from('clan_war_details')
          .insert({ ...attackDetails })
          .select()
          .single()

        if (error) {
          console.log("Clan War Attack fail: " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newClan
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['user_challenge_details'] })
        await queryClient.invalidateQueries({ queryKey: ['user_joined_challenges'] })
      }
    })
  )
}