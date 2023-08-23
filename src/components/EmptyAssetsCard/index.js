import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export const EmptyAssetsCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Search')}>
      <Text style={styles.text}>Add coin to assets!</Text>
      <Ionicons
        name={'add-circle-outline'}
        size={34}
        color={COLORS.lightGray}
      />
    </TouchableOpacity>
  );
};
