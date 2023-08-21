import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 20,
    height: 20,
    paddingHorizontal: 10,
    marginRight: 15,
  },
  text: {
    ...FONTS.textRegular,
    color: COLORS.tabBottomGray,
    fontSize: 13,
    lineHeight: 19,
  },
  activeContainer: {
    backgroundColor: COLORS.transparentWhite,
  },
  activeText: {
    color: COLORS.white,
  },
});
