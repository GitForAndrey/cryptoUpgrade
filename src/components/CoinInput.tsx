import React, { FunctionComponent} from 'react';
import { StyleSheet, TextInput,Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

interface CoinInputProps {
  title: string,
  value: string,
  handleOnPress: (data: string) => void,
}

export const CoinInput: FunctionComponent<CoinInputProps> = ({title, value, handleOnPress}) => {
  return (
  <>
    <Text style={styles.inputText}>{title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={value}
            placeholderTextColor={COLORS.lightGray}
            onChangeText={data => handleOnPress(data)}
            style={styles.inputField}
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
    </>
    );
};


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
  },
  inputField: {
    flex: 1,
    color: COLORS.lightGray,
    fontSize: 15,
  },
  inputText: {
    ...FONTS.textRegular,
  },
});
