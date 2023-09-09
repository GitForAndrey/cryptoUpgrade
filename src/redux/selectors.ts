import { createSelector } from '@reduxjs/toolkit';
import { selectAssetsCoinsData } from './features/assetsSlice';
import { selectMarketCoins } from './features/marketCoinSlice';
import { selectWishlistCoins } from './features/wishlistSlice';
import { selectActiveCoin } from './features/coinSlice';

export const getMarketsCoinWithWishlist = createSelector(
  [selectMarketCoins, selectWishlistCoins],
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
  [selectWishlistCoins, selectActiveCoin],
  (sliceData, selectedCoin) => {
    let isWishlisted = sliceData?.find(item => item.id === selectedCoin?.id);
    return isWishlisted ? true : false;
  },
);

export const valueInAssets = createSelector(
  [selectAssetsCoinsData, selectActiveCoin],
  (sliceData, selectedCoin) => {
    let isInAssets = sliceData?.find(item => item.id === selectedCoin?.id);
    return isInAssets ? isInAssets.quantity : 0;
  },
);
