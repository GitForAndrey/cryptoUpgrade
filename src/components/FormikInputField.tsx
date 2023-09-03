// InputField.js
import React, {FunctionComponent} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

interface InputFieldProps {
  iconName:string,
  placeholder:string,
  value:string,
  onChangeText: (text: string) => void,
  onBlur: (e: any) => void,
  secureTextEntry?:boolean,
  showPassword?:boolean,
  toggleShowPassword?: () => void,
  errorText?: string | undefined | false,
  keyboardType?: KeyboardTypeOptions | undefined,
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined,
  autoCorrect?:boolean,
  secondIcon?:boolean,
}

export const InputField:FunctionComponent<InputFieldProps> = ({
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

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.color3,
    borderRadius: SIZES.radius,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 18,
  },
  iconContainer: {
    padding: 10,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 10,
    ...FONTS.textRegular,
    color: COLORS.orange1,
  },
});
