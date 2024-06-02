import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'

const index = () => {
  return (
    <Redirect href={'/(auth)/sign_in'} />
  )
}

export default index

const styles = StyleSheet.create({})