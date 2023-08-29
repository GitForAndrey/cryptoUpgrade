import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

export const AssetsEmptyCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={() => navigation.navigate('Search')}>
      <Text style={styles.text}>Add coin to assets!</Text>
      <Ionicons name={'add-circle-outline'} size={34} color={COLORS.white} />
    </TouchableOpacity>
  );
};
