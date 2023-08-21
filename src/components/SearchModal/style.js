import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export default StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.mainBg },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 15,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 12,
  },
  inputField: {
    flex: 1,
    color: COLORS.lightGray,
    fontSize: 17,
  },
});
