/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const clusterColors = {
    clusterBlue: '#7c98B3',
    clusterGray: '#637081',
    clusterYellow: '#EFA00B',
    clusterWhite: '#FFF4E4',
    clusterBlack: '#01161E'
  }

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

  clusterDark: {
    text: clusterColors.clusterWhite,
    background: clusterColors.clusterBlack,
    accent: clusterColors.clusterYellow, 
    secondaryBackground: clusterColors.clusterGray,
    secondaryText: clusterColors.clusterBlue  
  },

  clusterLight: {
    text: clusterColors.clusterBlue,
    background: clusterColors.clusterWhite,
    accent: clusterColors.clusterYellow,
    secondaryBackground: clusterColors.clusterGray,
    secondaryText: clusterColors.clusterBlack
  }
};

export const ThemedStyles = (theme) => {
  return ( new StyleSheet({
    title: {
      fontSize: 32,
      fontWeight: 'bold', 
      color: theme.text
    },
    defaultText: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.text
    },
    defaultAccent: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      color: theme.accent 
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.secondaryText
    },
    defaultView: {
      backgroundColor: theme.background
    },
    secondaryView: {
      backgroundColor: theme.secondaryBackground
    } 
  }));

  
};
