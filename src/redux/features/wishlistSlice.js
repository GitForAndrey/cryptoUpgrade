import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { wishlistCoinsQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  wishlistCoinsData: [],
  // wishlistId: [],
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

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlistCoin(state, action) {
      console.log(action);
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
