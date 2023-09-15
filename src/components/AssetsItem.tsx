import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Chart } from './Chart';
import { COLORS, FONTS, SIZES } from '../constants';
import { AssetsCoin } from '../types/coinTypes';


interface AssetsItemProps  {
  coin:AssetsCoin,
}

export const AssetsItem:FunctionComponent<AssetsItemProps> = ({ coin }) => {
  let valuePercent = (
    ((coin.current_price - coin.coinBuyPrice) / coin.coinBuyPrice) *
    100
  ).toFixed(1);

  let percentage_24h = coin.price_change_percentage_24h
    ? coin.price_change_percentage_24h
    : 0;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => console.log('FavoritesCard')}
      style={styles.container}>
      <View
        style={{ ...styles.coinColor, backgroundColor: coin.fillColor }} />
      <View style={styles.coinInfo}>
        <Image source={{ uri: coin.image }} style={styles.coinImage} />
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
        <Text style={styles.coinQuantity}>{coin.quantity}</Text>

        <Text style={styles.coinSumPrice}>
          ${(coin.current_price * (+coin.quantity)).toFixed(2)}
        </Text>
        <Text
          style={{
            color:
              +valuePercent > 0 ? COLORS.chartColorGreen : COLORS.chartColorRed,
          }}>
          {+valuePercent > 0 ? `+${valuePercent}%` : `${valuePercent}%`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    height: 75,
    marginBottom: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.transparentLightGray,
    overflow: 'hidden',
  },
  coinColor: {
    width: 12,
    height: '100%',
    position: 'absolute',
    left: 0,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '38%',
    flexShrink: 1,
    marginLeft: 10,
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  coinName: {
    ...FONTS.textLight,
  },
  coinSymbol: {
    textTransform: 'uppercase',
    ...FONTS.textBold,
    fontSize: SIZES.body3,
  },
  coinStats: {
    alignItems: 'flex-end',
  },
  coinQuantity: {
    ...FONTS.textBold,
    fontSize: SIZES.body3,
  },
  coinSumPrice: {
    ...FONTS.textLight,
  },
});
