import { combineReducers, configureStore } from '@reduxjs/toolkit';
import marketCoinReducer from './features/marketCoinSlice';
import authSlice from './features/authSlice';
import wishlistSlice from './features/wishlistSlice';
import assetsSlice from './features/assetsSlice';
import coinSlice from './features/coinSlice';

//import logger from 'redux-logger';
import searchSlice from './features/searchSlice';
import { useSelector,TypedUseSelectorHook, useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  marketCoin: marketCoinReducer,
  auth: authSlice,
  wishlist: wishlistSlice,
  coin: coinSlice,
  assets: assetsSlice,
  search: searchSlice,
});

const resettableRootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logoutUser') {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => RootDispatch = useDispatch;