import React, { FunctionComponent } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GLOB_STYLE } from '../../constants';
import { Formik } from 'formik';
import * as yup from 'yup';
import { InputField } from '../../components/FormikInputField';
import { FormButton } from '../../components/FormButton';

const RestoreSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});
const handleOnSubmit = (values: any) => {
  console.log(values);
  //dispatch(userSignIn(values));
  //Keyboard.dismiss();
};


//restore password is not working now
export const RestorePasswordScreen:FunctionComponent = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RestoreSchema}
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
            <FormButton
              title="Restore password"
              handleSubmit={handleSubmit}
              //loadingStatus={loading}
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
