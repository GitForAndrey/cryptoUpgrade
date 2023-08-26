import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { wishlistCoinsQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { accessCollectionDb, fetchAccessCollection } from '../../api/firebase';

const initialState = {
  wishlistCoinsData: [],
  loading: false,
};

export const getWishlistCoins = createAsyncThunk(
  'wishlist/getWishlist',
  async (coins, { rejectWithValue }) => {
    let coinsNames = coins.map(item => item.id).join(',');
    try {
      const response = await getDataRequest(wishlistCoinsQuery(coinsNames));
      return response;
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'getWishlistCoins error: Request failed',
      });
      return rejectWithValue();
    }
  },
);
export const saveWishlistCoinsFirebase = createAsyncThunk(
  'wishlist/saveWishlistCoinsFirebase',
  async (coin, { getState, rejectWithValue, dispatch }) => {
    const user = getState().auth.user.uid;
    try {
      accessCollectionDb(user, 'wishlist', coin.id, { id: coin.id });
      dispatch(addWishlistCoin(coin));
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'saveWishlistCoinsFirebase error: Request failed',
      });
      return rejectWithValue();
    }
  },
);
export const delWishlistCoinsFirebase = createAsyncThunk(
  'wishlist/delWishlistCoinsFirebase',
  async (coin, { getState, rejectWithValue, dispatch }) => {
    const user = getState().auth.user.uid;
    try {
      accessCollectionDb(user, 'wishlist', coin.id);
      dispatch(delWishlistCoin(coin));
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'delWishlistCoinsFirebase error: Request failed',
      });
      return rejectWithValue();
    }
  },
);
export const fetchWishlistFromFirebase = createAsyncThunk(
  'wishlist/fetchWishlistFromFirebase',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const user = getState().auth.user.uid;
    try {
      let results = await fetchAccessCollection(user, 'wishlist');
      if (results.length) {
        await dispatch(getWishlistCoins(results));
      } else {
        return [];
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'fetchAssetsFromFirebase error: Request failed',
      });
      return rejectWithValue();
    }
  },
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlistCoin(state, action) {
      state.wishlistCoinsData.push(action.payload);
    },
    delWishlistCoin(state, action) {
      state.wishlistCoinsData = state.wishlistCoinsData.filter(
        item => item.id !== action.payload.id,
      );
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

export const selectWishlistCoins = state => state.wishlist.wishlistCoinsData;
export const getWishlistLoading = state => state.wishlist.loading;

export const { addWishlistCoin, delWishlistCoin } = wishlistSlice.actions;

export default wishlistSlice.reducer;
