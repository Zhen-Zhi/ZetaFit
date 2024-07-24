import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemberScreen from './clanMemberList';
import ClanDetailsScreen from './clanDetails';
import { themeColors } from '@/src/constants/Colors';
import { Tables } from '@/src/database.types';

type MemberScreenRouteParamList = {
  member: {
      clanId: number;
      clanDetails: Tables<'clans'>;
  };
  clanDetails: {
    clanDetails: Tables<'clans'>;
  }
};

type TabLayoutProps = {
  isClanMember: boolean;
  clanId: number;
  clanDetails: Tables<'clans'>;
}

const Tab = createMaterialTopTabNavigator<MemberScreenRouteParamList>();

const TabLayout = ({ isClanMember, clanId, clanDetails }: TabLayoutProps) => {

  return (
    <Tab.Navigator
      initialLayout={{ width: Dimensions.get('window').width }}
      style={{ width: '100%' }}
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
          fontWeight: '700',
          fontSize: 16,
        },
        tabBarStyle: {
          height: 45,
          backgroundColor: themeColors.secondary
        },
      }}
    >
      <Tab.Screen name="member" component={MemberScreen} initialParams={{ clanId: clanId, clanDetails: clanDetails }} options={{ tabBarLabel: 'Members' }} />
      <Tab.Screen name="clanDetails" component={ClanDetailsScreen} initialParams={{ clanDetails: clanDetails }} options={{ tabBarLabel: 'Details' }} />
    </Tab.Navigator>
  );
}

export default TabLayout;
