import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, GLOB_STYLE } from '../constants';
import { ScrollListItem } from '../components/ScrollListItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  delWishlistCoinsFirebase,
  getWishlistCoins,
  getWishlistLoading,
  saveWishlistCoinsFirebase,
  selectWishlistCoins,
} from '../redux/features/wishlistSlice';
import { SwipeListItem } from '../components/SwipeListItem';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const WishListScreen = () => {
  const dispatch = useDispatch();
  const wishlistLoading = useSelector(getWishlistLoading);
  const wishlistData = useSelector(selectWishlistCoins);

  useEffect(() => {
    if (wishlistData.length) {
      dispatch(getWishlistCoins(wishlistData));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.list_container}>
        {wishlistLoading ? (
          <LoadingIndicator />
        ) : wishlistData.length ? (
          <SwipeListItem
            data={wishlistData}
            renderItemComponent={ScrollListItem}
            onAddFunc={saveWishlistCoinsFirebase}
            onDelFunc={delWishlistCoinsFirebase}
            isWishlistPage={true}
          />
        ) : (
          <Text style={styles.list_empty}>no coins</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOB_STYLE.screenContainer,
  },
  list_container: { flex: 1, marginTop: 15, marginBottom: 80 },
  list_empty: { color: COLORS.white, textAlign: 'center' },
});
