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
  chartColorGreen: 'rgba(0,255,0, 0.9)',
  chartColorRed: 'rgba(255,0,0, 0.9)',
  itemColorAdd: 'rgba(253,27,27,0.9)',
  itemColorDel: 'rgba(255,145,26,0.9)',
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
  button: 16,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  textRegular: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    color: COLORS.white,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.body3,
    color: COLORS.white,
  },
  textLight: {
    fontFamily: 'Roboto-Light',
    fontSize: SIZES.body4,
    color: COLORS.white,
  },
};

export const GLOB_STYLE = {
  headerBasic: {
    headerStyle: {
      backgroundColor: COLORS.mainBg,
    },
    headerTitleStyle: {
      ...FONTS.textRegular,
      fontSize: SIZES.body2,
    },
    headerTintColor: COLORS.white,
    headerShadowVisible: false,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
};

const appTheme = { COLORS, SIZES, FONTS, GLOB_STYLE };

export default appTheme;
