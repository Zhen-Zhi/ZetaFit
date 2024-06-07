import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle, Image, FlatList, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { themeColors } from '@/src/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';

type ClanLogoListModalProps = {
  onClose: () => void;
  onSelectLogo: (clanLogoSource: { id: number; image: any }) => void;
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
  },
  {
    id: 10,
    image: require('@asset/images/clan_logo/clan_logo_1.png'),
  },
  {
    id: 12,
    image: require('@asset/images/clan_logo/clan_logo_2.png'),
  },
  {
    id: 13,
    image: require('@asset/images/clan_logo/clan_logo_3.png'),
  },
  {
    id: 14,
    image: require('@asset/images/clan_logo/clan_logo_4.png'),
  },
  {
    id: 15,
    image: require('@asset/images/clan_logo/clan_logo_5.png'),
  },
  {
    id: 16,
    image: require('@asset/images/clan_logo/clan_logo_6.png'),
  },
  {
    id: 17,
    image: require('@asset/images/clan_logo/clan_logo_7.png'),
  },
  {
    id: 18,
    image: require('@asset/images/clan_logo/clan_logo_8.png'),
  },
  {
    id: 19,
    image: require('@asset/images/clan_logo/clan_logo_9.png'),
  },
  {
    id: 20,
    image: require('@asset/images/clan_logo/clan_logo_7.png'),
  },
  {
    id: 21,
    image: require('@asset/images/clan_logo/clan_logo_8.png'),
  },
  {
    id: 22,
    image: require('@asset/images/clan_logo/clan_logo_9.png'),
  }
];

const ClanLogoListModal = ({ onClose, onSelectLogo }: ClanLogoListModalProps) => {
  const [clanLogoId, setClanLogoId] = useState<number>(1)

  const passSelectedLogo = (clanLogo: { id: number; image: any }) => {
    setClanLogoId(clanLogo.id);
    onSelectLogo(clanLogo);
    onClose();
  }

  return (
    <Pressable className='flex-1 bg-black/50 py-32'>
      <ImageBackground 
        imageStyle={{ borderRadius: 20, padding: 20 }}
        className='h-auto m-auto' 
        source={require('@asset/images/background_image.png')}
      >
      <View className='h-auto rounded-xl overflow-show m-10 my-8'>
        <AnimatedPressable pressInValue={0.9} className='z-10 absolute'>
          <View>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-lg font-bold text-center mb-2'>Clan Logo</Text>
        
        <FlatList
          data={clanLogo}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
            <AnimatedPressable pressInValue={0.95}
              onPress={
                () => {passSelectedLogo(item)}
              }
            >
              <Image className='w-20 h-24' source={item.image} />
            </AnimatedPressable>
          }
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={{ gap: 20, justifyContent: 'center' }}
          numColumns={3}
          initialNumToRender={9}
        />
      </View>
      </ImageBackground>
    </Pressable>
  )
}

export default ClanLogoListModal

const styles = StyleSheet.create({})