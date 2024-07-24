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

export const useClanMemberNumber = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_member_number', clanId],
      queryFn: async () => {
        const { data: clanMembersNumber, error } = await supabase
          .from('clan_members')
          .select('user_id.count()')
          .eq('clan_id', clanId)
          .single()
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanMembersNumber
      }
    })
  )
}

export const useClanMembers = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_members', clanId],
      queryFn: async () => {
        const { data: clanMembers, error } = await supabase
          .from('clan_members')
          .select('*, users(*)')
          .eq('clan_id', clanId)
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanMembers
      }
    })
  )
}

export const useClanDetails = (clanId: number | null) => {
  return (
    useQuery({
      queryKey: ['clans', clanId],
      queryFn: async () => {
        if (clanId == null || clanId == undefined) {
          return null
        }
        
        const { data: clanDetail, error } = await supabase
          .from('clans')
          .select('*')
          .eq('clan_id', clanId)
          .single()
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanDetail
      },
      enabled: !!clanId
    })
  )
}

export const useClanActiveScore = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_active_score', clanId],
      queryFn: async () => {
        const { data: clanActiveScore, error } = await supabase
          .rpc('get_total_active_score', { clan_id: clanId })
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
          .insert({ ...newClanDetails })
          .select()
          .single()

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newClan
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['clans'] })
        await queryClient.invalidateQueries({ queryKey: ['user_clan'] })
        await queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    })
  )
}

export const useDeleteClan = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (clanId: number) => {
        const { error } = await supabase
          .from('clans')
          .delete()
          .eq('clan_id', clanId);

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
        userId
      } : {
        clanId: number,
        newMember: InsertTables<'clan_members'>,
        userId: string
      }) => {
        const { data: joinedMember, error } = await supabase
          .from('clan_members')
          .insert({...newMember})
          .select()
          .single()

        if (error) {
          console.log("error in join::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return joinedMember
      },
      onSuccess: async (_, { clanId, userId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_members', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_member_number', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_active_score', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_rankings'] })
        await queryClient.invalidateQueries({ queryKey: ['user_clan_member_data'] })
        await queryClient.invalidateQueries({ queryKey: ['users'] })
        await queryClient.invalidateQueries({ queryKey: ['user_clan'] })
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
        userId
      } : {
        clanId: number,
        clanMemberId: number,
        userId: string
      }) => {
        const { data: leavedMember, error } = await supabase
          .from('clan_members')
          .delete()
          .eq('id', clanMemberId)
          .select('clan_id')
          .single();

        if (error) {
          console.log("error in leave clan::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return leavedMember
      },
      onSuccess: async (_, { clanId, userId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_members', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_member_number', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_active_score', clanId] })
        await queryClient.invalidateQueries({ queryKey: ['clan_rankings'] })
        await queryClient.invalidateQueries({ queryKey: ['user_clan_member_data', userId] })
        await queryClient.invalidateQueries({ queryKey: ['users'] })
        await queryClient.invalidateQueries({ queryKey: ['user_clan'] })
      },
    })
  )
}

export const useEditClanMemberRole = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
        clanId,
        clanMemberId,
        role
      } : {
        clanId: number
        clanMemberId: number,
        role: string
      }) => {
        const { data: newRole, error } = await supabase
          .from('clan_members')
          .update({
            role: role
          })
          .eq('id', clanMemberId)

        if (error) {
          console.log("error in update role::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newRole
      },
      onSuccess: async (_, { clanId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_members', clanId] })
      },
    })
  )
}

export const useInsertClanLog = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (clanLog: InsertTables<'clan_activity_log'>) => {
        const { data: joinedMember, error } = await supabase
          .from('clan_activity_log')
          .insert({ ...clanLog, })
          .select()
          .single()

        if (error) {
          console.log("error in join::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return joinedMember
      },
      onSuccess: async (_, { clan_id }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_activity_log', clan_id] })
      },
    })
  )
}

export const useClanActivityLog = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_activity_log', clanId],
      queryFn: async () => {
        const { data: clanActivityLog, error } = await supabase
          .from('clan_activity_log')
          .select('*, users(*)')
          .eq('clan_id', clanId)

        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return clanActivityLog
      }
    })
  )
}

export const useUpdateBattleStatus = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async ({
        clanId,
        updateBattleStatus,
      }: {
        clanId: number,
        updateBattleStatus: UpdateTables<'clans'>
      }) => {
        const { data: newRole, error } = await supabase
          .from('clans')
          .update(updateBattleStatus)
          .eq('clan_id', clanId)

        if (error) {
          console.log("error in update role::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newRole
      },
      onSuccess: async (_, { clanId }) => {
        await queryClient.invalidateQueries({ queryKey: ['clans', clanId] })
      },
    })
  )
}

export const useClanWar = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_war', clanId],
      queryFn: async () => {
        const { data: clanActivityLog, error } = await supabase
          .from('clan_war')
          .select('*')
          .or(`clan_1.eq.${clanId},clan_2.eq.${clanId}`)
          .eq('status', true)
          .single()

        if (error) {
          console.log(error)
          throw new Error(error.code + ":" + error.message)
        }

        return clanActivityLog
      }
    })
  )
}

export const useUpdateClanWar = () => {
  const queryClient = useQueryClient()

  return (
    useMutation({
      mutationFn: async (updatedClanWar: UpdateTables<'clan_war'>) => {
        if(updatedClanWar.id == null) {
          console.log("Clan war id not provided.")
          return
        }

        const { data: newRole, error } = await supabase
          .from('clans')
          .update(updatedClanWar)
          .eq('id', updatedClanWar.id)

        if (error) {
          console.log("error in update role::  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return newRole
      },
      onSuccess: async (_, { clan_1, clan_2 }) => {
        await queryClient.invalidateQueries({ queryKey: ['clan_war', clan_1] })
        await queryClient.invalidateQueries({ queryKey: ['clan_war', clan_2] })
      },
    })
  )
}

export const useClanWarWin = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_war_win', clanId],
      queryFn: async () => {
        const { data: clanWarWin, error } = await supabase
          .from('clan_war')
          .select('winner_clan_id.count()')
          .eq('winner_clan_id', clanId)
          .single()

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return clanWarWin
      }
    })
  )
}

export const useClanWarLose = (clanId: number) => {
  return (
    useQuery({
      queryKey: ['clan_war_lose', clanId],
      queryFn: async () => {
        const { data: clanWarLose, error } = await supabase
          .from('clan_war')
          .select('defeat_clan_id.count()')
          .eq('defeat_clan_id', clanId)
          .single()

        if (error) {
          console.log(error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return clanWarLose
      }
    })
  )
}