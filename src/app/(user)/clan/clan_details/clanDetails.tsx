import { Modal, Pressable, StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { themeColors } from '@/src/constants/Colors'
import * as Progress from 'react-native-progress';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import EditRequireActiveScoreModal from './editRequireActiveScore';
import AddClanHealthModal from './addClanHealth';
import { RouteProp } from '@react-navigation/native';
import { Tables } from '@/src/database.types';
import { useClanActiveScore, useClanMembers, useClanRankings } from '@/src/api/clan';
import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect } from 'expo-router';

type ClanDetailsScreenRouteProp = RouteProp<{
  clanDetails: {
    clanDetails: Tables<'clans'>;
  };
}, 'clanDetails'>;

type ClanDetailsScreenProps = {
  route: ClanDetailsScreenRouteProp;
};

const ClanDetailsScreen = ({ route }: ClanDetailsScreenProps) => {
  const { clanDetails } = route.params;
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const {
    data: clanActiveScore,
    isLoading: clanActiveScoreLoading,
    error: clanActiveScoreError,
  } = useClanActiveScore(clanDetails.clan_id)

  const {
    data: clanRankings,
    isLoading: clanRankingsLoading,
    error: clanRankingsError,
  } = useClanRankings();

  const {
    data: clanMembers, 
    isLoading: clanMembersLoading, 
    error: clanMembersError 
  } = useClanMembers(clanDetails.clan_id)

  const rank = clanRankings?.find((clan) => clan.clan_id == clanDetails.clan_id)?.rank ?? '-';

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [healthModalVisible, setHealthModalVisible] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [amount, setAmount] = useState(clanDetails.required_active_score);
  const [highLevelMember, setHighLevelMember] = useState(false);

  useEffect(() => {
    if (clanMembers?.some(member => member.user_id === session.user.id)) {
      setIsMember(true);
      const getUserrole = clanMembers.find((member) => member.user_id == session.user.id)
      setHighLevelMember(getUserrole?.role == 'Leader' || getUserrole?.role == 'Co-Leader')
    }
  },[clanMembers])

  const increment = () => {
    setAmount(prevAmount => prevAmount + 100);
  };

  const decrement = () => {
    setAmount(prevAmount => prevAmount > 0 ? prevAmount - 100 : 0);
  };
  
  return (
    <View className='flex-1 p-4'>
      <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center'>Clan ActiveScore</Text>
      <View className='rounded-xl flex-row justify-center p-2 mb-2 bg-white/50'>
        <View className='my-auto mx-3'>
          <FontAwesome6 name="fire" size={48} color="rgba(240, 93, 9, 0.8)" />
        </View>
        <Text style={{ color: themeColors.primary }} className='text-[48px] font-bold text-center rounded-2xl'>{clanActiveScore ?? 0}</Text>
      </View>

      <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center'>Clan War History</Text>

      <View className='rounded-xl p-2 mb-2 bg-white/50'>
        <View className='flex-row justify-center'>
          <Text style={{ color: themeColors.tetiary }} className='font-bold text-[22px] mx-3'>Win</Text>
          <Progress.Bar className='my-2'
            progress={0.65}
            height={14}
            width={260}
            color={themeColors.tetiary}
            unfilledColor='#dc2626'
            borderWidth={0}
            borderRadius={10}
          />
          <Text className='font-bold text-[22px] text-red-600 mx-3'>Lose</Text>
        </View>
        <View className='flex-row justify-center'>
          <Text style={{ color: themeColors.tetiary }} className='font-extrabold text-[32px] mx-4'>65</Text>
          <Text style={{ color: themeColors.primary }} className='font-extrabold text-[32px] mx-4'>:</Text>
          <Text className='font-extrabold text-[32px] text-red-600 mx-4'>35</Text>
        </View>
      </View>

      
      <View className='rounded-xl p-2 mb-2 flex-row justify-around'>
        <View className='w-3/5 bg-white/50'>
          <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>Required ActiveScore</Text>
          <View className='flex-row'>
            <View className='my-auto mx-3'>
              <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
            </View>
            <Text style={{ color: themeColors.primary }} className='text-[22px] font-bold text-center rounded-2xl'>{clanDetails.required_active_score}</Text>
            {
              isMember
                &&
              highLevelMember
                &&
              <AnimatedPressable
                pressInValue={0.95}
                className='absolute right-8 top-1.5'
                onPress={() => setEditModalVisible(true)}
              >   
                <View className='my-auto'>
                  <FontAwesome5 name="pencil-alt" size={20} color={themeColors.primary} />
                </View>
              </AnimatedPressable>
            }
          </View>
        </View>
        <View className='w-2/5 bg-white/50'>
          <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>Ranking</Text>
          <View className='flex-row'>
            <View className='my-auto mx-3'>
              <MaterialIcons name="leaderboard" size={22} color={themeColors.primary} />
            </View>
          <Text style={{ color: themeColors.primary }} className='text-[22px] font-bold rounded-2xl'>{rank}</Text>
          </View>
        </View>
      </View>

      <View className='rounded-xl p-2 mb-2 flex-row'>
        <View className='w-3/5 bg-white/50'>
          <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>Clan Health Points</Text>
          <View className='flex-row'>
            <View className='my-auto mx-3'>
              <FontAwesome6 name="shield-heart" size={22} color='red' />
            </View>
            <Text style={{ color: themeColors.primary }} className='text-[22px] font-bold text-center rounded-2xl'>{clanDetails.clan_health}</Text>
            {
              isMember
                && 
              <AnimatedPressable
                pressInValue={0.95}
                className='absolute right-8 top-1.5'
                onPress={() => setHealthModalVisible(true)}
              >   
              <View className='my-auto'>
                <FontAwesome name="plus" size={22} color="black" />
              </View>
              </AnimatedPressable>
            }
          </View>
        </View>
      </View>

      <Modal
        animationType='fade'
        visible={editModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setEditModalVisible(false)}
      >
        <EditRequireActiveScoreModal 
          onClose={() => setEditModalVisible(false)}
          increment={increment}
          decrement={decrement}
          amount={amount}
          clanId={clanDetails.clan_id}
        />
      </Modal>

      <Modal
        animationType='fade'
        visible={healthModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setHealthModalVisible(false)}
      >
        <AddClanHealthModal 
          onClose={() => setHealthModalVisible(false)} 
          clanHealth={clanDetails.clan_health} 
          clanId={clanDetails.clan_id}
        />
      </Modal>
    </View>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})