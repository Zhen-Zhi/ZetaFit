import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { themeColors } from '@/src/constants/Colors'
import { useAuth } from '@/src/providers/AuthProvider'

const AuthLayout = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/homepage'} />;
  }

  return (
    <Stack>
      <Stack.Screen name='sign_in' options={{ title: 'Sign in', headerTitleStyle: { color: themeColors.primary } }} />
      <Stack.Screen name='sign_up' options={{ title: 'Create Account', headerTitleStyle: { color: themeColors.primary } }} />
      <Stack.Screen name='username' options={{ title: 'Username', headerTitleStyle: { color: themeColors.primary } }} />
    </Stack>
  )
}

export default AuthLayout;