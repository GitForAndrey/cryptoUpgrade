import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width * 0.35,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 165,
    marginLeft: 15,
    padding: 10,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    ...FONTS.textRegular,
    marginBottom: 5,
  },
});
