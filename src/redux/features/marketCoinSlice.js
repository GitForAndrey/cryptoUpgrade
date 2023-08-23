import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataRequest } from '../../api/api';
import { firstTestQuery, topQuery, secondTestQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  marketCoins: [],
  status: false,
  filter: 'Top100',
};

export const getMarketCoins = createAsyncThunk(
  'marketCoin/getMarketCoins',
  async (data, { rejectWithValue }) => {
    let url;
    console.log(data);
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
      .addCase(getMarketCoins.pending, state => {
        state.status = true;
      })
      .addCase(getMarketCoins.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = false;
        if (state.filter === action.payload.selectedFilter) {
          state.marketCoins = [...state.marketCoins, ...action.payload.data];
        } else {
          state.filter = action.payload.selectedFilter;
          state.marketCoins = action.payload.data;
        }
      })
      .addCase(getMarketCoins.rejected, state => {
        state.status = false;
      });
  },
});

export const selectMarketCoins = state => state.marketCoin.marketCoins;
export const getMarketCoinsStatus = state => state.marketCoin.status;

export const {} = marketCoinSlice.actions;

export default marketCoinSlice.reducer;
