import React, { useState, useEffect,useMemo, FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';

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
  getAssetsCoins,
  getAssetsLoading,
  selectAssetsCoinsData,
} from '../redux/features/assetsSlice';
import {
  delWishlistCoinsFirebase,
  fetchWishlistFromFirebase,
  saveWishlistCoinsFirebase,
} from '../redux/features/wishlistSlice';
import { getMarketsCoinWithWishlist } from '../redux/selectors';
import { BottomTabStackParamList } from '../navigation/bottomTabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../redux/store';

type Props = NativeStackScreenProps<BottomTabStackParamList, 'Home'>

export const HomeScreen:FunctionComponent<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [activeFilter, setActiveFilter] = useState(filtersMarketCoins[0].id);
  const [page, setPage] = useState(1);

  const marketCoinsData = useAppSelector(getMarketsCoinWithWishlist);
  const marketCoinsLoadingInitial = useAppSelector(getMarketLoadingInitial);
  const marketCoinsLoadingAdditional = useAppSelector(getMarketLoadingAdditional);
  const activeUser = useAppSelector(selectUser);
  const assetsCoinsData = useAppSelector(selectAssetsCoinsData);
  const assetsCoinsLoading = useAppSelector(getAssetsLoading);

  const HeaderTitle = useMemo(() => {
    return <HeaderTextLeft userName={activeUser?.displayName || 'friend'} />;
  }, [activeUser]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () =>  HeaderTitle,
    });
  }, []);

  useEffect(() => {
    dispatch(getMarketCoins({ filter: activeFilter, page: 1 })).then(() => {
      dispatch(fetchAssetsFromFirebase());
      dispatch(fetchWishlistFromFirebase());
    });
  }, [dispatch]);

  const loadMoreData = async () => {
    const nextPage = page + 1;
    if (nextPage <= 3) {
      dispatch(getMarketCoins({ filter: activeFilter, page: nextPage }));
      setPage(nextPage);
    }
  };

  const handleFilterOnPress = (value:string) => {
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
            RenderItemComponent={ScrollListItem}
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
    flex: 1,
    paddingBottom: 80,
    paddingHorizontal: 15,
  },
});
