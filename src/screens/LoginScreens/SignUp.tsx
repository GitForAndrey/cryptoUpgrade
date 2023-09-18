import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GLOB_STYLE } from '../../constants';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  selectLoading,
  userRegistration,
} from '../../redux/features/authSlice';
import { FormButton } from '../../components/FormButton';
import { InputField } from '../../components/FormikInputField';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const validationSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const SignUpScreen:FunctionComponent = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [showPassword, setShowPassword] = useState(true);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => dispatch(userRegistration(values)).then(()=>navigation.navigate('SignIn'))}>
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
              iconName="chatbox-ellipses-outline"
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              errorText={touched.name && errors.name}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <InputField
              iconName="mail-outline"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorText={touched.email && errors.email}
              keyboardType="visible-password"
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
            <FormButton
              title="Sign Up"
              handleSubmit={handleSubmit}
              loadingStatus={loading}
            />
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOB_STYLE.screenContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
