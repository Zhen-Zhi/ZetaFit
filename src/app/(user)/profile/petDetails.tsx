import { Dimensions, ImageBackground, StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import * as Progress from 'react-native-progress';

type PetDetailsScreenProps = {
  onClose : () => void;
}

const PetDetailsScreen = ({ onClose }: PetDetailsScreenProps) => {
  return (
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
        <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Turtle</Text>
        <AnimatedPressable 
          pressInValue={0.9}
          className='z-10 absolute left-3 top-2.5'
          onPress={onClose}
        >
          <View className='my-auto'>
            <FontAwesome5 name='arrow-left' size={27} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
      </View>

      <View className='p-4'>
        <Image
          className='w-56 h-56 mx-auto'
          source={require('@asset/images/pets/turtle.png')} 
        />

        <View className='flex-row mx-3 bg-white/50'>
          <View className='w-auto my-auto'>
            <Text className='text-lg text-center font-semibold'>LV 100</Text>
          </View>
          <View className='mt-4'>
            <Progress.Bar 
              className='ml-4'
              progress={0.2}
              height={12}
              width={Dimensions.get('window').width * 0.65}
              color={themeColors.tetiary}
              unfilledColor={themeColors.secondary}
              borderWidth={2}
              borderColor={themeColors.primary}
              borderRadius={4}
            />
            <Text className='ml-4 font-medium mt-0.5'>100/900</Text>
          </View>
        </View>
        <View className='mx-3'>
          <Text className='text-2xl text-left font-bold mt-2'>Attack</Text>

          {/* Attack Skill 1 */}
          <AnimatedPressable
            pressInValue={0.98}
            onPress={() => {}}
            className='mt-2 border-2 rounded-lg p-2 bg-white border-slate-400'
            disabled
          >
            <View className='flex-row'>
              <Image className='w-12 h-14' source={require('@asset/images/attack_icon.png')} />
              <View className='flex-col mx-4'>
                <Text className='text-xl font-extrabold'>Attack Name</Text>
                <View className='flex-row'>
                  <View className='flex-row mr-4'>
                    <View className='my-auto mr-1'>
                      <FontAwesome name="bomb" size={24} color="black" />
                    </View>
                    <Text className='font-semibold my-auto text-lg'>20</Text>
                  </View>
                  <View className='flex-row mr-4'>
                    <View className='my-auto mr-1'>
                      <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
                    </View>
                    <Text className='font-semibold my-auto text-lg'>20</Text>
                  </View>
                </View>
              </View>
            </View>
          </AnimatedPressable>

          {/* Attack Skill 2 */}
          <AnimatedPressable
            pressInValue={0.98}
            onPress={() => {}}
            className='mt-2 border-2 rounded-lg p-2 bg-white mb-1.5 border-slate-400'
            disabled
          >
            <View className='flex-row'>
              <Image className='w-12 h-14' source={require('@asset/images/skill_icon.png')} />
              <View className='flex-col mx-4'>
                <Text className='text-xl font-extrabold'>Attack Name</Text>
                <View className='flex-row'>
                  <View className='flex-row mr-4'>
                    <View className='my-auto mr-1'>
                      <FontAwesome name="bomb" size={24} color="black" />
                    </View>
                    <Text className='font-semibold my-auto text-lg'>20</Text>
                  </View>
                  <View className='flex-row mr-4'>
                    <View className='my-auto mr-1'>
                      <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
                    </View>
                    <Text className='font-semibold my-auto text-lg'>20</Text>
                  </View>
                </View>
              </View>
            </View>
          </AnimatedPressable>

          
          <Text className='text-2xl text-left font-bold mt-2'>Defense</Text>

          {/* Defense Skill */}
          <AnimatedPressable
            pressInValue={0.98}
            onPress={() => {}}
            className='mt-2 border-2 rounded-lg p-2 bg-white border-slate-400'
            disabled
          >
            <View className='flex-row'>
              <Image className='w-12 h-14' source={require('@asset/images/defense_icon.png')} />
              <View className='flex-col mx-4'>
                <Text className='text-xl font-extrabold'>Defense Skill</Text>
                <View className='flex-row'>
                  <View className='flex-row mr-4'>
                    <View className='my-auto mr-1'>
                      <FontAwesome name="plus" size={24} color={themeColors.tetiary} />
                    </View>
                    <Text className='font-semibold my-auto text-lg'>20</Text>
                  </View>
                  <View className='flex-row mr-4'>
                    <View className='my-auto mr-1'>
                      <FontAwesome6 name="bolt-lightning" size={24} color='orange' />
                    </View>
                    <Text className='font-semibold my-auto text-lg'>20</Text>
                  </View>
                </View>
              </View>
            </View>
          </AnimatedPressable>

        </View>
      </View>

      <View className='flex-1' />
      <View className='mb-2 mx-auto'>
        <Text className={`font-semibold ${Platform.OS == 'ios' && 'mb-4' }`}>ID: 10001</Text>
      </View>

    </ImageBackground>
  )
}

export default PetDetailsScreen

const styles = StyleSheet.create({})