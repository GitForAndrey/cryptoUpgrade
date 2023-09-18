import React, { FunctionComponent, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { saveAssetsFirebase } from '../redux/features/assetsSlice';
import { FormButton } from './FormButton';
import { Coin } from '../types/coinTypes';
import { CoinInput } from './CoinInput';
import { useAppDispatch } from '../redux/store';

interface AssetsCoinAddProps {
  coin: Coin,
  inAssets: number,
}

export const AssetsCoinAdd:FunctionComponent<AssetsCoinAddProps> = ({ coin, inAssets }) => {
  const dispatch = useAppDispatch();
  const [isOpen, onSetIsOpen] = useState(false);
  const [coinPriceInput, setCoinPriceInput] = useState(`${coin.current_price}` || '0');
  const [quantityInput, setQuantityInput] = useState('');

  const handleAddAsset = () => {

    if (coinPriceInput && quantityInput) {
      const parsedCoinPrice = parseFloat(coinPriceInput);
      const parsedQuantity = parseFloat(quantityInput);

      dispatch(saveAssetsFirebase({ parsedCoinPrice, parsedQuantity, coin }));
    }
  };

  const openAssetBlock = () => {
    onSetIsOpen(!isOpen);
  };

  return (
    <View>
      {inAssets ? (
        <View style={styles.container}>
          <Text style={styles.text}>Coin in your wallet</Text>
          <View>
            <Text style={styles.text}>
              {inAssets} {coin.symbol}
            </Text>

            <Text style={styles.text}>
              ${(coin.current_price * inAssets).toFixed(2)}
            </Text>
          </View>
        </View>
      ) : isOpen ? (
        <View style={styles.addAssetBorder}>
          <CoinInput title={'Coin price (usd)'} value={coinPriceInput} handleOnPress={setCoinPriceInput} />
          <CoinInput title={'Quantity'} value={quantityInput} handleOnPress={setQuantityInput} />
          <FormButton title={'Add'} handleSubmit={handleAddAsset} />
        </View>
      ) : (
        <FormButton title={'Add to wallet'} handleSubmit={openAssetBlock} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addAssetBorder: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
  },
});
