import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchDataQuery } from '../../api/queries';
import { getDataRequest } from '../../api/api';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  searchData: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getSearchData = createAsyncThunk(
  'search/getSearchData',
  async (value, { rejectWithValue }) => {
    try {
      const response = await getDataRequest(searchDataQuery(value));
      return response.data.coins;
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'getSearchData error: Request failed',
      });
      return rejectWithValue();
    }
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
