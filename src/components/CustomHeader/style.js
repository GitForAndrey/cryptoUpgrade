import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'COLORS.mainBg',
    paddingVertical: 16,
  },
  centerContent: {
    flexGrow: 2,
    zIndex: 5,
  },
  rightContent: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    zIndex: 10,
  },
  leftContent: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    zIndex: 10,
  },
  textHome: {
    ...FONTS.textLight,
  },
  textContent: {
    ...FONTS.textLight,
    fontSize: 19,
    lineHeight: 20,
    textAlign: 'center',
  },
  headerRightButton: {
    marginLeft: 10,
  },
});
