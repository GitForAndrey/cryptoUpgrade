import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchDataQuery } from '../../api/queries';
import { getDataRequest } from '../../api/api';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const initialState = {
  searchData: [],
  loading: false,
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
    resetSearchData(state) {
      state.searchData = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSearchData.pending, state => {
        state.loading = true;
      })
      .addCase(getSearchData.fulfilled, (state, action) => {
        state.loading = false;
        state.searchData = action.payload;
      })
      .addCase(getSearchData.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectSearchData = state => state.search.searchData;
export const selectSearchLoading = state => state.search.loading;

export const { resetSearchData } = searchSlice.actions;

export default searchSlice.reducer;
