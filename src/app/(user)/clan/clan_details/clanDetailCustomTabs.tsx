// import React, { useEffect, useState } from 'react';
// import { Animated, Dimensions, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
// import MemberScreen from './clanMemberList';
// import ClanDetailsScreen from './clanDetails';
// import { themeColors } from '@/src/constants/Colors';
// import { Tables } from '@/src/database.types';

// // type MemberScreenRouteParamList = {
// //   member: {
// //       clanId: number;
// //       clanDetails: Tables<'clans'>;
// //   };
// //   clanDetails: {
// //     clanDetails: Tables<'clans'>;
// //   }
// // };

// type TabLayoutProps = {
//   isClanMember: boolean;
//   clanId: number;
//   clanDetails: Tables<'clans'>;
// }

// const windowWidth = Dimensions.get('window').width;
// const TABS = ['Members', 'Details']; // Define your tabs
// const TABS_LENGTH = TABS.length;

// const CustomTabLayout = ({ isClanMember, clanId, clanDetails }: TabLayoutProps) => {
//   const [currentTab, setCurrentTab] = useState(isClanMember ? 1 : 0);
//   const tabWidth = windowWidth / TABS_LENGTH;
//   const indicatorX = new Animated.Value(currentTab * tabWidth);

//   useEffect(() => {
//     setCurrentTab(isClanMember ? 1 : 0);
//   }, [isClanMember]);

//   useEffect(() => {
//     Animated.spring(indicatorX, {
//       toValue: currentTab * tabWidth,
//       useNativeDriver: true,
//     }).start();
//   }, [currentTab]);

//   const handleTabPress = (index: number) => {
//     setCurrentTab(index);
//   };

//   const renderTabContent = () => {
//     switch (currentTab) {
//       case 0:
//         // return <MemberScreen clanId={clanId} clanDetails={clanDetails} />;
//       case 1:
//         // return <ClanDetailsScreen clanDetails={clanDetails} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabContainer}>
//         {TABS.map((tab, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.tab, { width: tabWidth }]}
//             onPress={() => handleTabPress(index)}
//           >
//             <Text>{tab}</Text>
//           </TouchableOpacity>
//         ))}
//         <Animated.View
//           style={[
//             styles.indicator,
//             {
//               width: tabWidth,
//               transform: [{ translateX: indicatorX }],
//             },
//           ]}
//         />
//       </View>
//       <View style={styles.contentContainer}>{renderTabContent()}</View>
//     </View>
//   )
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     height: 45,
//     backgroundColor: themeColors.secondary,
//   },
//   tab: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabLabel: {
//     fontWeight: '700',
//     fontSize: 16,
//     color: 'rgba(212, 212, 212, 0.8)',
//   },
//   activeTabLabel: {
//     color: themeColors.backgroundColor,
//   },
//   indicator: {
//     height: 4,
//     backgroundColor: themeColors.tetiary,
//     position: 'absolute',
//     bottom: 0,
//   },
//   contentContainer: {
//     flex: 1,
//   },
// });

// export default CustomTabLayout;