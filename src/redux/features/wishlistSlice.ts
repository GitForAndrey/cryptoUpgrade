import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { wishlistCoinsQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { accessCollectionDb, fetchAccessCollection } from '../../api/firebase';
import { Coin } from '../../types/coinTypes';
import { RootState } from '../store';


type WishlistState = {
  wishlistCoinsData: {id:string}[] | Coin[],
  loading: boolean,
}

const initialState : WishlistState = {
  wishlistCoinsData: [],
  loading: false,
};

export const getWishlistCoins = createAsyncThunk<Coin[],{id:string}[] | Coin[],{}>(
  'wishlist/getWishlist',
  async (coins) => {
    let coinsNames = coins.map(item => item.id).join(',');
    try {
      const response = await getDataRequest(wishlistCoinsQuery(coinsNames));
      return response;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: 'getWishlistCoins error: Request failed',
      });
      throw error;
    }
  },
);
export const saveWishlistCoinsFirebase = createAsyncThunk<void,Coin,{state:RootState, dispatch:Dispatch }>(
  'wishlist/saveWishlistCoinsFirebase',
  async (coin, { getState, dispatch }) => {
    const userUid = getState().auth.user?.uid;
    try {
      accessCollectionDb(userUid, 'wishlist', coin.id, { id: coin.id });
      dispatch(addWishlistCoin(coin));
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'saveWishlistCoinsFirebase error: Request failed',
      });
      throw error;
    }
  },
);
export const delWishlistCoinsFirebase = createAsyncThunk<void,Coin,{state:RootState, dispatch:Dispatch }>(
  'wishlist/delWishlistCoinsFirebase',
  async (coin, { getState, dispatch }) => {
    const userUid = getState().auth.user?.uid;
    try {
      accessCollectionDb(userUid, 'wishlist', coin.id);
      dispatch(delWishlistCoin(coin));
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: 'delWishlistCoinsFirebase error: Request failed',
      });
      throw error;
    }
  },
);
export const fetchWishlistFromFirebase = createAsyncThunk<void,void,{state:RootState, dispatch:Dispatch<any> }>(
  'wishlist/fetchWishlistFromFirebase',
  async (_, { getState, dispatch }) => {
    const userUid = getState().auth.user?.uid;
    try {
      let results  = await fetchAccessCollection(userUid, 'wishlist');
      if (results.length) {
        dispatch(getWishlistCoins(results));
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: 'fetchWishlistFromFirebase error: Request failed',
      });
      throw error;
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    delWishlistCoin(state, action: PayloadAction<Coin>) {
      state.wishlistCoinsData = state.wishlistCoinsData.filter(
        item => item.id !== action.payload.id,
      );
    },
    addWishlistCoin(state, action: PayloadAction<Coin>) {
      state.wishlistCoinsData.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWishlistCoins.pending, state => {
        state.loading = true;
      })
      .addCase(getWishlistCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistCoinsData = action.payload;
      })
      .addCase(getWishlistCoins.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectWishlistCoins = (state:RootState) => state.wishlist.wishlistCoinsData;
export const getWishlistLoading = (state:RootState) => state.wishlist.loading;

export const { addWishlistCoin, delWishlistCoin } = wishlistSlice.actions;

export default wishlistSlice.reducer;
