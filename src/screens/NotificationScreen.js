import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#ccc', textAlign: 'center' }}>empty</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.mainBg },
});
