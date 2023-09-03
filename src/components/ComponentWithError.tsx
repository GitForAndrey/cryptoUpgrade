import React,{FunctionComponent} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ComponentWithErrorProps {
  resetError:(()=> void)
}

export const ComponentWithError: FunctionComponent<ComponentWithErrorProps> = ({resetError}) => {
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
        onPress={() => resetError()}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mainBg,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: COLORS.white,
  },
  text: {
    fontSize: 14,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.color3,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.orange1,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 200,
  },
  buttonText: { color: COLORS.white },
});
