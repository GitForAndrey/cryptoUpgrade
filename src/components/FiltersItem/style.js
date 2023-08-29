import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 20,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  text: {
    ...FONTS.textRegular,
    color: COLORS.tabBottomGray,
  },
  activeContainer: {
    backgroundColor: COLORS.white,
  },
  activeText: {
    color: COLORS.mainBg,
  },
});
