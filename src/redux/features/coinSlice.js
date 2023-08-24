import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { coinsChartQuery, searchCoinQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  coinsChart: [],
  selectedCoin: {},
  loading: false,
};

export const getCoinsChart = createAsyncThunk(
  'coin/getCoins',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getDataRequest(
        coinsChartQuery(data.coin, data.filter),
      );
      return response.data.prices.map(i => i[1]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'getCoinsChart error: Request failed',
      });
      return rejectWithValue();
    }
  },
);

export const getSearchCoin = createAsyncThunk(
  'coin/getSearchCoin',
  async (coinId, { rejectWithValue }) => {
    try {
      const response = await getDataRequest(searchCoinQuery(coinId));
      return response.data[0];
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'getSearchCoin error: Request failed',
      });
      return rejectWithValue();
    }
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
        // state.loading = 'loading';
      })
      .addCase(getCoinsChart.fulfilled, (state, action) => {
        // state.loading = 'succeeded';
        state.coinsChart = action.payload;
      })
      .addCase(getCoinsChart.rejected, (state, action) => {
        // state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getSearchCoin.pending, state => {
        state.loading = true;
      })
      .addCase(getSearchCoin.fulfilled, (state, action) => {
        state.selectedCoin = action.payload;
        state.coinsChart = action.payload.sparkline_in_7d.price;
        state.loading = false;
      })
      .addCase(getSearchCoin.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectCoinsChart = state => state.coin.coinsChart;
export const selectActiveCoin = state => state.coin.selectedCoin;
export const selectCoinLoading = state => state.coin.loading;

export const { addActiveCoin, resetActiveCoin } = coinSlice.actions;

export default coinSlice.reducer;
