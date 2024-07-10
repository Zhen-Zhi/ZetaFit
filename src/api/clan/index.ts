import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"
import { Tables } from "@/src/database.types"
import { InsertTables, UpdateTables } from "@/src/types"

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
      mutationFn: async (newClanDetails: InsertTables<'clans'>) => {
        const { data: newClan, error } = await supabase
          .from('clans')
          .insert({ ...newClanDetails, })
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
      mutationFn: async ({
        clanId,
        updatedFields,
      } : {
        clanId: number,
        updatedFields: UpdateTables<'clans'>
      }) => {
        const { data: newScore, error } = await supabase
        .from('clans')
        .update(updatedFields)
        .eq('clan_id', clanId)

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return newScore
      },
      onSuccess: async (_, { clanId }) => {
        console.log(clanId)
        await queryClient.invalidateQueries({ queryKey: ['clans', clanId] })
      },
    })
  )
}

export const useUpdateClanHealth = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
        clanId,
        updatedFields,
      } : {
        clanId: number,
        updatedFields: UpdateTables<'clans'>
      }) => {
        const { data: newClanHealth, error } = await supabase
        .from('clans')
        .update(updatedFields)
        .eq('clan_id', clanId)

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return newClanHealth
      },
      onSuccess: async (_, { clanId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clans', clanId] })
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
          // supabase client does not support rank()

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
      mutationFn: async ({
        clanId,
        newMember,
      } : {
        clanId: number,
        newMember: InsertTables<'clan_members'>
      }) => {
        const { data: joinClan, error } = await supabase
          .from('clan_members')
          .insert({...newMember})
          .select()
          .single()

        if (error) {
          console.log("error in join::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }
      },
      onSuccess: async (_, { clanId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_members'] })
        await queryClient.invalidateQueries({ queryKey: ['clan_member_number', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_active_score'] })
        await queryClient.invalidateQueries({ queryKey: ['clan_rankings'] })
      },
    })
  )
}

export const useLeaveClan = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
        clanId,
        clanMemberId,
      } : {
        clanId: number,
        clanMemberId: number,
      }) => {
        const { data: deletedMember, error } = await supabase
          .from('clan_members')
          .delete()
          .eq('id', clanMemberId)
          .select('clan_id')
          .single();

        if (error) {
          console.log("error in leave clan::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return clanId
      },
      onSuccess: async (_, { clanId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_members'] })
        await queryClient.invalidateQueries({ queryKey: ['clan_member_number', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_active_score'] })
        await queryClient.invalidateQueries({ queryKey: ['clan_rankings'] })
      },
    })
  )
}