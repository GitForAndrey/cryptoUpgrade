import { TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { COLORS } from '../../constants';

export const HeaderButton = ({ icon, style, handleOnPress }) => {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress()}
      style={{ ...styles.container, ...style }}>
      <Ionicons name={icon} size={26} color={COLORS.lightGray} />
    </TouchableOpacity>
  );
};
