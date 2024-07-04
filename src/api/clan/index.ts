import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import { supabase } from "@/src/lib/supabase"

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
          })
          .single()

        if (error) {
          console.log(error.code + " :: " + error.message);
          throw new Error(error.message)
        }

        return newClan
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['clans'] })
      }
    })
  )
}