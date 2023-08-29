import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.color3,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.orange1,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 180,
    marginBottom: 10,
  },
  buttonText: {
    ...FONTS.textRegular,
    fontSize: SIZES.button,
    textTransform: 'uppercase',
  },
});
