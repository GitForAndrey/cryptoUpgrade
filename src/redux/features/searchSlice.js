import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'react-native-axios';

const initialState = {
  searchData: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getSearchData = createAsyncThunk(
  'search/getSearchData',
  async value => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${value}`,
    );
    return response.data.coins;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearchData(state, action) {
      state.searchData = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSearchData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSearchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchData = action.payload;
      })
      .addCase(getSearchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectSearchData = state => state.search.searchData;
export const selectSearchStatus = state => state.search.status;

export const { resetSearchData } = searchSlice.actions;

export default searchSlice.reducer;
