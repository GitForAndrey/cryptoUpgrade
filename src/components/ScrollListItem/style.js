import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainBg,
    borderRadius: 5,
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '30%',
    flexShrink: 1,
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  coinName: {
    ...FONTS.textRegular,
    color: COLORS.lightGray,
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
    fontWeight: 'bold',
    color: COLORS.chartColorGreen,
  },
  coinChangeRed: {
    fontWeight: 'bold',
    color: COLORS.chartColorRed,
  },
});
