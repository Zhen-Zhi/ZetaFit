import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"
import { Tables } from "@/src/database.types"
import { InsertTables, UpdateTables } from "@/src/types"

export const useChallengesList = () => {
  return (
    useQuery({
      queryKey: ['challenges'],
      queryFn: async () => {
        const { data: challenges, error } = await supabase
          .from('challenges')
          .select('*')
          .gte('end_date', new Date().toISOString())
          .lte('start_date', new Date().toISOString())
          .order('end_date', { ascending: false })
          .limit(10)

        if (error) {
          console.log("Error in challenges.  " + error)
          throw new Error(error.code + ":" + error.message)
        }

        return challenges
      }
    })
  )
}

export const useUserJoinedChallenges = (userId: string) => {
  return (
    useQuery({
      queryKey: ['user_joined_challenges', userId],
      queryFn: async () => {
        const { data: joinedChallenges, error } = await supabase
          .from('user_challenges')
          .select('*, challenges(*)')

        if (error) {
          console.log("Error in get user joined challenges.  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return joinedChallenges
      }
    })
  )
}

export const useUserIsJoinedChallenge = (userId: string, challengeId: number) => {
  return (
    useQuery({
      queryKey: ['user_is_joined_challenge', userId, challengeId],
      queryFn: async () => {
        const { data: isJoinedChallenge, error } = await supabase
          .from('user_challenges')
          .select('id')
          .eq('user_id', userId)
          .eq('challenge_id', challengeId)
          .maybeSingle()

        if (error) {
          console.log("Error in get user is joined challenge.  " + error.message)
          throw new Error(error.code + ":" + error.message)
        }

        return !!isJoinedChallenge
      }
    })
  )
}

export const useChallengesListPagination = (searchValue: string, r1: number, r2: number, pageNumber: number) => {
  return (
    useQuery({
      queryKey: ['all_challenges', pageNumber],
      queryFn: async () => {
        if(searchValue.length > 2) {
          const { data: challenges, error } = await supabase
            .from('challenges')
            .select('*')
            .order('end_date', { ascending: false })
            .ilike('title', searchValue)
            .gte('end_date', new Date().toISOString())
            .lte('start_date', new Date().toISOString())
            .range(r1, r2)
            .limit(30)

          if (error) {
            console.log("Error in challenges.  " + error)
            throw new Error(error.code + ":" + error.message)
          }

          return challenges

        } else {
          const { data: challenges, error } = await supabase
            .from('challenges')
            .select('*')
            .order('end_date', { ascending: false })
            .gte('end_date', new Date().toISOString())
            .lte('start_date', new Date().toISOString())
            .range(r1, r2)

          if (error) {
            console.log("Error in challenges.  " + error)
            throw new Error(error.code + ":" + error.message)
          }

          return challenges
        }
      }
    })
  )
}

export const useChallengesDetails = (challengeId: number) => {
  return (
    useQuery({
      queryKey: ['challenge_details', challengeId],
      queryFn: async () => {
        const { data: challenges, error } = await supabase
          .from('challenges')
          .select('*, badges(*)')
          .eq('id', challengeId)
          .single()

        if (error) {
          console.log("Error in fetching challenges details  " + error)
          throw new Error(error.code + ":" + error.message)
        }

        return challenges
      }
    })
  )
}