import { createSelector } from '@reduxjs/toolkit';

const getMarketCoinsData = state => state.marketCoin.marketCoins;
const getWishlistData = state => state.wishlist.wishlistCoinsData;
const getSelectedCoin = state => state.coin.selectedCoin;
const getAssetsListData = state => state.assets.assetsCoinsData;

export const getMarketsCoinWithWishlist = createSelector(
  [getMarketCoinsData, getWishlistData],
  (sliceAData, sliceBData) => {
    return sliceAData?.map(item => {
      const marketItem = sliceBData?.find(itemB => item.id === itemB.id);
      if (marketItem) {
        return { ...item, isWishlist: true };
      } else {
        return { ...item, isWishlist: false };
      }
    });
  },
);

export const isCoinWishlist = createSelector(
  [getWishlistData, getSelectedCoin],
  (sliceData, selectedCoin) => {
    let isWishlisted = sliceData?.find(item => item.id === selectedCoin?.id);
    return isWishlisted ? true : false;
  },
);

export const isCoinInAssets = createSelector(
  [getAssetsListData, getSelectedCoin],
  (sliceData, selectedCoin) => {
    let isInAssets = sliceData?.find(item => item.id === selectedCoin?.id);
    return isInAssets ? isInAssets.quantity : false;
  },
);
