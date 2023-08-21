import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

export const EmptyAssetsCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add coin to assets!</Text>
    </View>
  );
};
