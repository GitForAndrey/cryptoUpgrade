import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 70,
    marginBottom: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.mainBg,
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
    marginLeft: 10,
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
    ...FONTS.textBold,
  },
  coinSumPrice: {
    ...FONTS.textLight,
    color: COLORS.lightGray,
  },
});
