import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'react-native-axios';

const baseUrl = 'https://api.coingecko.com/api/v3';

export const marketCoinsUrl = [
  {
    id: 'MarketCap',
    searchUrl:
      '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=24&locale=en',
  },
  {
    id: 'Tranding',
    searchUrl:
      '/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=15&page=1&sparkline=true&price_change_percentage=24&locale=en',
  },
  {
    id: '1',
    searchUrl:
      '/coins/markets?vs_currency=usd&order=volume_asc&per_page=15&page=1&sparkline=true&price_change_percentage=7d&locale=en',
  },
];

const initialState = {
  marketCoins: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getMarketCoins = createAsyncThunk(
  'marketCoin/getMarketCoins',
  async filterValue => {
    const filter = marketCoinsUrl.find(f => f.id === filterValue);
    if (!filter) {
      throw new Error('Invalid filter value');
    }
    const response = await axios.get(`${baseUrl}${filter.searchUrl}`);
    return response.data;
  },
);

const marketCoinSlice = createSlice({
  name: 'marketCoin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMarketCoins.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getMarketCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.marketCoins = action.payload;
      })
      .addCase(getMarketCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectMarketCoins = state => state.marketCoin.marketCoins;
export const getMarketCoinsStatus = state => state.marketCoin.status;

export const {} = marketCoinSlice.actions;

export default marketCoinSlice.reducer;
