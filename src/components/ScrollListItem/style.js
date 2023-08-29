import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 55,
    marginBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '29%',
    flexShrink: 1,
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  coinName: {
    ...FONTS.textLight,
  },
  coinSymbol: {
    textTransform: 'uppercase',
    ...FONTS.textBold,
  },
  coinStats: {
    alignItems: 'flex-end',
  },
  coinPrice: {
    ...FONTS.textRegular,
    marginBottom: 5,
  },
  coinChangeGreen: {
    ...FONTS.textBold,
    color: COLORS.chartColorGreen,
  },
  coinChangeRed: {
    ...FONTS.textBold,
    color: COLORS.chartColorRed,
  },
});
