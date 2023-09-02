import React,{FunctionComponent} from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { FONTS, SIZES } from '../constants';

interface ContentTitleProps {
  title:string,
  style?: StyleProp<TextStyle>,
}

export const ContentTitle: FunctionComponent<ContentTitleProps> = ({ title, style }) => {
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
