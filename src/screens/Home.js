import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AssetsCard } from '../components/AssetsCard';
import { FiltersItem } from '../components/FiltersItem';
import { ScrollListItem } from '../components/ScrollListItem';
import { EmptyAssetsCard } from '../components/EmptyAssetsCard';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { HeaderTextLeft } from '../components/HeaderTextLeft';
import { SwipeListItem } from '../components/SwipeListItem';
import { COLORS, filtersMarketCoins, FONTS } from '../constants';
import {
  getMarketCoins,
  getMarketCoinsLoading,
} from '../redux/features/marketCoinSlice';
import { selectUser } from '../redux/features/authSlice';
import {
  getAssetsLoading,
  selectAssetsCoinsData,
} from '../redux/features/assetsSlice';
import {
  delWishlistCoinsFirebase,
  saveWishlistCoinsFirebase,
} from '../redux/features/wishlistSlice';
import { getMarketsCoinWithWishlist } from '../redux/selectors';

export const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState(filtersMarketCoins[0].id);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const marketCoinsData = useSelector(getMarketsCoinWithWishlist);
  const marketCoinsLoading = useSelector(getMarketCoinsLoading);
  const activeUser = useSelector(selectUser);
  const assetsCoinsData = useSelector(selectAssetsCoinsData);
  const assetsCoinsLoading = useSelector(getAssetsLoading);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTextLeft userName={activeUser.displayName} />,
    });
  }, []);
  useEffect(() => {
    dispatch(getMarketCoins({ filter: activeFilter, page: 1 }));
  }, []);

  const loadMoreData = async () => {
    const nextPage = page + 1;
    if (nextPage <= 3) {
      dispatch(getMarketCoins({ filter: activeFilter, page: nextPage }));
      setPage(nextPage);
    }
  };

  const handleFilterClick = value => {
    setActiveFilter(value);
    dispatch(getMarketCoins({ filter: value, page: 1 }));
  };

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
        return <AssetsCard coin={item} key={item?.id} />;
      } else {
        return <ScrollListItem coin={item} key={item?.id} />;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_content}>My Assets</Text>
      <View style={styles.items_container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {assetsCoinsLoading ? (
            <LoadingIndicator />
          ) : assetsCoinsData.length ? (
            renderItems(assetsCoinsData, 'coins')
          ) : (
            <EmptyAssetsCard />
          )}
        </ScrollView>
      </View>
      <Text style={styles.text_content}>Market</Text>
      <View style={styles.items_container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {renderItems(filtersMarketCoins, 'filters')}
        </ScrollView>
      </View>
      <View style={styles.market_container}>
        {marketCoinsData.length ? (
          <SwipeListItem
            data={marketCoinsData}
            renderItemComponent={ScrollListItem}
            onAddFunc={saveWishlistCoinsFirebase}
            onDelFunc={delWishlistCoinsFirebase}
            onLoadMore={loadMoreData}
          />
        ) : null}
        {marketCoinsLoading && <LoadingIndicator />}
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
  text_content: {
    marginVertical: 10,
    ...FONTS.textRegular,
    fontSize: 16,
  },
  items_container: {
    marginBottom: 10,
  },
  market_container: {
    flex: 1,
    marginBottom: 55,
  },
});
