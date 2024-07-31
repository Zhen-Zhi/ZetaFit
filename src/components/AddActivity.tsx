import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image, FlatList, Animated, TouchableOpacity, Pressable, Dimensions, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import CustomPicker from '@/src/components/PickerComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { useActivityTypes, useInsertActivity } from '../api/activity';
import { Tables } from '../database.types';
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from 'expo-router';
import AnimatedModal from './AnimatedModal';
import { useUpdateUser } from '../api/users';


type AddActivityScreenModalProps = {
  energy: number;
  current_active_score: number;
  onClose : () => void;
}

const AnimatedButton = Animated.createAnimatedComponent(Pressable);
const ITEM_WIDTH = 200;
const SCREEN_WIDTH = Dimensions.get('window').width

const items = [
  { label: 'Kilometers', value: 'km' },
  { label: 'Meters', value: 'm' },
];

// const activityTypes: ActivityTypeProps[] = [
//   {
//     id: 1,
//     activity: 'Swimming',
//     image: require('@asset/images/swimming.png'),
//   },
//   {
//     id: 2,
//     activity: 'Running',
//     image: require('@asset/images/running.png'),
//   },
//   {
//     id: 3,
//     activity: 'Cycling',
//     image: require('@asset/images/running.png'), // Using the same image for cycling
//   },
//   {
//     id: 4,
//     activity: 'Hiking',
//     image: require('@asset/images/swimming.png'), // Using the same image for hiking
//   },
//   {
//     id: 5,
//     activity: 'Swimming',
//     image: require('@asset/images/swimming.png'),
//   },
//   {
//     id: 6,
//     activity: 'Running',
//     image: require('@asset/images/running.png'),
//   },
//   {
//     id: 7,
//     activity: 'Cycling',
//     image: require('@asset/images/running.png'), // Using the same image for cycling
//   },
//   {
//     id: 8,
//     activity: 'Hiking',
//     image: require('@asset/images/swimming.png'), // Using the same image for hiking
//   },
//   // // Add more dummy data as needed
// ];


