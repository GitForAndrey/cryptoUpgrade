import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'react-native-axios';

const initialState = {
  coinsChart: [],
  selectedCoin: {},
  status: 'succeeded', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getCoinsChart = createAsyncThunk('coin/getCoins', async data => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${data.coin}/market_chart?vs_currency=usd&days=${data.filter}`,
  );
  return response.data.prices.map(i => i[1]);
});
export const getSearchCoin = createAsyncThunk(
  'coin/getSearchCoin',
  async coinId => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
    );
    return response.data[0];
  },
);

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    addActiveCoin(state, action) {
      state.selectedCoin = action.payload;
      state.coinsChart = action.payload.sparkline_in_7d.price;
    },
    resetActiveCoin(state) {
      state.selectedCoin = {};
      state.coinsChart = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCoinsChart.pending, (state, action) => {
        // state.status = 'loading';
      })
      .addCase(getCoinsChart.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        state.coinsChart = action.payload;
      })
      .addCase(getCoinsChart.rejected, (state, action) => {
        // state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSearchCoin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSearchCoin.fulfilled, (state, action) => {
        state.selectedCoin = action.payload;
        state.coinsChart = action.payload.sparkline_in_7d.price;
        state.status = 'succeeded';
      })
      .addCase(getSearchCoin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCoinsChart = state => state.coin.coinsChart;
export const selectActiveCoin = state => state.coin.selectedCoin;
export const selectActiveStatus = state => state.coin.status;

export const { addActiveCoin, resetActiveCoin } = coinSlice.actions;

export default coinSlice.reducer;
