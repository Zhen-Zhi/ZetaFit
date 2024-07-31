import { ImageBackground, StyleSheet, Text, View, Image, FlatList, Platform, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { difficultiesColors, themeColors } from '@/src/constants/Colors';
import { ScrollView } from 'react-native';
import LeaderboardMemberScreen from '@/src/components/LeaderboardMember';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChallengesActionScreenModal from './challengesActions';
import AnimatedModal from '@/src/components/AnimatedModal';
import { Badge } from 'react-native-elements'
import RewardsScreen from '@/src/components/Rewards';
import RemoteImage from '@/src/components/RemoteImage';
import { useChallengeAllUser, useChallengesDetails, useJoinChallenge, useUpdateUserChallenge, useUserChallengeDetails, useUserIsJoinedChallenge } from '@/src/api/challenges';
import { useAuth } from '@/src/providers/AuthProvider';
import { useUpdateUser, useUpdateUserCoin, useUserData, useUserInsertBadge } from '@/src/api/users';
import { useInsertItems } from '@/src/api/pets/inventory';

type ChallengesDetialsProps = {
  progress : number;
}

const ChallengesDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const challengeId = parseInt(typeof id == 'string' ? id : id?.[0] ?? '0')

  const { session } = useAuth()

  if (!session) {
    return <Redirect href={'/(auth)/sign_in'} />;
  }

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useUserData(session.user.id)

  const {
    data: isJoinedChallenge,
    error: isJoinedChallengeError,
    isLoading: isJoinedChallengeIsLoading, 
  } = useUserIsJoinedChallenge(session.user.id, challengeId)

  const {
    data: challengeDetails,
    error: challengeDetailsError,
    isLoading: challengeDetailsIsLoading,
  } = useChallengesDetails(challengeId)

  const {
    data: userChallengeDetails,
    error: userChallengeDetailsError,
    isLoading: userChallengeDetailsIsLoading,
  } = useUserChallengeDetails(session.user.id, challengeId)

  const {
    data: challengeAllUser,
    error: challengeAllUserError,
    isLoading: challengeAllUserIsLoading,
  } = useChallengeAllUser(challengeId)
    
  const { mutate: joinChallenge } = useJoinChallenge()
  const { mutate: updateUser } = useUpdateUser()
  const { mutate: insertInventoryChest } = useInsertItems()
  const { mutate: updateUserChallenge } = useUpdateUserChallenge()
  const { mutate: insertBadges } = useUserInsertBadge()

  const [joinedChallenge, setJoinedChallenge] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardsModalVisible, setRewardsModalVisible] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [rewardClaimed, setRewardClaimed] = useState(false)

  useEffect(() => {
    if(isJoinedChallenge) {
      setJoinedChallenge(isJoinedChallenge)
    }

    if(challengeDetails) {
      if(calculateDamage() > challengeDetails?.health) {
        setCompleted(true)
      }
    }

    if(userChallengeDetails?.completed) {
      setRewardClaimed(true)
    }

  }, [isJoinedChallenge, userChallengeDetails])

  if(challengeDetailsIsLoading || userDataIsLoading) {
    return <ActivityIndicator />
  }

  if(!challengeDetails) {
    console.log("challengeDetails not found.")
    return <ActivityIndicator />
  }

  if(!userData) {
    console.log("Userdata not found.")
    return <ActivityIndicator />
  }

  const calculateLevel = (): number => {
    let required_xp = 99999   // if no level found
    if(userData?.level) {
      
      if (userData.level >= 1 && userData.level < 10) {
        required_xp = 80 + (userData.level * 20)
      }
      else if (userData.level >= 10 && userData.level < 29) {
        required_xp = 260 + ((userData.level - 9) * 50)
      }
      else {
        required_xp = 1230 + ((userData.level - 29) * 100)
      }
    }

    return required_xp
  }

  const handleClaimReward = () => {
    if(!userData) {
      console.warn("Userdata not found")
      return
    }

    if(!userChallengeDetails) {
      return
    }

    const newCoin = userData?.coin + 1500
    const newDiamond = userData.diamond + 20
    let newLv = userData.level
    let newExp = userData.experience
    
    const required_xp = calculateLevel()

    if(newExp + 40 >= required_xp) {
      newLv = newLv + 1
      newExp = newExp + 40 - required_xp
    } else {
      newExp = newExp + 40
    }
    
    updateUserChallenge(
      { 
        updateChallenge: { completed: true }, 
        userChallengeId: userChallengeDetails?.id 
      }, 
      {
        onSuccess() {
          insertInventoryChest(
            {
              image: 'chest.png',
              name: 'Precious chest',
              type: 'chest',
              user_id: session.user.id
            }, 
            {
              onSuccess() {
                console.log("Chest inserted to user inventory")
              },
              onError() {
                console.warn("Rewards not claimed")
              }
            }
          )

          updateUser(
            {
              id: session.user.id,
              coin: newCoin,
              diamond: newDiamond,
              experience: newExp,
              level: newLv,
            }, 
            {
              onSuccess() {
                console.log("Rewards claimed")
              },
              onError() {
                console.warn("Rewards not claimed")
              }
            }
          )

          if(challengeDetails?.badge_id) {
            insertBadges(
              { user_id: session.user.id, badge_id: challengeDetails?.badge_id }, 
              {
                onSuccess() {
                  console.log("Updated badges")
                },
                onError() {
                  console.warn("Badges not claimed")
                }
              }
            )
          }
          setRewardsModalVisible(true)
          setRewardClaimed(true)
        }
      }
    )
  }

  const handleLeaderboard = () => {
    if (challengeAllUser) {
      const participants = challengeAllUser.map((challenge) => {
        const totalDamage = challenge.user_challenge_details.reduce((acc, detail) => {
          return acc + detail.damage;
        }, 0);  

        return {
          user_id: challenge.user_id,
          profile_image: challenge.users?.avatar_image,
          user_name: challenge.users?.username, // Adjust the field name to match your schema
          clan_name: challenge.users?.clan_members?.clans?.clan_name ?? 'No Clan', // Adjust the field name to match your schema
          damageSum: totalDamage
        };
      });

      return participants
    }
  }

  const handleJoinChallenge = () => {
    joinChallenge(
      { user_id: session.user.id, challenge_id: challengeId, completed: false }, 
      {
        onSuccess() {
          updateUser(
            { id: session.user.id, coin: userData.coin -200 }
          )

          setJoinedChallenge(true)
          setModalVisible(false);
        },
        onError(error) {
          console.log("Failed to join challenge. " + error.message)
        }
      }
    )
  }

  const calculateDamage = () => {
    let userChallengeDamage = 0;
    if(userChallengeDetails) {
      userChallengeDamage = userChallengeDetails.user_challenge_details.reduce((detailsAcc, detail) => {
        return detailsAcc + detail.damage;
      }, 0);
    }
    return userChallengeDamage
  }

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-between pt-3 pb-2 px-4 border-b border-slate-300'>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10'
          onPress={() => router.back()}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-xl font-semibold'>Challenge Detials</Text>
        <AnimatedPressable pressInValue={0.9} className='z-10' disabled={!joinedChallenge} onPress={() => setActionModalVisible(true)}>
          <View className='p-1'>
            <Image
              className={`w-6 h-8 ${joinedChallenge ? null : 'h-0'}`}
              source={require('@asset/images/attack_icon.png')}
            />
          </View>
        </AnimatedPressable>
      </View>
        <ScrollView className='flex-1'>
        <View className='p-4'>
          {/* <Image
            className='h-[220px] rounded-lg w-full'
            source={require('@asset/images/challenges_banner.png')}
          /> */}
          <RemoteImage
            classNameAsProps='h-[220px] rounded-lg w-full'
            path={challengeDetails?.banner_image} 
            resizeMode='contain'
            fallback={require('@asset/images/default.png')}
            bucket='challenges_banner'
          />
          <View className='flex-row mt-2 bg-white/50 justify-between'>
            <View className='flex-row'>
              <MaterialCommunityIcons name="calendar-month" size={28} color={themeColors.primary} />
              <Text className='font-bold text-[16px] my-auto ml-1 mr-2'>
                {
                  challengeDetails?.start_date
                  + " - " +
                  challengeDetails?.end_date
                }
              </Text>
            </View>
            <View className='flex-row'>
              {
                challengeDetails?.difficulty == "Beginner"
                  ?
                <MaterialCommunityIcons name="speedometer-slow" size={28} color={difficultiesColors.beginner_darker} />
                  :
                  challengeDetails?.difficulty == "Intermediate"
                    ?
                  <MaterialCommunityIcons name="speedometer-medium" size={28} color={difficultiesColors.intermediate_darker} />
                    :
                  <MaterialCommunityIcons name="speedometer" size={28} color={difficultiesColors.expert_darker} />
                }
              <Text 
                style={
                  { color: 
                    challengeDetails?.difficulty == 'Beginner' 
                      ? difficultiesColors.beginner_darker 
                      : challengeDetails?.difficulty == "Intermediate"
                        ? difficultiesColors.intermediate_darker
                        : difficultiesColors.expert_darker
                  }
                } 
                className='font-bold text-[16px] my-auto mx-2'
              >
                {challengeDetails?.difficulty}
              </Text>
            </View>
          </View>
          <Text className='text-center font-extrabold text-[36px] mt-6 mx-4 bg-white/50'>{challengeDetails?.title}</Text>
          <View className='mt-6 bg-white/50'>
            <Text className='font-bold text-2xl'>Challenges Details</Text>
            <Text className='font-medium text-md mt-2 text-justify'>
              {challengeDetails?.description}
            </Text>
          </View>
          <View className='mt-20 bg-white/50'>
            <Text className='font-bold text-2xl'>Rewards</Text>
          </View>
          {/* <Image
            className='w-64 h-64 mx-auto'
            source={require('@asset/images/starter achievement.png')}
          /> */}
          <RemoteImage
            classNameAsProps='w-64 h-64 mx-auto'
            path={challengeDetails?.badges?.image_name} 
            fallback={require('@asset/images/default.png')}
            bucket='badges'
          />
          <Text className='font-semibold text-lg text-center mt-4'>{challengeDetails?.badges?.name}</Text>
          <View className='mt-10'>
            <Text className='font-bold text-2xl'>Leaderboard</Text>
            { 
              handleLeaderboard()?.sort((a, b) => b.damageSum - a.damageSum).slice(0, 20).map((participant, index) => {
                return (
                  <LeaderboardMemberScreen 
                    ranking={index + 1}
                    isUser={participant.user_id == session.user.id}
                    username={participant.user_name ?? 'Username Not Found'} 
                    clanName={participant.clan_name} 
                    damage={participant.damageSum} 
                    key={participant.user_id} 
                    profile_image={participant.profile_image}
                  />
                )
              })
            }
            {/* <LeaderboardMemberScreen /> */}
          </View>
        </View>
        <View className='h-20' />
        </ScrollView>
        <LinearGradient
          className='h-32 w-full z-10 absolute bottom-0 justify-end'
          colors={['#ffffff00', '#ffffff']}
          start={{ x: 0, y: 0 }}  // Gradient starts at the top
          end={{ x: 0, y: 0.55 }}  // Gradient ends at the bottom
        >
        {joinedChallenge 
          ? 
          !completed 
            ? 
            <AnimatedPressable
              pressInValue={0.95}
            >
              <View className='mx-3 p-2 mb-2'>
                <View className='flex-row justify-between'>
                  <Text className='font-bold text-lg mb-1'>Your Progress</Text>
                  <View className='flex-row'>
                    <Image className='w-6 h-8 mb-1 mr-1.5' source={require('@asset/images/attack_icon.png')}/>
                    <Text className='font-bold text-lg mr-3 mb-1'>{calculateDamage()}/{challengeDetails.health}</Text>
                  </View>
                </View>
                <Progress.Bar
                  width={350}
                  height={10}
                  // progress={0.6}
                  progress={calculateDamage() / (challengeDetails.health == 0 ? 99999 : challengeDetails.health)}
                  borderWidth={0}
                  color={themeColors.tetiary}
                  borderRadius={10}
                  unfilledColor='red'
                />
              </View>
            </AnimatedPressable>
            :
            <AnimatedPressable 
              style={{ backgroundColor: rewardClaimed ? themeColors.disabled : themeColors.secondary }}
              className='mx-3 mb-2 rounded-lg p-1.5'
              pressInValue={0.98}
              disabled={rewardClaimed}
              onPress={handleClaimReward}
            >
              <Text className='text-center text-lg text-white font-bold'>{ rewardClaimed ? 'Claimed' : 'Claim Rewards'}</Text>
              { !rewardClaimed && <Badge
                value={1}
                textStyle={{ fontSize: 16, fontWeight: 700 }}
                containerStyle={{ position: 'absolute', top: -12, right: -6 }} 
                badgeStyle={{ height: 24, width: 80, borderRadius: 20 }} 
                status="error"
              />}
            </AnimatedPressable>
        :
        <AnimatedPressable
          style={{ backgroundColor: themeColors.secondary }}
          className='mx-3 mb-2 rounded-lg p-1.5'
          pressInValue={0.98}
          onPress={() => setModalVisible(true)}
        >
          <Text className='text-center text-lg text-white font-bold'>Join Challenges</Text>
        </AnimatedPressable>
        }
        </LinearGradient>
      </ImageBackground>

      {/* Challenges action modal (attack, defense) */}
      <Modal
        animationType='fade'
        visible={actionModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setActionModalVisible(false)}
      >
        { userChallengeDetails &&
          <ChallengesActionScreenModal userChallengeId={userChallengeDetails.id} onClose={() => setActionModalVisible(false)} />
        }
      </Modal>

      {/* Join challenges confirmation modal */}
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setActionModalVisible(false)}
      >
        <AnimatedModal onClose={() => setModalVisible(false)}>
          <View className='p-4'>
            <Text className='font-bold text-2xl'>Join Challenge?</Text>
            <Text className='font-medium my-3 text-lg'>Join Challenges this challenges?</Text>
            <AnimatedPressable
              style={{ backgroundColor: ((userData?.coin ?? 0) < 200) ? themeColors.disabled : themeColors.secondary }}
              pressInValue={0.98} 
              className='p-1 rounded-lg'
              onPress={handleJoinChallenge}
              disabled={(userData?.coin ?? 0) < 200}
            >
              <View className='flex-row justify-center'>
                <Image
                  className='w-6 h-6 my-auto mr-1'
                  source={require('@asset/images/coin_icon.png')}
                />
                <Text className='font-bold text-lg text-center text-white'>200</Text>
              </View>
            </AnimatedPressable>
          </View>
        </AnimatedModal>
      </Modal>

      {/* rewards modal */}
      <Modal
        animationType='fade'
        // visible={rewardsModalVisible}
        visible={rewardsModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setRewardsModalVisible(false)}
      >
        <RewardsScreen
          onClose={() => setRewardsModalVisible(false)}
          modalVisible={rewardsModalVisible}
          challengeBadge={challengeDetails.badges}
        />
      </Modal>
    </SafeAreaView>
  )
}

export default ChallengesDetailsScreen

const styles = StyleSheet.create({
  image: {
    alignItems: 'center', // Centers horizontally
  },
  shadowAndriod: {
    elevation: 15
  }
})