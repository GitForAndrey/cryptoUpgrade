import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.color3,
    borderRadius: SIZES.radius,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 18,
  },
  iconContainer: {
    padding: 10,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 10,
    ...FONTS.textRegular,
    color: COLORS.orange1,
  },
});
