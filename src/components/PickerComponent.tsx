import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import AnimatedModal from './AnimatedModal';

type CustomPickerProps = {
  data: any;
  selectedUnit: string;
  onValueChange: React.Dispatch<React.SetStateAction<string>>; 
  placeholder: string
}

const CustomPicker = ({ data, selectedUnit, onValueChange, placeholder }: CustomPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSelectedValue, setModalSelectedValue] = useState(selectedUnit);

  const handleValueChange = (newUnit: string) => {
    setModalSelectedValue(newUnit)
    onValueChange(modalSelectedValue);
    setTimeout(() => {
      setModalVisible(false);
    }, 150)
    
  };

  return (
    <View className='flex-1'>
      <Pressable className='bg-slate-200 rounded-r-lg flex-1 flex-row justify-center' onPress={() => setModalVisible(true)}>
        <Text className='font-bold text-lg text-center my-auto'>{modalSelectedValue || placeholder}</Text>
        <View className='my-auto ml-3'>
          <Entypo name="triangle-down" size={24} color="black" />
        </View>
      </Pressable>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AnimatedModal
          onClose={() => setModalVisible(false)}
        >
          <ImageBackground className='p-4' source={require('@asset/images/background_image.png')}>
          <Text className='font-bold text-lg mb-4'>Select distance unit</Text>
          <FlatList
            data={data}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <AnimatedPressable
                className={`border rounded-lg my-1 bg-white ${ item.label == modalSelectedValue ? 'border-4 border-teal-500' : 'border-slate-500' }`}
                pressInValue={0.98}
                style={styles.item}
                onPress={() => handleValueChange(item.label)}
              >
                <Text className='font-bold text-lg text-center'>
                  {item.label}
                </Text>
              </AnimatedPressable>
            )}
          />
          </ImageBackground>
        </AnimatedModal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#DDD',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  selectedItem: {
    fontWeight: 'bold',
    color: 'red',
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
});

export default CustomPicker;
