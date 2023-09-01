import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONTS } from '../constants';

export const HeaderTextLeft = ({ userName }) => {
  return (
    <View>
      <Text style={styles.textHome}>Hello, {userName}!</Text>
      <Text style={styles.textHome}>Wellcome to CryptoApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textHome: {
    ...FONTS.textLight,
  },
});
