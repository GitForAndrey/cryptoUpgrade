import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  rightAction: {
    position: 'absolute',
    right: 0,
    borderRadius: SIZES.radius + 1,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.white,
  },
  text: {
    ...FONTS.textRegular,
  },
});
