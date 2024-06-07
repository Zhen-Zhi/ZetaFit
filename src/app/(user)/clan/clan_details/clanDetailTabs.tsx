import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemberScreen from './clanMember';
import ClanTestingScreen from './clanDetails';
import { themeColors } from '@/src/constants/Colors';

const Tab = createMaterialTopTabNavigator();

const TabLayout = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent',}}
      screenOptions={{
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: themeColors.backgroundColor,
        tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
        tabBarIndicatorStyle: { backgroundColor: themeColors.tetiary, height: 45, borderRadius: 0 },
        tabBarLabelStyle: {
          fontWeight: 700,
          fontSize: 16
        },
        tabBarStyle: {
          height: 45,
          backgroundColor: themeColors.secondary
        },
      }}
    >
      <Tab.Screen name="member" component={MemberScreen} options={{ tabBarLabel: 'Members' }} />
      <Tab.Screen name="clanDetails" component={ClanTestingScreen} options={{ tabBarLabel: 'Details' }} />
    </Tab.Navigator>
  );
}

export default TabLayout;
