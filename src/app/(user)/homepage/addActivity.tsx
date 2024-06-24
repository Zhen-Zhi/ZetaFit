import { ImageBackground, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
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
  const [selectedItem, setSelectedItem] = useState('');
  
  return (
    <ImageBackground
      className='flex-1'
      source={require('@asset/images/background_image.png')}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='flex-1'>
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-between pt-3 pb-2 px-4 border-b border-slate-300'>
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

      <Text className='font-extrabold text-3xl mx-4 bg-white/50 mt-8'>Manual Entry</Text>

      <View className='p-4 bg-white/30 flex-1 gap-4'>
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
                selectedValue={selectedItem}
                onValueChange={setSelectedItem}
                placeholder="Select Unit"
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