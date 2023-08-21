import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import { Formik } from 'formik';
import * as yup from 'yup';

const RestoreSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const RestorePasswordScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RestoreSchema}
        onSubmit={values => console.log(values)}>
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Restore password</Text>
            </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.color3,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.white,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.color3,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.orange1,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 200,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 17,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 10,
    color: COLORS.orange1,
  },
});
