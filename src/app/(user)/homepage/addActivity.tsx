import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image, FlatList, Animated, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import CustomPicker from '@/src/components/PickerComponent';

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

type AddActivityScreenModalProps = {
  onClose : () => void;
}

type ActivityTypeProps = {
  id: number;
  activity: string;
  image: any;
}

type propsType = {
  props: ActivityTypeProps;
}

const items = [
  { label: 'Kilometers', value: 'km' },
  { label: 'Meters', value: 'm' },
];

const activityType: ActivityTypeProps[] = [
  {
    id: 1,
    activity: 'Swimming',
    image: require('@asset/images/swimming.png'),
  },
  {
    id: 2,
    activity: 'Running',
    image: require('@asset/images/running.png'),
  },
  {
    id: 3,
    activity: 'Cycling',
    image: require('@asset/images/running.png'), // Using the same image for cycling
  },
  {
    id: 4,
    activity: 'Hiking',
    image: require('@asset/images/swimming.png'), // Using the same image for hiking
  },
  {
    id: 5,
    activity: 'Swimming',
    image: require('@asset/images/swimming.png'),
  },
  {
    id: 6,
    activity: 'Running',
    image: require('@asset/images/running.png'),
  },
  {
    id: 7,
    activity: 'Cycling',
    image: require('@asset/images/running.png'), // Using the same image for cycling
  },
  {
    id: 8,
    activity: 'Hiking',
    image: require('@asset/images/swimming.png'), // Using the same image for hiking
  },
  // Add more dummy data as needed
];

const ITEM_WIDTH = 200;

// const ActivityTypeSelector = ({ props }: propsType) => {
//   const {id, activity, image} = props;

//   return (
//     <Pressable style={{ width: ITEM_WIDTH }} className='my-8 bg-white/50 rounded-lg border-0 items-center'>
//       <Image
//         className='w-44 h-44'
//         source={image}
//       />
//       <Text style={{ color: themeColors.primary }} className='text-lg text-center font-bold'>{activity}</Text>
//     </Pressable>
//   )
// }

const ActivityTypeSelector = ({ activity, image, index, scrollX }: { activity: string; image: any; index: number; scrollX: Animated.Value }) => {
  // Interpolate opacity and scale based on scrollX value
  const opacity = scrollX.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const scale = scrollX.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <AnimatedButton style={{ width: ITEM_WIDTH, opacity, transform: [{ scale }] }} className='my-8 bg-white/50 rounded-lg border-0 items-center'>
      <Image
        className='w-44 h-44'
        source={image}
      />
      <Text style={{ color: themeColors.primary }} className='text-lg text-center font-bold'>{activity}</Text>
    </AnimatedButton>
  )
};

const AddActivityScreenModal = ({ onClose }: AddActivityScreenModalProps) => {
  const [selectedUnit, setSelectedUnit] = useState('Kilometers');
  const [selectedItem, setSelectedItem] = useState(activityType[0])

  console.log(selectedItem);
  

  const scrollX = useRef(new Animated.Value(0)).current;

  const calculateCenterItem = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const centeredIndex = Math.floor((contentOffsetX + ITEM_WIDTH / 2) / ITEM_WIDTH);
    
    activityType.forEach((item, index) => {
      console.log(centeredIndex + ' this is space ' + index)
      Animated.spring(scrollX, {
        toValue: centeredIndex == index ? 1 : 0,
        useNativeDriver: true,
      }).start();
    });

    setSelectedItem(activityType[centeredIndex]);
  };

  // const flatListRef = useRef<FlatList<ActivityTypeProps>>(null);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // console.log(currentIndex)

  // const scrollToNextItem = () => {
  //   if (flatListRef.current) {
  //     const nextIndex = currentIndex + 1;
  //     if (nextIndex < activityType.length) {
  //       flatListRef.current.scrollToIndex({ index: nextIndex });
  //       setCurrentIndex(nextIndex);
  //     }
  //   }
  // };

  // const scrollToPreviousItem = () => {
  //   if (flatListRef.current) {
  //     const prevIndex = currentIndex - 1;
  //     if (prevIndex >= 0) {
  //       flatListRef.current.scrollToIndex({ index: prevIndex });
  //       setCurrentIndex(prevIndex);
  //     }
  //   }
  // };
  
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
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        behavior={'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
        <Text className='font-extrabold text-3xl mx-4 bg-white/50 mt-4'>Manual Entry</Text>
        <View className='flex-row'>
          {/* <FlatList
            data={activityType}
            renderItem={({ item }) => <ActivityTypeSelector props={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle= {{ gap: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            // ref={flatListRef}
          /> */}
          <Animated.FlatList
            horizontal
            data={activityType}
            renderItem={({ item, index }) => (
              // <ActivityTypeSelector props={item} />
              <ActivityTypeSelector {...item} index={index} scrollX={scrollX} />
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

        {/* <AnimatedPressable
          style={ currentIndex == 0 ? { opacity: 0.5 } : { opacity: 1 } }
          className='mx-1'
          pressInValue={0.9}
          onPress={scrollToPreviousItem}
          disabled={ currentIndex == 0 }
        >
          <View className='flex-row'>
            <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_left.png')} />
            <Text className='mx-2 font-medium'>Previous</Text>
          </View>
        </AnimatedPressable>

        <AnimatedPressable
          style={ currentIndex == activityType.length - 1 ? { opacity: 0.5 } : { opacity: 1 } }
          className='mx-1'
          pressInValue={0.9}
          onPress={scrollToNextItem}
          disabled={ currentIndex == activityType.length - 1 }
        >
          <View className='flex-row'>
            <Text className='mx-2 font-medium'>Next</Text>
            <Image className='h-4 w-2 my-auto' source={require('@asset/images/arrow_right.png')} />
          </View>
        </AnimatedPressable> */}
        
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
            className='p-2 rounded-lg mx-auto mt-4 mb-16'
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 100,
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