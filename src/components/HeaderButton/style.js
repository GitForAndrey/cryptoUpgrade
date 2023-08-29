import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    zIndex: 10,
    marginRight: 15,
  },
});
