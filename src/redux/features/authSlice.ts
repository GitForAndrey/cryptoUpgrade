import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, PayloadAction,Dispatch } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { RootState } from '../store';

export type User = {
  displayName:string,
  email:string,
  uid:string,
}
export type UserState = {
  user: User | null,
  loading: boolean,
}

const initialState: UserState = {
  user: null, // null | {displayName:'Satoshi', email:'test@test.ua', uid:'sdf8dsf7sdf78' }
  loading: false, // false/true
};

export const userRegistration = createAsyncThunk<User,{name: string, email:string, password: string }, {}>(
  'auth/userRegistration',
  async ({ name, email, password }) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const { user } = userCredential;
      await user.updateProfile({
        displayName: name,
      });
      // Add the username to the user's Firestore document
      const usersCollectionRef = firestore().collection('users');
      const userDocRef = usersCollectionRef.doc(user.uid);
      await userDocRef.set({ name });

      //shows notification
      Toast.show({
        type: 'success',
        text2: 'Successful new user registration!',
      });

      return { uid: user.uid, email: user.email || '', displayName: name };
    } catch (error:any) {
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          text2: 'This email address is already in use!',
        });
        throw error;
      } else if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text2: 'Invalid email address, try another!',
        });
        throw error;
      } else {
        console.error(error);
        Toast.show({
          type: 'error',
          text2: 'Registration error!',
        });
        throw error;
      }
    }
  },
);
export const userSignIn = createAsyncThunk<User,{email:string, password: string }, {dispatch:Dispatch}>(
  'auth/userSignIn',
  async ({ email, password }) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      //save user  data to storage
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          displayName: user.displayName || '',
          email: user.email || '',
          uid: user.uid,
        }),
      );
      return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
      };
    } catch (error: any) {
      if (error.code === 'auth/wrong-password' || 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text2: 'Invalid password or email!',
        });
        throw error;
      } else {
        Toast.show({
          type: 'error',
          text2: 'Login failed, try again later!',
        });
        throw error;
      }
    }
  },
);
export const checkAuthUser = createAsyncThunk<void,void, {dispatch:Dispatch}>(
  'auth/checkAuthUser',
  async (_, { dispatch }) => {
    try {
      const userJSON = await AsyncStorage.getItem('user');
      if (userJSON){
        const user = JSON.parse(userJSON);
        user?.uid ? dispatch(setUserFromStorage(user)) : null;
      }
    } catch (error) {
      console.error('Failed to check user:', error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserFromStorage(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userRegistration.pending, state => {
        state.loading = true;
      })
      .addCase(userRegistration.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userRegistration.rejected, state => {
        state.loading = false;
      })
      .addCase(userSignIn.pending, state => {
        state.loading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userSignIn.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectLoading = (state:RootState) => state.auth.loading;
export const selectUser = (state:RootState) => state.auth.user;

export const { setUserFromStorage, logoutUser } = authSlice.actions;

export default authSlice.reducer;
