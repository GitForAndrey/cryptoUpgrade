import { TouchableOpacity, StyleSheet,StyleProp,ViewStyle } from 'react-native';
import React, {FunctionComponent} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../constants';

interface HeaderButtonProps {
  icon:string,
  style?:StyleProp<ViewStyle>,
  handleOnPress: (() => void | undefined),
}

export const HeaderButton: FunctionComponent<HeaderButtonProps> = ({ icon, style, handleOnPress }) => {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress()}
      style={[styles.container, style ]}>
      <Ionicons name={icon} size={26} color={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
