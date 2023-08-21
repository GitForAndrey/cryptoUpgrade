import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width * 0.35,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 20,
    height: 165,
    marginRight: 15,
    padding: 10,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    color: COLORS.lightGray,
    ...FONTS.textLight,
    marginBottom: 5,
  },
});
