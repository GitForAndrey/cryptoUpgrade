import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mainBg,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
  },
  text: {
    fontSize: 14,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.color3,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.orange1,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 200,
  },
  buttonText: { color: COLORS.white },
});
