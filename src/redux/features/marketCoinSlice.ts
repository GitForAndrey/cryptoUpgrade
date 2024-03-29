import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { firstTestQuery, topQuery, secondTestQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Coin } from '../../types/coinTypes';
import { RootState } from '../store';

type MarketCoinState = {
  marketCoins: Coin[] | [],
  loadingInitial: boolean,
  loadingAdditional: boolean, //additional data
  filter: string,
}

const initialState : MarketCoinState = {
  marketCoins: [],
  loadingInitial: false, //first page data loading
  loadingAdditional: false, //additional data
  filter: 'Top100',
};

//select query  to get data from api
const getQueryWithFilters = (filter:string, page: number): string => {
  if (filter === 'Top100') {
    return topQuery(page);
  } else if (filter === 'Test1') {
    return firstTestQuery(page);
  } else if (filter === 'Test2') {
    return secondTestQuery(page);
  }
  return '';
};

//get main page market data from api
export const getMarketCoins = createAsyncThunk<{ data: Coin[], selectedFilter:string },{filter:string, page:number },{}>(
  'marketCoin/getMarketCoins',
  async ({ filter, page }) => {
    try {
      const response = await getDataRequest(getQueryWithFilters(filter, page));
      return { data: response, selectedFilter: filter };
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'getMarketCoins error: Request failed',
      });
      throw error;
    }
  },
);

const marketCoinSlice = createSlice({
  name: 'marketCoin',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMarketCoins.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loadingInitial = true;
        } else {
          state.loadingAdditional = true;
        }
      })
      //save data to the state if this is first load with different filters or additional data loading
      .addCase(getMarketCoins.fulfilled, (state, action: PayloadAction<{ data: Coin[], selectedFilter:string }>) => {
        state.loadingInitial = false;
        state.loadingAdditional = false;
        if (state.filter === action.payload.selectedFilter) {
          state.marketCoins = [...state.marketCoins, ...action.payload.data];
        } else {
          state.filter = action.payload.selectedFilter;
          state.marketCoins = action.payload.data;
        }
      })
      .addCase(getMarketCoins.rejected, state => {
        state.loadingInitial = false;
        state.loadingAdditional = false;
      });
  },
});

export const selectMarketCoins = (state:RootState) => state.marketCoin.marketCoins;
export const getMarketLoadingInitial = (state:RootState) => state.marketCoin.loadingInitial;
export const getMarketLoadingAdditional = (state:RootState) =>
  state.marketCoin.loadingAdditional;

export const {} = marketCoinSlice.actions;

export default marketCoinSlice.reducer;
