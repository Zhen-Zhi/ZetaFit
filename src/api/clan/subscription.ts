import { supabase } from "@/src/lib/supabase"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react"


export const useClanActivityLogSubscription = (clanId: number) => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const clanActivityLog = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'clan_activity_log' },
      (payload) => {
        queryClient.invalidateQueries({ queryKey: ['clan_activity_log', clanId] })
      }
    )
    .subscribe()

    return () => {
      clanActivityLog.unsubscribe()
    }
  }, [])
}

export const useClanMembersSubscription = (clanId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const insertChannel = supabase.channel('custom-filler-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'clan_members',
          filter: `clan_id=eq.${clanId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({queryKey: ['clan_members', clanId]});
        }
      )
      .subscribe();

    const deleteChannel = supabase.channel('delete-channel')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'clan_members',
          filter: `clan_id=eq.${clanId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({queryKey: ['clan_members', clanId]});
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(insertChannel);
      supabase.removeChannel(deleteChannel);
    };
  }, [clanId, queryClient]);
};