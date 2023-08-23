import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 12,
    zIndex: 10,
    marginRight: 15,
  },
});
