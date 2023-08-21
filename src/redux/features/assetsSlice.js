import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'react-native-axios';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const baseUrl = 'https://api.coingecko.com/api/v3';

const initialState = {
  assetsCoinsData: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getAssetsCoins = createAsyncThunk(
  'assets/getAssetsCoin',
  async (coins, { getState }) => {
    let coinsNames = coins.map(i => i.id).join(',');
    const response = await axios.get(
      `${baseUrl}/coins/markets?vs_currency=usd&ids=${coinsNames}&order=market_cap_desc&per_page=15&page=1&sparkline=true&price_change_percentage=7d&locale=en`,
    );
    console.time('setTime');
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
    console.timeEnd('setTime');
    return newAssets;
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
      .addCase(getAssetsCoins.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAssetsCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assetsCoinsData = action.payload;
      })
      .addCase(getAssetsCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAssetsCoinsData = state => state.assets.assetsCoinsData;
export const getAssetsStatus = state => state.assets.status;

export const { addAssetsCoin, delAssetsCoin } = assetsSlice.actions;

export default assetsSlice.reducer;
