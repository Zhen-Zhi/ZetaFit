/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// default
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// colors that is used
export const themeColors = {
  primary: '#053b50',
  secondary: '#176b87',
  tetiary: '#64ccc5',
  backgroundColor: '#f5f5f5',
  danger: '#dc2626',
  disabled: '#bfbfbf'
}

export const difficultiesColors = {
  beginner: '#34c834',
  intermediate: '#FFCC66',
  expert: '#FF6666',
  beginner_darker: '#1f8c1f',
  intermediate_darker: '#ed9b2d',
  expert_darker: '#FF3333',
}