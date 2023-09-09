import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchDataQuery } from '../../api/queries';
import { getDataRequest } from '../../api/api';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SearchCoin } from '../../types/coinTypes';
import { RootState } from '../store';

type SearchState = {
  searchData: SearchCoin[] | [],
  loading: boolean,
}

const initialState : SearchState = {
  searchData: [],
  loading: false,
};

export const getSearchData = createAsyncThunk <SearchCoin[],{search:string },{}>(
  'search/getSearchData',
  async ({search}) => {
    try {
      const response = await getDataRequest(searchDataQuery(search));
      return response.coins;
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'getSearchData error: Request failed',
      });
      throw error;
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
      .addCase(getSearchData.fulfilled, (state, action: PayloadAction<SearchCoin[]> ) => {
        state.loading = false;
        state.searchData = action.payload;
      })
      .addCase(getSearchData.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectSearchData = (state:RootState) => state.search.searchData;
export const selectSearchLoading = (state:RootState) => state.search.loading;

export const { resetSearchData } = searchSlice.actions;

export default searchSlice.reducer;
