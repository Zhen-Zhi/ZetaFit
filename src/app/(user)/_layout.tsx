import { Redirect, Stack, Tabs, withLayoutContext } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIcon } from '@components/navigation/TabBarIcon';
import { themeColors } from '@/src/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, Keyboard, Dimensions } from 'react-native';
import { useAuth } from '@/src/providers/AuthProvider';

const BottomTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function TabLayout() {
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

  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/(auth)/sign_in'} />;
  }

  return (
    <BottomTabs tabBarPosition='bottom' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconComponent

        if(route.name == 'homepage') {
          iconComponent = 
            <FontAwesome 
              name={'home'} 
              size={26} 
              color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'}
            />
            // <MaterialIcons name="pets" size={26} color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'} />
        }
        else if(route.name == 'clan') {
          iconComponent = 
            <FontAwesome 
              name={'shield'} 
              size={26} 
              color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'}
            />
        }
        else if(route.name == 'challenges') {
          iconComponent = 
            <FontAwesome 
              name={'trophy'} 
              size={26} 
              color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'}
            />
        }
        else if(route.name == 'pets') {
          iconComponent = 
            <MaterialIcons 
              name="pets" 
              size={26} 
              color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'} 
            />
        }
        else if(route.name == 'market') {
          iconComponent = 
            <Ionicons 
              name="storefront"
              size={26} 
              color={focused ? themeColors.secondary : 'rgba(212, 212, 212, 0.8)'}
            />
        }

        return (
          iconComponent
        )
      },
      tabBarPressColor: 'transparent',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 700
      },
      tabBarStyle: {
        height: 70,
        paddingTop: 6,
        borderTopWidth: 1,
        borderColor: 'rgba(189, 189, 189, 0.8)',
        display: isKeyboardVisible ? 'none' : 'flex',
      },
      tabBarIconStyle: {
        height: 25,
      },
      tabBarItemStyle: {
        height: 50,
        width: Dimensions.get('window').width / 5
      },
      tabBarActiveTintColor: themeColors.secondary,
      tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
      tabBarIndicatorStyle: { top: 0, backgroundColor: themeColors.secondary },
    })} >
      <Stack.Screen name='pets' options={{ title: 'Pets' }} />
      <Stack.Screen name='challenges' options={{ title: 'Trials' }} />
      <Stack.Screen name='homepage' options={{ title: 'Home' }} />
      <Stack.Screen name='clan' options={{ title: 'Clan' }} />
      <Stack.Screen name='market' options={{ title: 'Market' }} />
    </BottomTabs>
  );
}