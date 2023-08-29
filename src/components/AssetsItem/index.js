import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { Chart } from '../Chart';
import { COLORS } from '../../constants';
import styles from './style';

export const AssetsItem = ({ coin }) => {
  let valuePercent = (
    ((coin.current_price - coin.coinBuyPrice) / coin.coinBuyPrice) *
    100
  )?.toFixed(1);
  let percentage_24h = coin.price_change_percentage_24h
    ? coin.price_change_percentage_24h
    : 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => console.log('FavoritesCard')}
      style={styles.container}>
      <View
        style={{ ...styles.coinColor, backgroundColor: coin.fillColor }}></View>
      <View style={styles.coinInfo}>
        <Image source={{ uri: coin?.image }} style={styles.coinImage} />
        <View>
          <Text style={styles.coinSymbol}>{coin?.symbol}</Text>
          <Text style={styles.coinName} numberOfLines={1} ellipsizeMode="tail">
            {coin.name}
          </Text>
        </View>
      </View>
      {coin?.sparkline_in_7d && (
        <Chart
          data={coin?.sparkline_in_7d.price}
          lineColor={percentage_24h > 0 ? true : false}
        />
      )}
      <View style={styles.coinStats}>
        <Text style={styles.coinPrice}>{coin.quantity}</Text>

        <Text style={styles.coinSumPrice}>
          ${(coin.current_price * coin.quantity).toFixed(2)}
        </Text>
        <Text
          style={{
            color:
              valuePercent > 0 ? COLORS.chartColorGreen : COLORS.chartColorRed,
          }}>
          {valuePercent > 0 ? `+${valuePercent}%` : `${valuePercent}%`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
