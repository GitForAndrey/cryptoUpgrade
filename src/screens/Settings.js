import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';

export const SettingsScreen = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch(logoutUser());
    } catch (error) {
      console.error('Failed to logout user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logout()} style={{}}>
        <Text style={styles.textContent}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.mainBg,
  },
  textContent: {
    marginVertical: 10,
    ...FONTS.textRegular,
  },
});
