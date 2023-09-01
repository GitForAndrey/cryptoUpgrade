import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants';
import { saveAssetsFirebase } from '../redux/features/assetsSlice';
import { FormButton } from './FormButton';

export const AssetsCoinAdd = ({ coin, isAssets }) => {
  const dispatch = useDispatch();
  const [isOpen, onSetIsOpen] = useState(false);
  const [coinPriceInput, setCoinPriceInput] = useState(`${coin.current_price}`);
  const [quantityInput, setQuantityInput] = useState('');

  const handleAddAsset = () => {
    if (coinPriceInput && quantityInput) {
      dispatch(saveAssetsFirebase({ coinPriceInput, quantityInput, coin }));
    }
  };

  let openAssetBlock = () => {
    onSetIsOpen(!isOpen);
  };
  return (
    <View>
      {isAssets !== false ? (
        <View style={styles.container}>
          <Text style={styles.text}>Coin in your wallet</Text>
          <View>
            <Text style={styles.text}>
              {isAssets} {coin.symbol}
            </Text>

            <Text style={styles.text}>
              ${(coin.current_price * isAssets).toFixed(2)}
            </Text>
          </View>
        </View>
      ) : isOpen ? (
        <View style={styles.addAssetBorder}>
          <Text style={styles.inputText}>Coin price (usd)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={coinPriceInput}
              placeholderTextColor={COLORS.lightGray}
              onChangeText={value => setCoinPriceInput(value)}
              style={styles.inputField}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.inputText}>Quantity</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={quantityInput}
              placeholderTextColor={COLORS.lightGray}
              onChangeText={value => setQuantityInput(value)}
              keyboardType="numeric"
              style={styles.inputField}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <FormButton title={'Add'} handleSubmit={handleAddAsset} />
        </View>
      ) : (
        <FormButton title={'Add to wallet'} handleSubmit={openAssetBlock} />
      )}
    </View>
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
    borderRadius: 12,
  },
  inputField: {
    flex: 1,
    color: COLORS.lightGray,
    fontSize: 15,
  },
  inputText: {
    color: COLORS.white,
    fontSize: 16,
  },
  addAssetBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
