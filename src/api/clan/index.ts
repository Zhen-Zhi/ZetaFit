import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"

export const useClanList = () => {
  return (
    useQuery({
      queryKey: ['clans'],
      queryFn: async () => {
        const { data: clan, count: numberOfMember, error } = await supabase
          .from('clans')
          .select('*', { count: "exact", head: true })
        
        if (error) {
          throw new Error(error.code + ":" + error.message)
        }

        return { clan, numberOfMember }
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