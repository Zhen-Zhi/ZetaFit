import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { themeColors } from '@/src/constants/Colors'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name='sign_in' options={{ title: 'Sign in', headerTitleStyle: { color: themeColors.primary } }} />
      <Stack.Screen name='sign_up' options={{ title: 'Create Account', headerTitleStyle: { color: themeColors.primary } }} />
      <Stack.Screen name='username' options={{ title: 'Username', headerTitleStyle: { color: themeColors.primary } }} />
    </Stack>
  )
}