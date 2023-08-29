import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    height: 75,
    marginBottom: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.transparentLightGray,
    overflow: 'hidden',
  },
  coinColor: {
    width: 12,
    height: '100%',
    position: 'absolute',
    left: 0,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '30%',
    flexShrink: 1,
    marginLeft: 10,
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
    fontSize: SIZES.body3,
  },
  coinStats: {
    alignItems: 'flex-end',
  },
  coinQuantity: {
    ...FONTS.textBold,
    fontSize: SIZES.body3,
  },
  coinSumPrice: {
    ...FONTS.textLight,
  },
});
