import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"

export const useClanList = (searchValue: string) => {
  return (
    useQuery({
      queryKey: ['clans'],
      enabled: false,
      queryFn: async () => {
        if(searchValue.length > 2) {
          const { data: clan, error } = await supabase
            .from('clans')
            .select('*')
            .ilike('clan_name', searchValue)
            .limit(20)

          if (error) {
            throw new Error(error.code + ":" + error.message)
          }

          return clan
        }
        else {
          const { data: clan, error } = await supabase
          .rpc('get_random_clans')

          if (error) {
            throw new Error(error.code + ":" + error.message)
          }

          return clan
        }
      }
    })
  )
}

export const useClanMemberNumber = (clan_id: number) => {
  return (
    useQuery({
      queryKey: ['clan_member_number', clan_id],
      queryFn: async () => {
        const { data: clanMembersNumber, error } = await supabase
          .from('clan_members')
          .select('user_id.count()')
          .eq('clan_id', clan_id)
          .single()
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanMembersNumber
      }
    })
  )
}

export const useClanMembers = (clan_id: number) => {
  return (
    useQuery({
      queryKey: ['clan_members', clan_id],
      queryFn: async () => {
        const { data: clanMembers, error } = await supabase
          .from('clan_members')
          .select('*, users(*)')
          .eq('clan_id', clan_id)
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanMembers
      }
    })
  )
}

export const useClanDetails = (clan_id: number) => {
  return (
    useQuery({
      queryKey: ['clan', clan_id],
      queryFn: async () => {
        const { data: clanDetail, error } = await supabase
          .from('clans')
          .select('*')
          .eq('clan_id', clan_id)
          .single()
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanDetail
      }
    })
  )
}

export const useClanActiveScore = (clan_id: number) => {
  return (
    useQuery({
      queryKey: ['clan_active_score', clan_id],
      queryFn: async () => {
        const { data: clanActiveScore, error } = await supabase
          .rpc('get_total_active_score', { clan_id: clan_id })
          // need to use predefine function in database because
          // supabase does not support group by

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanActiveScore
      }
    })
  )
}

export const useCreateNewClan = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: newClan, error } = await supabase
          .from('clans')
          .insert({
            clan_name: data.clanName,
            clan_description: data.clanDescription,
            required_active_score: data.requiredActiveScore,
            clan_health: 2000,
            founder_id: data.userId,
          })
          .select()
          .single()

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return newClan
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['clans'] })
      }
    })
  )
}

export const useDeleteClan = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (clan_id: number) => {
        const { error } = await supabase
          .from('clans')
          .delete()
          .eq('clan_id', clan_id);

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['clans'] })
      }
    })
  )
}