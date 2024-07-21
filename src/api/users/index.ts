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

export const useUserClanMemberData = (clanMemberId: number, userId: string) => {
  return (
    useQuery({
      queryKey: ['user_clan_member_data', userId],
      queryFn: async () => {
        const { data: clanMembers, error } = await supabase
          .from('clan_members')
          .select('*, users(*)')
          // .eq('user_id', userId)
          .eq('id', clanMemberId)
          .single()
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanMembers
      }
    })
  )
}

export const useUserClanName= (clanMemberId: number | null | undefined, userId: string) => {
  return (
    useQuery({
      queryKey: ['user_clan', userId],
      queryFn: async () => {
        if (clanMemberId == null || clanMemberId == undefined) {
          return null
        }

        const { data: clanMembers, error } = await supabase
          .from('clan_members')
          .select('clan_id, clans(clan_name)')
          .eq('id', clanMemberId)
          .single()
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanMembers
      },
      enabled: !!clanMemberId,
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

export const useUpdateUserClanId = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
        clanId,
        userId
      } : {
        clanId: number | null,
        userId: string
      }) => {
        const { data: updatedUserData, error } = await supabase
          .from('users')
          .update({
            clan_member_id: clanId
          })
          .eq('id', userId)
          .single()

        if (error) {
          console.log("error in update user clanId::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return updatedUserData
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    })
  )
}