import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.transparentLightGray,
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  textContent: {
    alignSelf: 'flex-start',
    flexGrow: 2,
  },
  coinName: {
    ...FONTS.textRegular,
    fontSize: 16,
  },
  coinSymbol: {
    ...FONTS.textLight,
    color: COLORS.lightGray,
  },
});
