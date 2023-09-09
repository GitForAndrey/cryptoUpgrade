import { createSlice, createAsyncThunk, PayloadAction,Dispatch } from '@reduxjs/toolkit';
import { assetsCoinsQuery } from '../../api/queries';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getDataRequest } from '../../api/api';
import { accessCollectionDb, fetchAccessCollection } from '../../api/firebase';
import { AssetsCoin, Coin, WithWishlistCoin } from '../../types/coinTypes';
import { RootState } from '../store';
import { User } from './authSlice';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

type AssetsState = {
  assetsCoinsData: AssetsCoin[];
  loading: boolean;
}
type GetAssetsCoinsValue= Pick<AssetsCoin, 'coinBuyPrice' | 'fillColor' | 'id' | 'quantity'>;


const initialState: AssetsState = {
  assetsCoinsData: [],
  loading: false,
};

export const getAssetsCoins = createAsyncThunk<AssetsCoin[],GetAssetsCoinsValue[],{}>(
  'assets/getAssetsCoin',
  async (coins) => {
    let coinsNames = coins.map(i => i.id).join(',');
    try {
      const response = await getDataRequest(assetsCoinsQuery(coinsNames));
      const newAssets = response.map((coin:Coin) => {
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
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'assetsCoinsQuery error: Request failed',
      });
      throw error;
    }
  },
);
export const saveAssetsFirebase = createAsyncThunk< void,{ parsedCoinPrice: number, parsedQuantity:number, coin: Coin }, {state:RootState, dispatch:Dispatch }>(
  'assets/saveAssetsFirebase',
  async (
    { parsedCoinPrice, parsedQuantity, coin },
    { getState, dispatch },
  ) => {
    console.log(typeof parsedCoinPrice,typeof parsedQuantity,typeof coin);
    const userUid = getState().auth.user?.uid;
    let color = getRandomColor();
    let assetsCoin = {
      id: coin.id,
      quantity: parsedQuantity,
      coinBuyPrice: parsedCoinPrice,
      fillColor: color,
    };
    try {
      accessCollectionDb(userUid, 'assets', coin.id, assetsCoin);
      dispatch(addAssetsCoin(parsedCoinPrice, parsedQuantity, color, coin));
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'saveAssetsFirebase error: Request failed',
      });
      throw error;
    }
    return undefined;
  },
);
export const deleteAssetsFirebase = createAsyncThunk< void, WithWishlistCoin, {state:{auth:{user:User}}, dispatch:Dispatch }>(
  'assets/deleteAssetsFirebase',
  async (coin, { getState, dispatch }) => {
    const userUid = getState().auth.user?.uid;
    try {
      accessCollectionDb(userUid, 'assets', coin.id);
      dispatch(delAssetsCoin(coin.id));
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'deleteAssetsFirebase error: Request failed',
      });
      throw error;
    }
    return undefined;
  },
);
export const fetchAssetsFromFirebase = createAsyncThunk<void, void, {state:RootState, dispatch:Dispatch<any> }>(
  'assets/fetchAssetsFromFirebase',
  async (_, {getState, dispatch}) => {
    const userId =  getState().auth.user?.uid;
    try {
      let results:GetAssetsCoinsValue[] = await fetchAccessCollection(userId, 'assets');
      dispatch(getAssetsCoins(results));
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text2: 'fetchAssetsFromFirebase error: Request failed',
      });
      throw error;
    }
  },
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAssetsCoin: {
      reducer(state, action: PayloadAction<AssetsCoin>) {
        state.assetsCoinsData.push(action.payload);
      },
      prepare(coinBuyPrice:number, quantity:number, color:string, coin:Coin) {
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

    delAssetsCoin(state, action: PayloadAction<string>) {
      state.assetsCoinsData = state.assetsCoinsData.filter(
        item => item.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAssetsCoins.fulfilled, (state, action: PayloadAction<AssetsCoin[]>) => {
        state.loading = false;
        state.assetsCoinsData = action.payload;
      })
      .addCase(getAssetsCoins.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAssetsFromFirebase.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAssetsFromFirebase.fulfilled, (state) => {
        state.assetsCoinsData = [];
      });
  },
});

export const selectAssetsCoinsData = (state:RootState) => state.assets.assetsCoinsData;
export const getAssetsLoading = (state:RootState) => state.assets.loading;

export const { addAssetsCoin, delAssetsCoin } = assetsSlice.actions;

export default assetsSlice.reducer;
