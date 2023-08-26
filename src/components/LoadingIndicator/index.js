import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './style';

export const LoadingIndicator = ({ indicatorSize = 'small' }) => {
  return (
    <View style={styles.indicator_container}>
      <ActivityIndicator size={indicatorSize} color="#fff" />
    </View>
  );
};
