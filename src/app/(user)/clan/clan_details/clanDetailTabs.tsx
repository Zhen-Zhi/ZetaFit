import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemberScreen from './clanMemberList';
import ClanDetailsScreen from './clanDetails';
import { themeColors } from '@/src/constants/Colors';
import ClanActivityLogScreen from './clanActivityLog';
import { Tables } from '@/src/database.types';

type MemberScreenRouteParamList = {
  member: {
      clanId: number;
      clanDetails: Tables<'clans'>;
  };
  clanDetails: {
    clanDetails: Tables<'clans'>;
    haveClan: boolean;
  }
  clanActivityLog: undefined; // this is only the route
};

type TabLayoutProps = {
  haveClan: boolean;
  clanId: number;
  clanDetails: Tables<'clans'>;
}

const Tab = createMaterialTopTabNavigator<MemberScreenRouteParamList>();

const TabLayout = ({ haveClan, clanId, clanDetails }: TabLayoutProps) => {
  const [currentTab, setCurrentTab] = useState(haveClan ? 'clanActivityLog' : 'member');
  
  useEffect(() => {
    // Update the current tab based on the haveClan prop
    setCurrentTab(haveClan ? 'clanActivityLog' : 'member');
  }, [haveClan]);
  
  return (
    <Tab.Navigator
      initialRouteName={'clanActivityLog'}
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
      <Tab.Screen name="member" component={MemberScreen} initialParams={{ clanId: clanId, clanDetails: clanDetails }} options={{ tabBarLabel: 'Members' }} />
      <Tab.Screen name="clanDetails" component={ClanDetailsScreen} initialParams={{ clanDetails: clanDetails, haveClan: haveClan }} options={{ tabBarLabel: 'Details' }} />
    </Tab.Navigator>
  );
}

export default TabLayout;
