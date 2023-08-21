import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CustomHeader } from '../components/CustomHeader';
import { AssetsCard } from '../components/AssetsCard';
import { FiltersItem } from '../components/FiltersItem';
import { MarketItem } from '../components/MarketItem';
import { COLORS, filtersMarketCoins, FONTS } from '../constants';
import {
  getMarketCoins,
  getMarketCoinsStatus,
} from '../redux/features/marketCoinSlice';
import { selectUser } from '../redux/features/authSlice';
import {
  getAssetsCoins,
  getAssetsStatus,
  selectAssetsCoinsData,
} from '../redux/features/assetsSlice';
import { SwipeListItem } from '../components/SwipeListItem';
import {
  addWishlistCoin,
  delWishlistCoin,
} from '../redux/features/wishlistSlice';
import { getMarketsCoinWithWishlist } from '../redux/selectors';
import { EmptyAssetsCard } from '../components/EmptyAssetsCard';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState(filtersMarketCoins[0].id);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const marketCoinsData = useSelector(getMarketsCoinWithWishlist);
  const marketCoinsStatus = useSelector(getMarketCoinsStatus);
  const activeUser = useSelector(selectUser);
  const assetsCoinsData = useSelector(selectAssetsCoinsData);
  const assetsCoinsStatus = useSelector(getAssetsStatus);

  const hadleOnPressSearch = () => {
    navigation.navigate('Search');
  };
  useEffect(() => {
    if (marketCoinsStatus === 'idle') {
      dispatch(getMarketCoins(activeFilter));
    }
    if (assetsCoinsData.length) {
      dispatch(getAssetsCoins(assetsCoinsData));
    }
  }, []);

  const handleFilterClick = useCallback(
    value => {
      setActiveFilter(value);
      dispatch(getMarketCoins(value));
    },
    [dispatch],
  );

  const renderItems = (array, type) => {
    return array.map(item => {
      if (type === 'filters') {
        return (
          <FiltersItem
            item={item}
            key={item.id}
            isActive={activeFilter === item.id}
            handleFilterClick={handleFilterClick}
          />
        );
      }
      if (type === 'coins') {
        return <AssetsCard coin={item} key={item.id} />;
      } else {
        return <MarketItem coin={item} key={item.id} />;
      }
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        home={true}
        userName={activeUser.displayName}
        searchIcon={true}
        handleOnSearch={() => hadleOnPressSearch()}
      />
      <Text style={styles.textContent}>My Assets</Text>
      <View style={{ marginBottom: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {assetsCoinsStatus === 'loading' ? (
            <LoadingIndicator />
          ) : assetsCoinsData.length ? (
            renderItems(assetsCoinsData, 'coins')
          ) : (
            <EmptyAssetsCard />
          )}
        </ScrollView>
      </View>
      <Text style={styles.textContent}>Market</Text>
      <View style={{ marginBottom: 10 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {renderItems(filtersMarketCoins, 'filters')}
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginBottom: 55 }}>
        {marketCoinsStatus === 'loading' ? (
          <LoadingIndicator />
        ) : (
          <SwipeListItem
            data={marketCoinsData}
            renderItemComponent={MarketItem}
            onAddFunc={addWishlistCoin}
            onDelFunc={delWishlistCoin}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.mainBg,
  },
  itemContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  textContent: {
    marginVertical: 10,
    ...FONTS.textRegular,
    fontSize: 16,
  },
});
