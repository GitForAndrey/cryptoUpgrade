import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { FormBotton } from '../../components/FormBotton';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, userSignIn } from '../../redux/features/authSlice';

const SignInSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const loading = useSelector(selectLoading);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleOnSubmit = values => {
    dispatch(userSignIn(values));
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
        onSubmit={values => handleOnSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={COLORS.lightGray}
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                value={values.email}
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={COLORS.lightGray}
                style={styles.icon}
              />
              <TextInput
                placeholder="Password"
                value={values.password}
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
                secureTextEntry={showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.iconContainer}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={COLORS.lightGray}
                />
              </TouchableOpacity>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('RestorePassword')}
              style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <FormBotton
              title="Sign In"
              handleSubmit={handleSubmit}
              loadingStatus={loading}
            />
          </>
        )}
      </Formik>
      <View style={styles.isHaveAccount}>
        <Text style={{ color: COLORS.lightGray }}>
          Don't have an account yet?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.forgotText}> Sign up.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  logoWrapper: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.color3,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.lightGray,
    fontSize: 16,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 10,
    color: COLORS.orange1,
  },
  iconContainer: {
    padding: 10,
  },

  forgot: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: COLORS.orange1,
    textDecorationLine: 'underline',
  },
  isHaveAccount: {
    flexDirection: 'row',
  },
});
