import { View, Text } from 'react-native'
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { Tables } from '../database.types'

type AuthData = {
  session: Session | null;
  loading: boolean;
  user: Tables<'users'> | null;
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: null,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<Tables<'users'> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async() => {
      const { data: {session} } = await supabase.auth.getSession()
      setSession(session)

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser(data);
      }

      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)