import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import ClanMember from '@/src/components/ClanMember'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import { themeColors } from '@/src/constants/Colors'
import { Tables } from '@/src/database.types'
import { RouteProp } from '@react-navigation/native';
import { useClanMemberNumber, useClanMembers } from '@/src/api/clan'
import { Redirect } from 'expo-router'
import { useAuth } from '@/src/providers/AuthProvider'
import ClanLoadingScreenComponent from '@/src/components/ClanLoadingScreen'
import { useUserClanMemberData } from '@/src/api/users'
import { useClanMembersSubscription } from '@/src/api/clan/subscription'

type MemberScreenRouteProp = RouteProp<{
  member: {
    clanId: number;
    clanDetails: Tables<'clans'>;
  };
}, 'member'>;

type MemberScreenProps = {
  route: MemberScreenRouteProp;
};

// type MemberScreenProps = {
//   clanDetails: Tables<'clans'>;
//   clanId: number;
// };

const MemberScreen = ({ route }: MemberScreenProps) => {
// const MemberScreen = ({ clanDetails, clanId }: MemberScreenProps) => {
  const { clanDetails, clanId } = route.params;
  // const { clanDetails, clanId } = route;
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const {
    data: clanMembers,
    isLoading: clanMembersLoading,
    error: clanMembersError
  } = useClanMembers(clanId)

  const {
    data: clanMembersNumber,
    isLoading: clanMembersNumberLoading,
    error: clanMembersNumberError,
  } = useClanMemberNumber(clanId)

  const {
    data: userClanMemberData,
    isLoading: userClanMemberDataLoading,
    error: userClanMemberDataError,
  } = useUserClanMemberData(clanId, session?.user.id)

  useClanMembersSubscription(clanId);

  if(!clanMembers) {
    console.log("Clan members not found. debug in '/clan/clan_detials/clanMemberList.tsx'")
    return <ClanLoadingScreenComponent />
  }

  const headerComponent = (
    <View className='bg-white flex-row'>
      <View className='mx-2 my-auto'>
        <FontAwesome6 name="user-group" size={18} color={themeColors.primary} />
      </View>
      <Text className='text-lg font-semibold' style={{ color: themeColors.primary }}>Member {clanMembersNumber?.count}/{clanDetails?.max_member}</Text>
    </View>
  )

  const footerComponent = (
    <View className='bg-white'><Text className='text-slate-400 text-md text-center font-semibold'>You had reach the end</Text></View>
  )

  return (
    <View className='px-2'>
      <FlatList
        className='mt-1 mb-2 mx-0.5'
        data={clanMembers}
        renderItem={({ item }) => <ClanMember member={item} role={userClanMemberData?.role} clanMemberViewerId={userClanMemberData?.id} />}
        keyExtractor={(item) => item.user_id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 3 }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
      />
    </View>
  )
}

export default MemberScreen

const styles = StyleSheet.create({})