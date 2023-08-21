import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'react-native-axios';

const baseUrl = 'https://api.coingecko.com/api/v3';

const initialState = {
  wishlistCoinsData: [],
  // wishlistId: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getWishlistCoins = createAsyncThunk(
  'wishlist/getWishlist',
  async coins => {
    let coinsNames = coins.map(item => item.id).join(',');
    const response = await axios.get(
      `${baseUrl}/coins/markets?vs_currency=usd&ids=${coinsNames}&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
    );
    return response.data;
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
      .addCase(getWishlistCoins.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getWishlistCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistCoinsData = action.payload;
      })
      .addCase(getWishlistCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectWishlistCoins = state => state.wishlist.wishlistCoinsData;
export const getWishlistStatus = state => state.wishlist.status;

export const { addWishlistCoin, delWishlistCoin } = wishlistSlice.actions;

export default wishlistSlice.reducer;
