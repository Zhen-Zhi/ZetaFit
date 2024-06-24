import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import CustomPicker from '@/src/components/PickerComponent';

type AddActivityScreenModalProps = {
  onClose : () => void;
}

const items = [
  { label: 'Kilometers', value: 'km' },
  { label: 'Meters', value: 'm' },
];

const AddActivityScreenModal = ({ onClose }: AddActivityScreenModalProps) => {
  const [selectedUnit, setSelectedUnit] = useState('Kilometers');
  
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
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-2xl font-extrabold'>Add Activity</Text>
          <AnimatedPressable pressInValue={0.9} className='z-10 h-0' onPress={() => {}} disabled>
            <View className='p-1'>
              <FontAwesome5 name="pencil-alt" size={24} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>

      <KeyboardAvoidingView 
        className='flex-1 justify-end' 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
        <Text className='font-extrabold text-3xl mx-4 bg-white/50 mt-4'>Manual Entry</Text>
        <View className='mx-auto mt-4 p-4 bg-white/50 rounded-lg'>
          <FontAwesome5 name="swimmer" size={96} color={themeColors.secondary} />
          <Text style={{ color: themeColors.primary }} className='text-lg text-center font-bold'>Swimming</Text>
        </View>
        
        <View className='px-4 pb-4 bg-white/30 gap-4'>
          <View>
            <Text className='font-medium text-lg'>Title</Text>
            <TextInput
              placeholderTextColor={'black'}
              placeholder='Enter activity name'
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white'
            />
          </View>
          
          <View className=''>
            <Text className='font-medium text-lg'>Distance</Text>
            <View className='flex-row bg-white'>
              <TextInput
                className='flex-1 border p-2 rounded-l-lg'
              />
              <View className='flex-1 border-y border-r rounded-r-lg'>
                <CustomPicker
                  data={items}
                  selectedUnit={selectedUnit}
                  onValueChange={setSelectedUnit}
                  placeholder={selectedUnit}
                />
              </View>
            </View>
          </View>

          <View>
            <Text className='font-bold text-lg'>Duration</Text>
            <TextInput
              placeholder='Enter activity name'
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white'
            />
          </View>
          
          <View>
            <Text className='font-medium text-lg'>Activity Descriptions</Text>
            <TextInput
              multiline
              numberOfLines={5}
              placeholder='Enter activity name'
              className='border p-2 rounded-lg border-slate-500 mt-1 bg-white h-28'
            />
          </View>
        </View>
          <AnimatedPressable
            style={{ backgroundColor: themeColors.secondary }}
            className='p-2 rounded-lg mx-auto mt-4'
            pressInValue={0.98}
          >
            <Text className='font-bold text-lg text-white text-center mx-16'>Add Record</Text>
          </AnimatedPressable>
        <View className='flex-1' />
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default AddActivityScreenModal

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    borderColor: themeColors.primary,
  }
})