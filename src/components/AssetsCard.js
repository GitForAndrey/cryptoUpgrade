import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import { Chart } from './Chart';

export const AssetsCard = React.memo(({ coin, firstStyle }) => {
  let percentage_24h = coin.price_change_percentage_24h
    ? coin.price_change_percentage_24h
    : 0;

  return (
    <View style={[styles.container, firstStyle && styles.firstElement]}>
      <View style={styles.coinInfo}>
        <Image source={{ uri: coin.image }} style={styles.coinImage} />
        <View>
          <Text style={styles.coinSymbol}>{coin.symbol}</Text>
          <Text style={styles.coinName} numberOfLines={1} ellipsizeMode="tail">
            {coin.name}
          </Text>
        </View>
      </View>
      <View>
        {coin.sparkline_in_7d && (
          <Chart
            data={coin.sparkline_in_7d.price}
            lineColor={percentage_24h > 0 ? true : false}
          />
        )}
      </View>
      <View style={styles.coinStats}>
        <Text
          style={
            percentage_24h > 0 ? styles.coinChangeGreen : styles.coinChangeRed
          }>
          {percentage_24h.toFixed(2)}%
        </Text>
        <Text style={styles.coinPrice}>
          $
          {coin.current_price >= 0.01
            ? coin.current_price.toFixed(2)
            : coin.current_price.toFixed(3)}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SIZES.width * 0.35,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 165,
    marginRight: 15,
    padding: 10,
    overflow: 'hidden',
  },
  firstElement: {
    marginLeft: 15,
  },
  coinInfo: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    width: '95%',
  },
  coinImage: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  coinName: {
    ...FONTS.textLight,
  },
  coinSymbol: {
    textTransform: 'uppercase',
    ...FONTS.textBold,
  },
  coinStats: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  coinPrice: {
    ...FONTS.textRegular,
    fontSize: 16,
    marginTop: 2,
  },
  coinChangeGreen: {
    ...FONTS.textBold,
    color: COLORS.chartColorGreen,
  },
  coinChangeRed: {
    ...FONTS.textBold,
    color: COLORS.chartColorRed,
  },
});
