import { configureStore } from '@reduxjs/toolkit';
import marketCoinReducer from './features/marketCoinSlice';
import authSlice from './features/authSlice';
import wishlistSlice from './features/wishlistSlice';
import assetsSlice from './features/assetsSlice';
import coinSlice from './features/coinSlice';

import logger from 'redux-logger';
import searchSlice from './features/searchSlice';

const rootReducer = {
  marketCoin: marketCoinReducer,
  auth: authSlice,
  wishlist: wishlistSlice,
  coin: coinSlice,
  assets: assetsSlice,
  search: searchSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
