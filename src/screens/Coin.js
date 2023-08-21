import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CoinChart } from '../components/CoinChart';
import { CustomHeader } from '../components/CustomHeader';
import { FiltersItem } from '../components/FiltersItem';
import { COLORS, FONTS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';

import { filtersCoinValue } from '../constants/data';
import {
  getCoinsChart,
  resetActiveCoin,
  selectActiveCoin,
  selectActiveStatus,
  selectCoinsChart,
} from '../redux/features/coinSlice';
import { isCoinInAssets, isCoinWishlist } from '../redux/selectors';
import {
  addWishlistCoin,
  delWishlistCoin,
} from '../redux/features/wishlistSlice';
import { AssetsAdd } from '../components/AssetsAdd';

export const CoinScreen = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('7');
  const navigation = useNavigation();
  const coinsChartData = useSelector(selectCoinsChart);
  const isWishlist = useSelector(isCoinWishlist);
  const isInAssets = useSelector(isCoinInAssets);
  const coin = useSelector(selectActiveCoin);
  const loading = useSelector(selectActiveStatus);

  const handleFilterClick = value => {
    let data = { filter: value, coin: coin.id };
    setActiveFilter(value);
    dispatch(getCoinsChart(data));
  };

  const handleGoBack = () => {
    navigation.goBack();
    dispatch(resetActiveCoin());
  };
  const addWishlist = () => {
    dispatch(addWishlistCoin(coin));
  };
  const delWishlist = () => {
    dispatch(delWishlistCoin(coin));
  };

  const renderItems = array => {
    return array.map(item => {
      return (
        <FiltersItem
          item={item}
          key={item.id}
          isActive={activeFilter === item.id}
          handleFilterClick={handleFilterClick}
        />
      );
    });
  };

  const formatter = new Intl.NumberFormat('en-US');

  return (
    <View style={styles.container}>
      {loading === 'succeeded' && (
        <>
          <CustomHeader
            title={coin.name}
            backIcon
            wishlistIcon
            isWishlist={isWishlist}
            handleGoBack={handleGoBack}
            onAddFunc={addWishlist}
            onDelFunc={delWishlist}
          />
          <View style={styles.coinInfoBlock}>
            <View style={styles.coinInfo}>
              <Image source={{ uri: coin?.image }} style={styles.coinImage} />
              <View>
                <Text
                  style={styles.coinName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {coin.name}
                </Text>
                <Text style={styles.coinSymbol}>{coin.symbol}</Text>
              </View>
            </View>
            <View style={styles.coinStats}>
              <Text style={styles.coinPrice}>
                ${coin.current_price?.toFixed(4)}
              </Text>
              <Text
                style={
                  coin.price_change_percentage_24h > 0
                    ? styles.coinChangeGreen
                    : styles.coinChangeRed
                }>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <AssetsAdd coin={coin} isAssets={isInAssets} />
          <View style={styles.filtersView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {renderItems(filtersCoinValue, 'filters')}
            </ScrollView>
          </View>
          <View style={styles.chartContainer}>
            <CoinChart data={coinsChartData ?? []} />
          </View>
          <ScrollView style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.label}>Rank:</Text>
              <Text style={styles.value}>{coin.market_cap_rank}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Market Cap:</Text>
              <Text style={styles.value}>
                {'$' + formatter.format(coin.market_cap)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>High 24h:</Text>
              <Text style={styles.value}>
                {'$' + formatter.format(coin.high_24h?.toFixed(2))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Low 24h:</Text>
              <Text style={styles.value}>
                {'$' + formatter.format(coin.low_24h?.toFixed(2))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Circulating Supply:</Text>
              <Text style={styles.value}>
                {'$' + formatter.format(coin.circulating_supply?.toFixed(2))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Supply:</Text>

              <Text style={styles.value}>
                {'$' + formatter.format(coin.total_supply?.toFixed(2))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>All Time High:</Text>

              <Text style={styles.value}>
                {'$' + formatter.format(coin.ath?.toFixed(2))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>All Time Low:</Text>
              <Text style={styles.value}>
                {'$' + formatter.format(coin.atl?.toFixed(2))}
              </Text>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.mainBg,
    paddingBottom: 50,
  },
  coinInfoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  coinName: {
    ...FONTS.textBold,
    fontSize: 18,
    lineHeight: 20,
  },
  coinSymbol: {
    textTransform: 'uppercase',
    ...FONTS.textRegular,
    color: COLORS.lightGray,
  },
  coinStats: {
    alignItems: 'flex-end',
  },
  coinPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.white,
  },
  coinChangeGreen: {
    fontWeight: 'bold',
    color: COLORS.chartColorGreen,
  },
  coinChangeRed: {
    fontWeight: 'bold',
    color: COLORS.chartColorRed,
  },
  filtersView: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  chartContainer: {
    height: 250,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  table: {
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentWhite,
  },
  label: {
    ...FONTS.textRegular,
  },
  value: {
    color: COLORS.lightGray,
  },
});
