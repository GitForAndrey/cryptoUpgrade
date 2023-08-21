import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants';
import { addAssetsCoin } from '../../redux/features/assetsSlice';
import { FormBotton } from '../FormBotton';
import styles from './style';

export const AssetsAdd = ({ coin, isAssets }) => {
  const dispatch = useDispatch();
  const [isOpen, onSetIsOpen] = useState(false);
  const [coinPriceInput, setCoinPriceInput] = useState(`${coin.current_price}`);
  const [quantityInput, setQuantityInput] = useState('');

  const handleAddAsset = () => {
    if (coinPriceInput && quantityInput) {
      dispatch(addAssetsCoin(coinPriceInput, quantityInput, coin));
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
          <FormBotton title={'Add'} handleSubmit={handleAddAsset} />
        </View>
      ) : (
        <FormBotton title={'Add to wallet'} handleSubmit={openAssetBlock} />
      )}
    </View>
  );
};
