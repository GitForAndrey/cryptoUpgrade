import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../constants';

export const FormButton = ({ title, handleSubmit, loadingStatus = false }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSubmit()}
        disabled={loadingStatus}>
        {loadingStatus ? (
          <LoadingIndicator />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.color3,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.orange1,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    marginTop: 20,
    minWidth: 180,
    marginBottom: 10,
  },
  buttonText: {
    ...FONTS.textRegular,
    fontSize: SIZES.button,
    textTransform: 'uppercase',
  },
});
