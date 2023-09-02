import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { coinsChartQuery, searchCoinQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  activeCoin: {},
  activeCoinChart: [],
  loading: false,
};

export const getCoinsChart = createAsyncThunk(
  'coin/getCoins',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getDataRequest(
        coinsChartQuery(data.coin, data.filter),
      );
      return response.prices.map(i => i[1]);
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
      return response[0];
    } catch (error) {
      console.log(error);
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
    resetActiveCoin(state) {
      state.activeCoin = {};
      state.activeCoinChart = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCoinsChart.pending, state => {
        // state.loading = 'loading';
      })
      .addCase(getCoinsChart.fulfilled, (state, action) => {
        // state.loading = 'succeeded';
        state.activeCoinChart = action.payload;
      })
      .addCase(getCoinsChart.rejected, state => {
        // state.loading = 'failed';
      })
      .addCase(getSearchCoin.pending, state => {
        state.loading = true;
      })
      .addCase(getSearchCoin.fulfilled, (state, action) => {
        state.activeCoin = action.payload;
        state.activeCoinChart = action.payload.sparkline_in_7d.price;
        state.loading = false;
      })
      .addCase(getSearchCoin.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectCoinsChart = state => state.coin.activeCoinChart;
export const selectActiveCoin = state => state.coin.activeCoin;
export const selectCoinLoading = state => state.coin.loading;

export const { resetActiveCoin } = coinSlice.actions;

export default coinSlice.reducer;
