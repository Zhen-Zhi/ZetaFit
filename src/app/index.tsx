import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'

const index = () => {
  return (
    <Redirect href={'/(user)'} />
    // <View>
    //   <Link href={'/(user)'}>
    //     <Text>index</Text>
    //   </Link>
    // </View>
  )
}

export default index

const styles = StyleSheet.create({})