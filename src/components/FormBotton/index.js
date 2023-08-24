import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LoadingIndicator } from '../LoadingIndicator';
import styles from './style';

export const FormBotton = ({ title, handleSubmit, loadingStatus = false }) => {
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
