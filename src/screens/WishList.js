import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';
import { MarketItem } from '../components/MarketItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWishlistCoin,
  delWishlistCoin,
  getWishlistCoins,
  getWishlistStatus,
  selectWishlistCoins,
} from '../redux/features/wishlistSlice';
import { SwipeListItem } from '../components/SwipeListItem';
import { LoadingIndicator } from '../components/LoadingIndicator';

export const WishListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wishlistStatus = useSelector(getWishlistStatus);
  const wishlistData = useSelector(selectWishlistCoins);

  useEffect(() => {
    if (wishlistData.length) {
      dispatch(getWishlistCoins(wishlistData));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 15, marginBottom: 55 }}>
        {wishlistStatus === 'loading' ? (
          <LoadingIndicator />
        ) : wishlistData.length ? (
          <SwipeListItem
            data={wishlistData}
            renderItemComponent={MarketItem}
            onAddFunc={addWishlistCoin}
            onDelFunc={delWishlistCoin}
            isWishlistPage={true}
          />
        ) : (
          <Text style={{ color: '#ccc', textAlign: 'center' }}>no coins</Text>
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
});
