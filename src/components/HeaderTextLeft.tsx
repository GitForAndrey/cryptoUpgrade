import React, { FunctionComponent} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONTS } from '../constants';

interface HeaderTextLeftProps {
  userName: string,
}

export const HeaderTextLeft:FunctionComponent<HeaderTextLeftProps> = ({ userName }) => {
  return (
    <View>
      <Text style={styles.textHome}>Hello, {userName}!</Text>
      <Text style={styles.textHome}>Welcome to CryptoApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textHome: {
    ...FONTS.textLight,
  },
});
