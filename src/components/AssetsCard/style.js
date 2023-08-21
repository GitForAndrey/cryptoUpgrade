import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SIZES.width * 0.35,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 20,
    height: 165,
    marginRight: 15,
    padding: 10,
    overflow: 'hidden',
  },
  coinInfo: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  coinImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  coinName: {
    ...FONTS.textRegular,
    fontSize: 14,
    color: COLORS.lightGray,
  },
  coinSymbol: {
    textTransform: 'uppercase',
    ...FONTS.textBold,
    fontSize: 14,
  },
  coinStats: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  coinPrice: {
    ...FONTS.textBold,
    fontSize: 15,
    marginBottom: 5,
  },
  coinChangeGreen: {
    fontWeight: 'bold',
    color: COLORS.chartColorGreen,
  },
  coinChangeRed: {
    fontWeight: 'bold',
    color: COLORS.chartColorRed,
  },
});
