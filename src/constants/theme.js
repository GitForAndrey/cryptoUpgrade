import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // colors
  mainBg: '#29293F',
  color2: '#2E2E4B',
  color3: '#454564',
  black: '#0A0914',
  white: '#FFF',
  orange: '#FF723A',
  orange1: '#FF9142',
  brown: '#A51511',
  blue: '#32258C',
  darkGray: '#575473',
  gray: '#7875A1',
  tabBottomGray: '#AAA2A4',
  lightGray: '#d3d3d3',
  transparentLightGray: 'rgba(69,69,100, 0.4)',
  transparentWhite: 'rgba(255,255,255, 0.45)',
  chartColorGreen: 'rgba(0,255,0, 0.8)',
  chartColorRed: 'rgba(255,0,0, 0.8)',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  textRegular: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 16,
    color: COLORS.white,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.body3,
    lineHeight: 16,
    color: COLORS.white,
  },
  textLight: {
    fontFamily: 'Roboto-Light',
    fontSize: SIZES.body4,
    lineHeight: 16,
    color: COLORS.white,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
