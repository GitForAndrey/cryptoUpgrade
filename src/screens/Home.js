import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingIndicator } from '../components/LoadingIndicator';
import { HeaderTextLeft } from '../components/HeaderTextLeft';
import { AssetsCardList } from '../components/AssetsCardList';
import { FiltersItemList } from '../components/FiltersItemList';
import { ContentTitle } from '../components/ContentTitle';
import { SwipeListItem } from '../components/SwipeListItem';
import { ScrollListItem } from '../components/ScrollListItem';

import { GLOB_STYLE, filtersMarketCoins } from '../constants';
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

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState(filtersMarketCoins[0].id);
  const [page, setPage] = useState(1);

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

  const handleFilterOnPress = value => {
    setActiveFilter(value);
    dispatch(getMarketCoins({ filter: value, page: 1 }));
  };

  return (
    <View style={styles.container}>
      <ContentTitle title={'My Assets'} />
      <View style={styles.assets_container}>
        {assetsCoinsLoading ? (
          <LoadingIndicator />
        ) : (
          <AssetsCardList data={assetsCoinsData} />
        )}
      </View>
      <ContentTitle title={'Market'} />
      <FiltersItemList
        data={filtersMarketCoins}
        activeFilter={activeFilter}
        handleFilterOnPress={handleFilterOnPress}
      />

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
    ...GLOB_STYLE.screenContainer,
    paddingHorizontal: 0,
  },
  assets_container: {
    height: 165,
  },
  market_container: {
    paddingBottom: 80,
    paddingHorizontal: 15,
  },
});
