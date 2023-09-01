import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS, SIZES } from '../constants';

export const ContentTitle = ({ title, style }) => {
  return <Text style={[styles.text_content, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  text_content: {
    marginVertical: 10,
    ...FONTS.textRegular,
    fontSize: SIZES.body3,
    paddingHorizontal: 15,
  },
});
