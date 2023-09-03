import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/mainStack';

export const AssetsCardEmpty: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamList, 'Search'>>();
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width * 0.35,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 165,
    marginLeft: 15,
    padding: 10,
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    ...FONTS.textRegular,
    marginBottom: 5,
  },
});
