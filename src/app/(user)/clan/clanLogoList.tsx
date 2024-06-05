import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle, Image, FlatList } from 'react-native'
import React from 'react'

type ClanLogoListModalProps = {
  onClose: () => void;
}

const clanLogo = [
  {
    id: 1,
    image: require('@asset/images/clan_logo/clan_logo_1.png'),
  },
  {
    id: 2,
    image: require('@asset/images/clan_logo/clan_logo_2.png'),
  },
  {
    id: 3,
    image: require('@asset/images/clan_logo/clan_logo_3.png'),
  },
  {
    id: 4,
    image: require('@asset/images/clan_logo/clan_logo_4.png'),
  },
  {
    id: 5,
    image: require('@asset/images/clan_logo/clan_logo_5.png'),
  },
  {
    id: 6,
    image: require('@asset/images/clan_logo/clan_logo_6.png'),
  }
];

const ClanLogoListModal = ({ onClose }: ClanLogoListModalProps) => {
  return (
    <Pressable className='flex-1' onPress={onClose}>
      <View className='bg-white h-3/5 m-10 border my-auto'>
        <FlatList
          data={clanLogo}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Image className='w-20 h-24' source={item.image} />}
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={{ gap: 10, justifyContent: 'center' }}
          numColumns={3}
        />
      </View>
    </Pressable>
    
  )
}

export default ClanLogoListModal

const styles = StyleSheet.create({})