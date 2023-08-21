import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 12,
  },
  inputField: {
    flex: 1,
    color: COLORS.lightGray,
    fontSize: 15,
  },
  inputText: {
    color: COLORS.white,
    fontSize: 16,
  },
  addAssetBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
