import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addActiveCoin } from '../../redux/features/coinSlice';
import { Chart } from '../Chart';
import styles from './style';

export const MarketItem = ({ coin }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressHandle = () => {
    navigation.navigate('Coin');
    dispatch(addActiveCoin(coin));
  };
  return (
    <TouchableOpacity
      onPress={() => onPressHandle()}
      style={styles.container}
      activeOpacity={1}>
      <View style={styles.coinInfo}>
        <Image source={{ uri: coin.image }} style={styles.coinImage} />
        <View>
          <Text style={styles.coinSymbol}>{coin.symbol}</Text>
          <Text style={styles.coinName} numberOfLines={1} ellipsizeMode="tail">
            {coin.name}
          </Text>
        </View>
      </View>
      {coin?.sparkline_in_7d && (
        <Chart
          data={coin?.sparkline_in_7d.price}
          lineColor={coin?.price_change_percentage_24h > 0 ? true : false}
        />
      )}
      <View style={styles.coinStats}>
        <Text
          style={
            coin.price_change_percentage_24h > 0
              ? styles.coinChangeGreen
              : styles.coinChangeRed
          }>
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </Text>

        <Text style={styles.coinPrice}>${coin.current_price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};
