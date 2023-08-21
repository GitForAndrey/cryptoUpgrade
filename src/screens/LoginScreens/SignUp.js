import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  userRegistration,
} from '../../redux/features/authSlice';
import { FormBotton } from '../../components/FormBotton';

const validationSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => dispatch(userRegistration(values))}>
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
                name="chatbox-ellipses-outline"
                size={24}
                color={COLORS.lightGray}
                style={styles.icon}
              />
              <TextInput
                placeholder="Name"
                value={values.name}
                placeholderTextColor={COLORS.lightGray}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
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
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <FormBotton
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
    flex: 1,
    backgroundColor: COLORS.mainBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 10,
    color: COLORS.orange1,
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
});