const AddActivityScreenModal = ({ energy, current_active_score, onClose }: AddActivityScreenModalProps) => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const {
    data: activityTypes,
    error: activityTypesError,
    isLoading: activityTypesIsLoading,
  } = useActivityTypes()

  const { mutate: insertActivity } = useInsertActivity()
  const { mutate: updateUser } = useUpdateUser()
  
  const [title, setTitle] = useState('')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('Kilometers');
  const [selectedItem, setSelectedItem] = useState<Tables<'activity_type'> | null>(null)
  const [missingRequired, setMissingRequired] = useState(false);
  const [insertActivityLoading, setInsertActivityLoading] = useState(false)
  const [insertComplete, setInsertComplete] = useState(false);
  const [invalidDistance, setInvalidDistance] = useState(false);
  const [invalidDuration, setInvalidDuration] = useState(false);

  const flatListRef = useRef<FlatList<Tables<'activity_type'>>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(activityTypes) {
      setSelectedItem(activityTypes[0])
    }
  }, [activityTypes])

  if(!activityTypes) {
    console.log("Activity type not found!")
    return (
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='z-10 flex-row justify-between pt-3 pb-2 px-4 border-b border-slate-300'>
          <AnimatedPressable 
            pressInValue={0.9} 
            className='z-10'
            onPress={onClose}
          >
            {/* <View className='p-1'>
              <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
            </View> */}
          </AnimatedPressable>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-2xl font-extrabold'>Add Activity</Text>
          <AnimatedPressable pressInValue={0.9} className='z-10 h-0' onPress={() => {}} disabled>
            <View className='p-1'>
              <FontAwesome5 name="pencil-alt" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>
        <ActivityIndicator className='m-auto' size={86} color={themeColors.secondary} />
      </ImageBackground>
    )
  }
  
  const calculateCenterItem = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    scrollX.setValue(contentOffsetX);
    const centeredIndex = (contentOffsetX / ITEM_WIDTH);
    
    setSelectedItem(activityTypes[centeredIndex]);
  };

  const ActivityTypeSelector = ({ index, activity, activity_image }: { index: number, activity: string, activity_image: string | null }) => {
    const inputArray = [
      (index - 1) * ITEM_WIDTH,  // Start fading in
      index * ITEM_WIDTH,        // Fully visible
      (index + 1) * ITEM_WIDTH,  // Start fading out
    ]

    const opacity = scrollX.interpolate({
      inputRange: inputArray,
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp'
    })
    
    const scale = scrollX.interpolate({
      inputRange: inputArray,
      outputRange: [0.8, 1.0, 0.8],
      extrapolate: 'clamp'
    })
    
    return (
      <AnimatedButton 
        style={[{ width: ITEM_WIDTH, opacity}, { transform: [{ scale }] }]} 
        className='my-8 bg-white/50 rounded-lg border-0 items-center'
        onPress={() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: index * ITEM_WIDTH });
            scrollX.setValue(index * ITEM_WIDTH);
            setSelectedItem(activityTypes[index])
          }
        }}
      >
        <Image
          className='w-44 h-44'
          source={require("@asset/images/swimming.png")}
        />
        <Text style={{ color: themeColors.primary }} className='text-lg text-center font-bold'>{activity}</Text>
      </AnimatedButton>
    )
  };
  
  const handleAddActivity = () => {
    setInsertComplete(false)
    setMissingRequired(false)
    setInvalidDuration(false)
    setInvalidDistance(false)
    setInsertActivityLoading(true)
    if(title == '' || distance == '' || duration == '') {
      setMissingRequired(true)
      setInsertActivityLoading(false)
      return
    }

    if(!selectedItem) {
      setInsertActivityLoading(false)
      return
    }

    if(!/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(duration)) {
      setInvalidDuration(true)
      setInsertActivityLoading(false)
      return
    }

    if(!/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(distance)) {
      setInvalidDistance(true)
      setInsertActivityLoading(false)
      return
    }

    let distanceInMeter = 0;

    if(selectedUnit == "Kilometers") {
      distanceInMeter = parseFloat(distance) * 1000
    }
    else {
      distanceInMeter = parseFloat(distance)
    }

    let newEnergy = 0

    if(160 - energy < 40) {
      newEnergy = 160  
    } else {
      newEnergy = energy + 40
    }

    insertActivity(
      {
        activity_type_id: selectedItem?.id,
        activity_title: title,
        distance: distanceInMeter,
        duration: parseFloat(duration),
        activity_description: description, 
        user_id: session.user.id,
        active_score: 250
      }, 
      {
        onSuccess() {
          updateUser(
            {
              id: session.user.id,
              energy: newEnergy,
              active_score: current_active_score + 250
            }, 
            {
              onSuccess() {
                setTitle('')
                setDistance('')
                setDuration('')
                setDescription('')
                setInsertComplete(true)
                setTimeout(() => {
                  setInsertActivityLoading(false)
                }, 1000)
              },
              onError() {
                console.log("Error in updating")
              }
            }
          )
        }
      }
    )
  }

  return (
    <ImageBackground
      className='h-full'
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
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-2xl font-extrabold'>Add Activity</Text>
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
        <Text className='font-extrabold text-3xl mx-4 bg-white/50 mt-4'>Manual Entry</Text>
        <View className='flex-row'>
          <Animated.FlatList
            ref={flatListRef}
            horizontal
            data={activityTypes}
            renderItem={({ item, index }) => (
              <ActivityTypeSelector {...item} index={index} />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start" // padding added to make the start center
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX }}}],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={calculateCenterItem}
            snapToInterval={200}
          />
        </View>
        
        <View className='px-4 pb-4 bg-white/30 gap-4'>
          <View>
            <Text className='font-medium text-lg'>Title *</Text>
            <TextInput
              // placeholderTextColor={'black'}
              placeholder='Enter activity name'
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white'
              maxLength={30}
              onChangeText={setTitle}
              value={title}
            />
            { 
              missingRequired && title == ''
                &&
              <Text className='text-red-500 mx-1 font-medium'>Title is required</Text>
            }
          </View>
          
          <View className=''>
            <Text className='font-medium text-lg'>Distance *</Text>
            <View className='flex-row bg-white'>
              <TextInput
                keyboardType="numeric"
                className='flex-1 border border-slate-500 p-2 rounded-l-lg'
                onChangeText={setDistance}
                value={distance}
              />
              <View className='flex-1 border-y border-r rounded-r-lg border-slate-500'>
                <CustomPicker
                  data={items}
                  selectedUnit={selectedUnit}
                  onValueChange={setSelectedUnit}
                  placeholder={selectedUnit}
                />
              </View>
            </View>
            { 
              missingRequired && distance == ''
                &&
              <Text className='text-red-500 mx-1 font-medium'>Distance is required</Text>
            }
            {
              invalidDistance &&
              <Text className='text-red-500 mx-1 font-medium'>Distance must be a number</Text>
            }
          </View>

          <View>
            <Text className='font-bold text-lg'>Duration (min) *</Text>
            <TextInput
              placeholder='Enter activity name'
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white'
              onChangeText={setDuration}
              value={duration}
              keyboardType="numeric"
            />
            { 
              missingRequired && duration == ''
                &&
              <Text className='text-red-500 mx-1 font-medium'>Duration is required</Text>
            }
            {
              invalidDuration &&
              <Text className='text-red-500 mx-1 font-medium'>Duration must be a number</Text>
            }
          </View>
          
          <View>
            <Text className='font-medium text-lg'>Activity Descriptions</Text>
            <TextInput
              multiline
              numberOfLines={5}
              placeholder='Enter activity name'
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white h-28'
              onChangeText={setDescription}
              value={description}
            />
          </View>
        </View>
          <AnimatedPressable
            style={{ backgroundColor: (
              title == '' || distance == '' || duration == ''
            ) 
              ? themeColors.disabled 
              : themeColors.secondary 
            }}
            className='p-2 rounded-lg mx-auto mt-4 mb-16'
            pressInValue={0.98}
            disabled={(
              title == '' || distance == '' || duration == ''
            )}
            onPress={handleAddActivity}
          >
            <Text className='font-bold text-lg text-white text-center mx-16'>Add Record</Text>
          </AnimatedPressable>
        <View className='flex-1' />
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType='fade'
        visible={insertActivityLoading}
        presentationStyle='overFullScreen'
        transparent={true}
      >
        <AnimatedModal modalVisible={insertActivityLoading} onClose={() => {}}>
          <View className='p-4'>
            <Text style={{ color: themeColors.secondary }} className='font-extrabold text-2xl'>Adding Activity</Text>
            {
              insertComplete
                ?
              <View className='mx-auto mt-6'>
                <Feather name="check-circle" size={108} color={themeColors.tetiary} />
                <Text className='text-center font-bold text-lg' style={{ color: themeColors.secondary }} >Done</Text>
              </View>
                :
              <ActivityIndicator className='mt-8' size={72} color={themeColors.tetiary} />
            }
            <View className='flex-row justify-around mt-6'>
              <Text style={{ color: themeColors.secondary }} className='font-bold text-lg'>Well Done! Keep It Up.</Text>
            </View>
          </View>
        </AnimatedModal>
      </Modal>
    </ImageBackground>
  )
}

export default AddActivityScreenModal

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