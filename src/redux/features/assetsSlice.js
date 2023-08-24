import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { assetsCoinsQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getDataRequest } from '../../api/api';

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
  async (coins, { getState, rejectWithValue }) => {
    let coinsNames = coins.map(i => i.id).join(',');

    try {
      const response = await getDataRequest(assetsCoinsQuery(coinsNames));
      const existingAssets = getState().assets.assetsCoinsData;
      const newAssets = response.data.map(coin => {
        const newCoin = existingAssets.find(asset => asset.id === coin.id);
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

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAssetsCoin: {
      reducer(state, action) {
        state.assetsCoinsData.push(action.payload);
      },
      prepare(coinBuyPrice, quantity, coin) {
        let color = getRandomColor();
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
      .addCase(getAssetsCoins.pending, state => {
        state.loading = true;
      })
      .addCase(getAssetsCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.assetsCoinsData = action.payload;
      })
      .addCase(getAssetsCoins.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectAssetsCoinsData = state => state.assets.assetsCoinsData;
export const getAssetsLoading = state => state.assets.loading;

export const { addAssetsCoin, delAssetsCoin } = assetsSlice.actions;

export default assetsSlice.reducer;
