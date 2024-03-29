import React, { useState, useEffect,FunctionComponent } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChartCoin } from '../components/ChartCoin';
import { COLORS, FONTS, GLOB_STYLE } from '../constants';

import { filtersCoinValue } from '../constants/data';
import {
  getCoinsChart,
  getSearchCoin,
  resetActiveCoin,
  selectActiveCoin,
  selectCoinLoading,
  selectCoinsChart,
} from '../redux/features/coinSlice';
import { isCoinWishlist, valueInAssets } from '../redux/selectors';
import {
  delWishlistCoinsFirebase,
  saveWishlistCoinsFirebase,
} from '../redux/features/wishlistSlice';
import { AssetsCoinAdd } from '../components/AssetsCoinAdd';
import { HeaderButton } from '../components/HeaderButton';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { FiltersItemList } from '../components/FiltersItemList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/mainStack';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Coin } from '../types/coinTypes';

type Props = NativeStackScreenProps<MainStackParamList, 'Coin'>

export const CoinScreen:FunctionComponent<Props> = ({ route }) => {
  const { coinId } = route.params;
  const dispatch = useAppDispatch();
  const [activeFilter, setActiveFilter] = useState('7');
  const navigation = useNavigation();
  const coinsChartData = useAppSelector(selectCoinsChart);
  const isWishlist = useAppSelector(isCoinWishlist);
  const valueInAsset = useAppSelector(valueInAssets);
  const coin = useAppSelector(selectActiveCoin);
  const loading = useAppSelector(selectCoinLoading);


  //get new coin chart data for different filter value and set active filter value
  const handleFilterClick = (value: string) => {
    let data = { filter: value, coin: coinId };
    setActiveFilter(value);
    dispatch(getCoinsChart(data));
  };
  //go back and clear coin state
  const handleGoBack = () => {
    navigation.goBack();
    dispatch(resetActiveCoin());
  };
  //add/del coin from wishlist data
  const addWishlist = (data : Coin)=> {
    dispatch(saveWishlistCoinsFirebase(data));
  };
  const delWishlist = (data : Coin) => {
    dispatch(delWishlistCoinsFirebase(data));
  };
  //format price value
  const formatter = new Intl.NumberFormat('en-US');


  useEffect(() => {
    dispatch(getSearchCoin(coinId));
  }, [coinId]);
  //create custom header with active add/del wishlist button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <HeaderButton
            icon={isWishlist ? 'star' : 'star-outline'}
            style={styles.headerRightButton}
            handleOnPress={() =>
              isWishlist ? delWishlist(coin) : addWishlist(coin)
            }
          />
          <HeaderButton
            icon={'notifications-outline'}
            handleOnPress={() => navigation.navigate('Notification')}
          />
        </View>
      ),
      headerLeft: () => (
        <HeaderButton
          icon={'chevron-back-outline'}
          handleOnPress={() => handleGoBack()}
        />
      ),
    });
  }, [isWishlist, coin]);

  return (
    <ScrollView style={styles.container}>
      {!loading ? (
        <>
          <View style={styles.coinInfoBlock}>
            <View style={styles.coinInfo}>
              {coin?.image && (
                <Image source={{ uri: coin.image }} style={styles.coinImage} />
              )}
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
          <AssetsCoinAdd coin={coin} inAssets={valueInAsset} />
          <View style={styles.filtersView}>
            <FiltersItemList
              data={filtersCoinValue}
              activeFilter={activeFilter}
              handleFilterOnPress={handleFilterClick}
            />
          </View>
          <View style={styles.chartContainer}>
            <ChartCoin data={coinsChartData ?? []} />
          </View>
          <View style={styles.table}>
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
          </View>
        </>
      ) : (
        <LoadingIndicator />
      )}
      <View style={styles.empty} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOB_STYLE.screenContainer,
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
    color: COLORS.white,
  },
  coinStats: {
    alignItems: 'flex-end',
  },
  coinPrice: {
    ...FONTS.textBold,
    fontSize: 16,
    color: COLORS.white,
  },
  coinChangeGreen: {
    ...FONTS.textBold,
    color: COLORS.chartColorGreen,
  },
  coinChangeRed: {
    ...FONTS.textBold,
    color: COLORS.chartColorRed,
  },
  filtersView: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chartContainer: {
    height: 250,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  table: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderColor: COLORS.transparentWhite,
  },
  label: {
    ...FONTS.textRegular,
  },
  value: {
    color: COLORS.white,
  },
  empty: {
    height: 100,
  },
});
