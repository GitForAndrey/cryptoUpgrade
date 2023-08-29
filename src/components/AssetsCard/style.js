import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SIZES.width * 0.35,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 165,
    marginRight: 15,
    padding: 10,
    overflow: 'hidden',
  },
  firstElement: {
    marginLeft: 15,
  },
  coinInfo: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    width: '95%',
  },
  coinImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
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
    alignItems: 'center',
    marginTop: 'auto',
  },
  coinPrice: {
    ...FONTS.textRegular,
    fontSize: 16,
    marginTop: 2,
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
