import React,{ FunctionComponent} from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface LoadingIndicatorProps {
  indicatorSize?: 'large' | 'small',
}

export const LoadingIndicator:FunctionComponent<LoadingIndicatorProps> = ({ indicatorSize = 'small' }) => {
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
    marginVertical: 5,
    //marginVertical: 10,
  },
});
