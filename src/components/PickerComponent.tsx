import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Pressable } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import ScrollPicker from './Scroll';

const CustomPicker = ({ data, selectedValue, onValueChange, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);

  const handleValueChange = () => {
    onValueChange(localSelectedValue);
    setModalVisible(false);
  };

  return (
    <View className='flex-1'>
      <Pressable className='bg-slate-200 rounded-r-lg flex-1 flex-row justify-center' onPress={() => setModalVisible(true)}>
        <Text className='font-bold text-lg text-center my-auto'>{localSelectedValue || placeholder}</Text>
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
        <Pressable className='bg-black/50 justify-center items-center flex-1' onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <AnimatedPressable
                  pressInValue={0.98}
                  style={styles.item}
                  onPress={() => setLocalSelectedValue(item.label)}
                >
                  <Text className='font-bold text-lg text-center'>
                    {item.label}
                  </Text>
                </AnimatedPressable>
              )}
            />
          </View>
        </Pressable>
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
