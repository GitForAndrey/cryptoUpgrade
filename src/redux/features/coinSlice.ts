import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { coinsChartQuery, searchCoinQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Coin } from '../../types/coinTypes';
import { RootState } from '../store';


type CoinState = {
  activeCoin: Coin | {},
  activeCoinChart: number[] | [],
  loading:boolean,
}

const initialState : CoinState = {
  activeCoin: {},
  activeCoinChart: [],
  loading: false,
};

export const getCoinsChart = createAsyncThunk<number[],{filter:string,coin:string },{}>(
  'coin/getCoins',
  async ({filter, coin}) => {
    try {
      const response = await getDataRequest(
        coinsChartQuery(coin, filter),
      );
      return response.prices.map((i:[number, number] )=> i[1]);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: 'getCoinsChart error: Request failed',
      });
      throw error;
    }
  },
);

export const getSearchCoin = createAsyncThunk<Coin,{coinId:string },{}>(
  'coin/getSearchCoin',
  async (coinId) => {
    try {
      const response = await getDataRequest(searchCoinQuery(coinId));
      return response[0];
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'getSearchCoin error: Request failed',
      });
      throw error;
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
      .addCase(getCoinsChart.fulfilled, (state, action) => {
        state.activeCoinChart = action.payload;
      })
      .addCase(getSearchCoin.pending, state => {
        state.loading = true;
      })
      .addCase(getSearchCoin.fulfilled, (state, action: PayloadAction<Coin>) => {
        state.activeCoin = action.payload;
        state.activeCoinChart = action.payload.sparkline_in_7d.price;
        state.loading = false;
      })
      .addCase(getSearchCoin.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectCoinsChart = (state:RootState) => state.coin.activeCoinChart;
export const selectActiveCoin = (state:RootState) => state.coin.activeCoin;
export const selectCoinLoading = (state:RootState) => state.coin.loading;

export const { resetActiveCoin } = coinSlice.actions;

export default coinSlice.reducer;
