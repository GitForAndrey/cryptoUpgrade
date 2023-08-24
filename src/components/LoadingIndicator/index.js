import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './style';

export const LoadingIndicator = () => {
  return (
    <View style={styles.indicator_container}>
      <ActivityIndicator size="small" color="#fff" />
    </View>
  );
};
