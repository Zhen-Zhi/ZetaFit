import { StyleSheet, Pressable, Animated } from 'react-native'
import React, { ReactNode, forwardRef, useRef } from 'react'
import { StyleProps } from 'react-native-reanimated';

// to create a animated component
const AnimatedButton = Animated.createAnimatedComponent(Pressable);

type AnimatedPressableProps = {
  onPress?: () => any;
  onLongPress?: () => void | string | null | Promise<void>;
  onPressOut?: () => void | string | null | Promise<void>;
  style?: StyleProps;
  className?: string;
  pressInValue: number;
  children?: ReactNode;
  disabled?: boolean;
  delayLongPress?: number;
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
    if (props.onPressOut) {
      props.onPressOut();
    }

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
      onLongPress={props.onLongPress}
      delayLongPress={props.delayLongPress ?? 500}
      style={[props.style, { transform: [{ scale: animatedValue}] }]}
      className={props.className}
      disabled={props.disabled}
    >
      {props.children}
    </AnimatedButton>
  )
})

export default AnimatedPressable

const styles = StyleSheet.create({});