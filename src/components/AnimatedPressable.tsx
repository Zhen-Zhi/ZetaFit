import { StyleSheet, Pressable, Animated } from 'react-native'
import React, { ReactNode, forwardRef, useRef } from 'react'
import { StyleProps } from 'react-native-reanimated';

// to create a animated component
const AnimatedButton = Animated.createAnimatedComponent(Pressable);

type AnimatedPressableProps = {
  onPress?: () => void | null;
  style?: StyleProps;
  className?: string;
  pressInValue: number;
  children?: ReactNode;
}

const AnimatedPressable = forwardRef<typeof Pressable, AnimatedPressableProps>((props, ref) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      speed: 100,
      toValue: props.pressInValue,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      speed: 100,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={props.onPress}
      style={[props.style, { transform: [{ scale: animatedValue}] }]}
      className={props.className}
    >
      {props.children}
    </AnimatedButton>
  )
})

export default AnimatedPressable

const styles = StyleSheet.create({});