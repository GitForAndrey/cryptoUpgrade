import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FONTS, GLOB_STYLE } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../redux/features/authSlice';
import { useAppDispatch } from '../redux/store';

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

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
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.textContent}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOB_STYLE.screenContainer,
  },
  textContent: {
    marginVertical: 10,
    ...FONTS.textRegular,
  },
});
