import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image, FlatList, Animated, TouchableOpacity, Pressable, Dimensions, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors';
import { Entypo, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import CustomPicker from '@/src/components/PickerComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { useActivityTypes, useInsertActivity } from '../api/activity';
import { Tables } from '../database.types';
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from 'expo-router';
import AnimatedModal from './AnimatedModal';
import { useUpdateUser } from '../api/users';


type ActivityDetailsScreenModalProps = {
  activity: Tables<'user_activities'>;
  onClose : () => void;
}

const AnimatedButton = Animated.createAnimatedComponent(Pressable);
const ITEM_WIDTH = 200;
const SCREEN_WIDTH = Dimensions.get('window').width

const items = [
  { label: 'Kilometers', value: 'km' },
  { label: 'Meters', value: 'm' },
];

const ActivityDetailsScreenModal = ({ activity, onClose }: ActivityDetailsScreenModalProps) => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const {
    data: activityTypes,
    error: activityTypesError,
    isLoading: activityTypesIsLoading,
  } = useActivityTypes()

  const selectedActivity = activityTypes?.find((activityType) => activityType.id == activity.activity_type_id)
  
  const [selectedUnit, setSelectedUnit] = useState('Meters');

  useEffect(() => {
    if(
      activity.distance 
      && activity.distance >= 1000 
      && selectedActivity?.activity == "Running"
    ) 
    {
      console.log("Set running kilometer")
      setSelectedUnit("Kilometers")
    } else if(
      activity.distance
      && activity.distance >= 10000
      && selectedActivity?.activity == "Swimming"
    )
    {
      setSelectedUnit("Kilometers")
    }
  }, [activity])

  if(!activityTypes) {
    console.log("Activity type not found!")
    return <ActivityIndicator />
  }
  
  // const calculateCenterItem = (event: any) => {
  //   const contentOffsetX = event.nativeEvent.contentOffset.x;
  //   scrollX.setValue(contentOffsetX);
  //   const centeredIndex = (contentOffsetX / ITEM_WIDTH);
    
  //   setSelectedItem(activityTypes[centeredIndex]);
  // };

  const ActivityTypeSelector = ({ activity, activity_image }: { activity: string | null | undefined, activity_image: string | null | undefined }) => {
    if(!activity) {
      console.log("Activity not provided. Debug in '/component/ActivityDetails'")
      return
    }

    return (
      <View
        className='my-8 mx-auto bg-white/50 rounded-lg border-0 items-center'
      >
        <Image
          className='w-44 h-44'
          source={require("@asset/images/swimming.png")}
        />
        <Text style={{ color: themeColors.primary }} className='text-lg text-center font-bold'>{activity}</Text>
      </View>
    )
  };

  return (
    <ImageBackground
      className='flex-1'
      source={require('@asset/images/background_image.png')}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1'>
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='z-10 flex-row justify-between pt-3 pb-2 px-4 border-b border-slate-300'>
          <AnimatedPressable 
            pressInValue={0.9} 
            className='z-10'
            onPress={onClose}
          >
            <View className='p-1'>
              <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-2xl font-extrabold'>{activity.activity_title}</Text>
          <AnimatedPressable pressInValue={0.9} className='z-10 h-0' onPress={() => {}} disabled>
            <View className='p-1'>
              <FontAwesome5 name="pencil-alt" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>

      <KeyboardAvoidingView 
        className='flex-1 justify-end' 
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        behavior={'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
        <View className='flex-row'>
          <ActivityTypeSelector activity={selectedActivity?.activity} activity_image={selectedActivity?.activity_image} />
        </View>
        
        <View className='px-4 pb-4 bg-white/30 gap-4'>
          <View>
            <Text className='font-medium text-lg'>Title *</Text>
            <Text
              className='p-3 border rounded-lg border-slate-500 mt-1 bg-white font-bold'
            >{activity.activity_title}</Text>
          </View>
          
          <View className=''>
            <Text className='font-medium text-lg'>Distance *</Text>
            <View className='flex-row bg-white'>
              <Text
                className='flex-1 border border-slate-500 p-3 rounded-l-lg font-bold'
              >
                {
                  selectedUnit == "Kilometers"
                    ?
                  (activity.distance ?? 0) / 1000
                    :
                  activity.distance
                }
              </Text>
              <View className='flex-1 border-y border-r rounded-r-lg border-slate-500'>
              <View className='flex-1'>
                <View className='bg-slate-200 rounded-r-lg flex-1 flex-row justify-center'>
                  <Text className='font-bold text-lg text-center my-auto'>{selectedUnit}</Text>
                </View>
              </View>
              </View>
            </View>
          </View>

          <View>
            <Text className='font-bold text-lg'>Duration *</Text>
            <Text
              className='border p-3 rounded-lg border-slate-500 mt-1 bg-white font-bold'
            >{activity.duration}</Text>
          </View>
          
          <View>
            <Text className='font-medium text-lg'>Activity Descriptions</Text>
            <TextInput
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white h-28 font-bold'
              value={activity.activity_description ?? ''}
              editable={false}
            />
          </View>
        </View>
        <View className='flex-1' />
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default ActivityDetailsScreenModal

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    borderColor: themeColors.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})