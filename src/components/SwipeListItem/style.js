import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  rightAction: {
    position: 'absolute',
    right: 0,
    borderRadius: 7,
    width: 75,
    backgroundColor: 'rgba(255,0,0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS.white,
  },
  text: {
    color: COLORS.white,
  },
});
