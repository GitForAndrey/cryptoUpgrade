import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { COLORS, FONTS, GLOB_STYLE } from '../../constants';
import { FormButton } from '../../components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, userSignIn } from '../../redux/features/authSlice';
import { InputField } from '../../components/FormikInputField';

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
            <InputField
              iconName="mail-outline"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorText={touched.email && errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <InputField
              iconName="lock-closed-outline"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={showPassword}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              errorText={touched.password && errors.password}
              autoCapitalize="none"
              autoCorrect={false}
              secondIcon={true}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('RestorePassword')}
              style={styles.forgot_button}>
              <Text style={styles.forgot_button_text}>Forgot Password?</Text>
            </TouchableOpacity>
            <FormButton
              title="Sign In"
              handleSubmit={handleSubmit}
              loadingStatus={loading}
            />
          </>
        )}
      </Formik>
      <View style={styles.underButton}>
        <Text style={styles.underButton_text}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.forgot_button_text}> Sign up.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOB_STYLE.screenContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  forgot_button: {
    alignSelf: 'flex-end',
  },
  forgot_button_text: {
    ...FONTS.textRegular,
    textDecorationLine: 'underline',
    color: COLORS.orange1,
  },
  underButton: {
    flexDirection: 'row',
  },
  underButton_text: {
    ...FONTS.textRegular,
  },
});
