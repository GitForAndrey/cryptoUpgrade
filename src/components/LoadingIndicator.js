import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const LoadingIndicator = ({ indicatorSize = 'small' }) => {
  return (
    <View style={styles.indicator_container}>
      <ActivityIndicator size={indicatorSize} color={COLORS.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator_container: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginVertical: 10,
  },
});
