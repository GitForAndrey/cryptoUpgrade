import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { firstTestQuery, topQuery, secondTestQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  marketCoins: [],
  loadingInitial: false, //first page data loading
  loadingAdditional: false, //additional data
  filter: 'Top100',
};

export const getMarketCoins = createAsyncThunk(
  'marketCoin/getMarketCoins',
  async (data, { rejectWithValue }) => {
    let url;
    const { filter, page } = data;
    if (filter === 'Top100') {
      url = topQuery(page);
    } else if (filter === 'Test1') {
      url = firstTestQuery(page);
    } else if (filter === 'Test2') {
      url = secondTestQuery(page);
    }
    try {
      const response = await getDataRequest(url);
      return { data: response, selectedFilter: filter };
    } catch (error) {
      console.log('getMarketCoins error', error);
      Toast.show({
        type: 'error',
        text2: 'getMarketCoins error: Request failed',
      });
      return rejectWithValue();
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
      .addCase(getMarketCoins.fulfilled, (state, action) => {
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

export const selectMarketCoins = state => state.marketCoin.marketCoins;
export const getMarketLoadingInitial = state => state.marketCoin.loadingInitial;
export const getMarketLoadingAdditional = state =>
  state.marketCoin.loadingAdditional;

export const {} = marketCoinSlice.actions;

export default marketCoinSlice.reducer;
