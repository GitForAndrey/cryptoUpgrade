import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assetsCoinsQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getDataRequest } from '../../api/api';
import { accessCollectionDb, fetchAccessCollection } from '../../api/firebase';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const initialState = {
  assetsCoinsData: [],
  loading: false,
};

export const getAssetsCoins = createAsyncThunk(
  'assets/getAssetsCoin',
  async (coins, { rejectWithValue }) => {
    let coinsNames = coins.map(i => i.id).join(',');
    try {
      const response = await getDataRequest(assetsCoinsQuery(coinsNames));
      const newAssets = response.map(coin => {
        const newCoin = coins.find(asset => asset.id === coin.id);
        if (newCoin) {
          return {
            ...coin,
            quantity: newCoin.quantity,
            coinBuyPrice: newCoin.coinBuyPrice,
            fillColor: newCoin.fillColor,
          };
        }
      });
      return newAssets;
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'assetsCoinsQuery error: Request failed',
      });
      return rejectWithValue();
    }
  },
);
export const saveAssetsFirebase = createAsyncThunk(
  'assets/saveAssetsFirebase',
  async (
    { coinPriceInput, quantityInput, coin },
    { getState, rejectWithValue, dispatch },
  ) => {
    const user = getState().auth.user.uid;
    let color = getRandomColor();
    let assetsCoin = {
      id: coin.id,
      quantity: quantityInput,
      coinBuyPrice: coinPriceInput,
      fillColor: color,
    };
    try {
      accessCollectionDb(user, 'assets', coin.id, assetsCoin);
      dispatch(addAssetsCoin(coinPriceInput, quantityInput, color, coin));
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'saveAssetsFirebase error: Request failed',
      });
      return rejectWithValue();
    }
  },
);
export const deleteAssetsFirebase = createAsyncThunk(
  'assets/deleteAssetsFirebase',
  async (coin, { getState, rejectWithValue, dispatch }) => {
    const user = getState().auth.user.uid;
    try {
      accessCollectionDb(user, 'assets', coin.id);
      dispatch(delAssetsCoin(coin));
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'deleteAssetsFirebase error: Request failed',
      });
      return rejectWithValue();
    }
  },
);
export const fetchAssetsFromFirebase = createAsyncThunk(
  'assets/fetchAssetsFromFirebase',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const user = getState().auth.user.uid;
    try {
      let results = await fetchAccessCollection(user, 'assets');
      if (results.length) {
        dispatch(getAssetsCoins(results));
      } else {
        return;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'fetchAssetsFromFirebase error: Request failed',
      });
      return rejectWithValue();
    }
  },
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAssetsCoin: {
      reducer(state, action) {
        state.assetsCoinsData.push(action.payload);
      },
      prepare(coinBuyPrice, quantity, color, coin) {
        return {
          payload: {
            ...coin,
            quantity,
            coinBuyPrice,
            fillColor: color,
          },
        };
      },
    },

    delAssetsCoin(state, action) {
      state.assetsCoinsData = state.assetsCoinsData.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAssetsCoins.pending, state => {})
      .addCase(getAssetsCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.assetsCoinsData = action.payload;
      })
      .addCase(getAssetsCoins.rejected, state => {})
      .addCase(fetchAssetsFromFirebase.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAssetsFromFirebase.fulfilled, (state, action) => {
        state.assetsCoinsData = [];
      });
  },
});

export const selectAssetsCoinsData = state => state.assets.assetsCoinsData;
export const getAssetsLoading = state => state.assets.loading;

export const { addAssetsCoin, delAssetsCoin } = assetsSlice.actions;

export default assetsSlice.reducer;
