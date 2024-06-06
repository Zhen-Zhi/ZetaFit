import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle, Image, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable';

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
  },
  {
    id: 7,
    image: require('@asset/images/clan_logo/clan_logo_7.png'),
  },
  {
    id: 8,
    image: require('@asset/images/clan_logo/clan_logo_8.png'),
  },
  {
    id: 9,
    image: require('@asset/images/clan_logo/clan_logo_9.png'),
  }
];

const ClanLogoListModal = ({ onClose }: ClanLogoListModalProps) => {
  return (
    <Pressable className='flex-1 bg-black/50' onPress={onClose}>
      <ImageBackground source={require('@asset/images/background_image.png')} >
      <View className='bg-white h-auto rounded-xl overflow-show m-10 my-auto'>
        <FlatList
          data={clanLogo}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
            <AnimatedPressable pressInValue={0.95}>
              <Image className='w-20 h-24' source={item.image} />
            </AnimatedPressable>
          }
          contentContainerStyle={{ margin: 5, gap: 10 }}
          columnWrapperStyle={{ gap: 10, justifyContent: 'center' }}
          numColumns={3}
        />
      </View>
      </ImageBackground>
    </Pressable>
    
  )
}

export default ClanLogoListModal

const styles = StyleSheet.create({})