import { Stack, Tabs, withLayoutContext } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIcon } from '@components/navigation/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route } from 'expo-router/build/Route';
import { KeyboardState } from 'react-native-reanimated';

const BottomTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // keyboard detect is visible hook from expo go
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <BottomTabs tabBarPosition='bottom' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName

        if(route.name == 'homepage') {
          iconName = 'home'
        }
        else if(route.name == 'clan') {
          iconName = 'group'
        }

        return (
          <FontAwesome 
            name={iconName as keyof typeof FontAwesome.glyphMap} 
            size={24} 
            color={focused ? 'rgba(0, 111, 217, 0.8)' : 'rgba(212, 212, 212, 0.8)'}
          />
        )
      },
      tabBarPressColor: 'transparent',
      tabBarStyle: {
        height: 75,
        padding: 6,
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.8)',
        display: isKeyboardVisible ? 'none' : 'flex',
      },
      tabBarItemStyle: {
        height: 55,
      },
      tabBarActiveTintColor: 'rgba(0, 111, 217, 0.8)',
      tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
      tabBarIndicatorStyle: { top: 0 },
    })} >
      <Stack.Screen name='homepage' options={{ title: 'Home' }} />
      <Stack.Screen name='clan' options={{ title: 'Clan' }} />
    </BottomTabs>
  );
}