import { useNavigation } from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Chart } from './Chart';
import { COLORS, FONTS, SIZES } from '../constants';
import { Coin } from '../types/coinTypes';

interface ScrollListItemProps {
  coin: Coin,
}

export const ScrollListItem:FunctionComponent<ScrollListItemProps> = React.memo(({ coin }) => {
  const navigation = useNavigation();

  let percentage_24h = coin.price_change_percentage_24h
    ? coin.price_change_percentage_24h
    : 0;

  const onPressHandle = () => {
    navigation.navigate('Coin', {
      coinId: coin.id,
    });
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
      {coin.sparkline_in_7d && (
        <Chart
          data={coin.sparkline_in_7d.price}
          lineColor={percentage_24h > 0 ? true : false}
        />
      )}
      <View style={styles.coinStats}>
        <Text
          style={
            percentage_24h > 0 ? styles.coinChangeGreen : styles.coinChangeRed
          }>
          {percentage_24h?.toFixed(2)}%
        </Text>

        <Text style={styles.coinPrice}>${coin.current_price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
    height: 55,
    marginBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '29%',
    flexShrink: 1,
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
  },
  coinStats: {
    alignItems: 'flex-end',
  },
  coinPrice: {
    ...FONTS.textRegular,
    marginBottom: 5,
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
