import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './style';
import { COLORS } from '../../constants';

export const LoadingIndicator = ({ indicatorSize = 'small' }) => {
  return (
    <View style={styles.indicator_container}>
      <ActivityIndicator size={indicatorSize} color={COLORS.white} />
    </View>
  );
};
