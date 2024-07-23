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

export const useUserActivities = (userId: String) => {
  return (
    useQuery({
      queryKey: ['user_activities'],
      queryFn: async () => {
        const { data: userActivities, error } = await supabase
          .from('user_activities')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
        
        if (error) {
          console.log("Error in activity types:  " + error.code + ":" + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return userActivities
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

export const useDeleteActivity = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
          activityId, userId, activity
        } : {
          activityId: number,
          userId: string,
          activity: UpdateTables<'user_activities'>
        }) => {
        const { data: deletedActivity, error } = await supabase
          .from('user_activities')
          .delete()
          .eq('id', activityId)
          .select('*')
          .single()

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return deletedActivity
      },
      async onSuccess(_, { userId }) {
        await queryClient.invalidateQueries({ queryKey: ['user_activities', userId] })
      }
    })
  )
}