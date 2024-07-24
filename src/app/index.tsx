import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'

const index = () => {  
  const { session } = useAuth()

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }
}

export default index

const styles = StyleSheet.create({})