import { createSelector } from '@reduxjs/toolkit';
import { selectAssetsCoinsData } from './features/assetsSlice';
import { selectMarketCoins } from './features/marketCoinSlice';
import { selectWishlistCoins } from './features/wishlistSlice';
import { selectActiveCoin } from './features/coinSlice';


//compare first array with the second, find matching elements and add new field to data item with information isWishlist: true/false
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

//check is active coin is a wishlisted or no
export const isCoinWishlist = createSelector(
  [selectWishlistCoins, selectActiveCoin],
  (sliceData, selectedCoin) => {
    let isWishlisted = sliceData?.find(item => item.id === selectedCoin?.id);
    return isWishlisted ? true : false;
  },
);

//check is active coin is in assets and return how many coins in assets
export const valueInAssets = createSelector(
  [selectAssetsCoinsData, selectActiveCoin],
  (sliceData, selectedCoin) => {
    let isInAssets = sliceData?.find(item => item.id === selectedCoin?.id);
    return isInAssets ? isInAssets.quantity : 0;
  },
);
