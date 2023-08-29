import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import styles from './style';
import { Button, View, Text, TouchableOpacity } from 'react-native';

export const ComponentWithError = props => {
  return (
    <View style={styles.container}>
      <Icon name={'flower-outline'} size={38} color={COLORS.orange} />
      <Text style={styles.title}>Something went wrong...</Text>
      <Text style={styles.text}>
        The application uses free CoinGecko API V3, it is possible that you have
        reached the limit of requests, try using the application in a few
        minutes...
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.resetError()}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};
