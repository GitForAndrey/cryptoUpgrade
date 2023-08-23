import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';

export const HeaderTextLeft = ({ userName }) => {
  return (
    <View>
      <Text style={styles.textHome}>Hello, {userName}!</Text>
      <Text style={styles.textHome}>Wellcome to CryptoApp</Text>
    </View>
  );
};
