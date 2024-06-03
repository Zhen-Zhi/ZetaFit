import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name='sign_in' options={{ title: 'Sign in' }} />
      <Stack.Screen name='sign_up' options={{ title: 'Create Account' }} />
      <Stack.Screen name='username' options={{ title: 'Username' }} />
    </Stack>
  )
}