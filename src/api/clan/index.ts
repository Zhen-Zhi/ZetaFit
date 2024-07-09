import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"

export const useClanList = (searchValue: string) => {
  return (
    useQuery({
      refetchOnMount: false,
      queryKey: ['clans'],
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
      queryKey: ['clans', clan_id],
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

export const useUpdateRequiredActiveScore = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: newScore, error } = await supabase
        .from('clans')
        .update({
          required_active_score: data.requiredActiveScore,
        })
        .eq('clan_id', data.clanId)

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return newScore
      },
      onSuccess: async (_, { clan_id }) => {
        await queryClient.invalidateQueries({ queryKey: ['clans', clan_id] })
      },
    })
  )
}

export const useUpdateClanHealth = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: newClanHealth, error } = await supabase
        .from('clans')
        .update({
          clan_health: data.clanHealth,
        })
        .eq('clan_id', data.clanId)

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return newClanHealth
      },
      onSuccess: async (_, { clan_id }) => {
        await queryClient.invalidateQueries({ queryKey: ['clans', clan_id] })
      },
    })
  )
}

export const useClanRankings = () => {
  return (
    useQuery({
      queryKey: ['clan_rankings'],
      queryFn: async () => {
        const { data: useClanRankings, error } = await supabase
          .rpc('fetch_all_clan_rankings')
          // need to use predefine function in database because
          // supabase does not support rank()

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return useClanRankings
      }
    })
  )
}

export const useJoinClan = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (data: any) => {
        const { data: joinClan, error } = await supabase
        .from('clan_members')
        .insert({
          clan_id: data.clanId,
          user_id: data.userId,
        })
        .select()
        .single()

        if (error) {
          console.log("error in rank::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return joinClan
      },
      onSuccess: async (_, { clan_id }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_members', clan_id] })
      },
    })
  )
}

export const useLeaveClan = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (clan_member_id: number) => {
        const { error } = await supabase
          .from('clan_members')
          .delete()
          .eq('id', clan_member_id);

        if (error) {
          console.log("error in leave clan::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['clan_members'] })
      }
    })
  )
}