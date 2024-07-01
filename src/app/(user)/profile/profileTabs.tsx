import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { themeColors } from '@/src/constants/Colors';
import InventoryScreen from './inventory';

type TabLayoutProps = {
  haveClan: boolean;
}

const Tab = createMaterialTopTabNavigator();

const ProfileTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={'clanActivityLog'}
      sceneContainerStyle={{backgroundColor: 'transparent',}}
      screenOptions={{
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: themeColors.backgroundColor,
        tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
        tabBarIndicatorStyle: { 
          backgroundColor: themeColors.tetiary,
          height: 45,
          borderRadius: 0,
        },
        tabBarLabelStyle: {
          fontWeight: 700,
          fontSize: 16
        },
        tabBarStyle: {
          height: 45,
          backgroundColor: themeColors.secondary,
        },
      }}
    >
      {/* <Tab.Screen name="activityLog" component={ActivityLogScreen} options={{ tabBarLabel: 'Activity' }} /> */}
      <Tab.Screen name="inventory" component={InventoryScreen} options={{ tabBarLabel: 'Inventory' }} />
    </Tab.Navigator>
  );
}

export default ProfileTabs;
