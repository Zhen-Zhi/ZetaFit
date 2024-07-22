import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"
import { Tables } from "@/src/database.types"
import { InsertTables, UpdateTables } from "@/src/types"

export const useActivityTypes = () => {
  return (
    useQuery({
      queryKey: ['activity_types'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('activity_type')
          .select('*')
        
        if (error) {
          console.log("Error in activity types:  " + error.code + ":" + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return data
      }
    })
  )
}

export const useInsertActivity = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (newActivity: InsertTables<'user_activities'>) => {
        const { data: newClan, error } = await supabase
          .from('user_activities')
          .insert({ ...newActivity })
          .select()
          .single()

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newClan
      },
      async onSuccess(_, { user_id }) {
        await queryClient.invalidateQueries({ queryKey: ['user_activities', user_id] })
      }
    })
  )
}