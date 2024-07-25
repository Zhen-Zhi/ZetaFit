import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import connection from '../utility/solana';

const index = () => {  
  const { session } = useAuth()

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  // useEffect(() => {
  //   const fetchSolanaData = async () => {
  //     try {
  //       const latestBlockhash = await connection.getLatestBlockhash();
  //       console.log('Latest Blockhash:', latestBlockhash);

  //       // const balanceInLamports = await connection.getBalance();
  //       // console.log('Balance:', balanceInLamports);
  //     } catch (error) {
  //       console.error("Error fetching Solana data:", error);
  //     }
  //   };

  //   fetchSolanaData();
  // }, []);
}

export default index

const styles = StyleSheet.create({})