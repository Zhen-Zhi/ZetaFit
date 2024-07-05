import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"

// select user data
export const useUserData = (id: string) => {
  return (
    useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return data
      }
    })
  )
}

// fill in or modify username
export const useUpdateUsername = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: username, error } = await supabase
        .from('users')
        .update({
          username: data.username,
        })
        .eq('id', data.userId)

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return username
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    })
  )
}

export const useUpdateUserCoin = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: username, error } = await supabase
        .from('users')
        .update({
          coin: data.newUserCoin,
        })
        .eq('id', data.userId)
      
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return username
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    })
  )
}
