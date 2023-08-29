// InputField.js
import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { COLORS } from '../../constants';

export const InputField = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  showPassword,
  toggleShowPassword,
  errorText,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  secondIcon,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name={iconName}
        size={24}
        color={COLORS.white}
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        placeholderTextColor={COLORS.tabBottomGray}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
      {secondIcon && (
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.iconContainer}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>
      )}
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};
