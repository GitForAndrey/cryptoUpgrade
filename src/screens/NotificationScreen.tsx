import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, GLOB_STYLE } from '../constants';

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text_empty}>empty</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { ...GLOB_STYLE.screenContainer },
  text_empty: { color: COLORS.white, textAlign: 'center' },
});
