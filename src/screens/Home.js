import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AssetsCard } from '../components/AssetsCard';
import { FiltersItem } from '../components/FiltersItem';
import { ScrollListItem } from '../components/ScrollListItem';
import { AssetsEmptyCard } from '../components/AssetsEmptyCard';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { HeaderTextLeft } from '../components/HeaderTextLeft';
import { SwipeListItem } from '../components/SwipeListItem';
import { COLORS, filtersMarketCoins, FONTS, SIZES } from '../constants';
import {
  getMarketCoins,
  getMarketLoadingAdditional,
  getMarketLoadingInitial,
} from '../redux/features/marketCoinSlice';
import { selectUser } from '../redux/features/authSlice';
import {
  fetchAssetsFromFirebase,
  getAssetsLoading,
  selectAssetsCoinsData,
} from '../redux/features/assetsSlice';
import {
  delWishlistCoinsFirebase,
  fetchWishlistFromFirebase,
  saveWishlistCoinsFirebase,
} from '../redux/features/wishlistSlice';
import { getMarketsCoinWithWishlist } from '../redux/selectors';

export const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState(filtersMarketCoins[0].id);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const marketCoinsData = useSelector(getMarketsCoinWithWishlist);
  const marketCoinsLoadingInitial = useSelector(getMarketLoadingInitial);
  const marketCoinsLoadingAdditional = useSelector(getMarketLoadingAdditional);
  const activeUser = useSelector(selectUser);
  const assetsCoinsData = useSelector(selectAssetsCoinsData);
  const assetsCoinsLoading = useSelector(getAssetsLoading);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTextLeft userName={activeUser.displayName} />,
    });
  }, []);
  useEffect(() => {
    dispatch(getMarketCoins({ filter: activeFilter, page: 1 })).then(() => {
      dispatch(fetchAssetsFromFirebase());
      dispatch(fetchWishlistFromFirebase());
    });
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
    return array.map((item, idx) => {
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
        return (
          <AssetsCard
            coin={item}
            key={item?.id}
            firstStyle={idx === 0 ? true : false}
          />
        );
      } else {
        return <ScrollListItem coin={item} key={item?.id} />;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_content}>My Assets</Text>
      <View style={styles.assets_container}>
        {assetsCoinsLoading ? (
          <LoadingIndicator />
        ) : assetsCoinsData.length ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {renderItems(assetsCoinsData, 'coins')}
          </ScrollView>
        ) : (
          <AssetsEmptyCard />
        )}
      </View>
      <Text style={styles.text_content}>Market</Text>
      <View style={styles.filters_container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {renderItems(filtersMarketCoins, 'filters')}
        </ScrollView>
      </View>
      <View style={styles.market_container}>
        {!marketCoinsLoadingInitial ? (
          <SwipeListItem
            data={marketCoinsData}
            renderItemComponent={ScrollListItem}
            onAddFunc={saveWishlistCoinsFirebase}
            onDelFunc={delWishlistCoinsFirebase}
            onLoadMore={loadMoreData}
          />
        ) : (
          <LoadingIndicator />
        )}

        {marketCoinsLoadingAdditional && <LoadingIndicator />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  text_content: {
    marginVertical: 10,
    ...FONTS.textRegular,
    fontSize: SIZES.body3,
    paddingHorizontal: 15,
  },
  assets_container: {
    height: 165,
    marginBottom: 10,
  },
  filters_container: {
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  market_container: {
    flex: 1,
    marginBottom: 75,
    paddingHorizontal: 15,
  },
});
