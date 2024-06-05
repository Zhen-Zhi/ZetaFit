import { Stack, Tabs, withLayoutContext } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIcon } from '@components/navigation/TabBarIcon';
import { themeColors } from '@/src/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Keyboard } from 'react-native';

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
          iconName = 'shield'
        }

        return (
          <FontAwesome 
            name={iconName as keyof typeof FontAwesome.glyphMap} 
            size={26} 
            color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'}
          />
        )
      },
      tabBarPressColor: 'transparent',
      tabBarLabelStyle: {
        fontWeight: 700
      },
      tabBarStyle: {
        height: 65,
        padding: 6,
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.8)',
        display: isKeyboardVisible ? 'none' : 'flex',
      },
      tabBarIconStyle: {
        height: 25,
      },
      tabBarItemStyle: {
        height: 50,
      },
      tabBarActiveTintColor: themeColors.secondary,
      tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
      tabBarIndicatorStyle: { top: 0, backgroundColor: themeColors.secondary },
    })} >
      <Stack.Screen name='homepage' options={{ title: 'Home' }} />
      <Stack.Screen name='clan' options={{ title: 'Clan' }} />
    </BottomTabs>
  );
}