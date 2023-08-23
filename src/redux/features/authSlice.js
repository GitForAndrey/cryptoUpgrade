import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const initialState = {
  user: {}, // null || {displayName:'Satoshi', email:'test@test.ua', uid:'sdf8dsf7sdf78' }
  loading: false, // false/true
};

export const userRegistration = createAsyncThunk(
  'auth/userRegistration',
  async (payload, { rejectWithValue }) => {
    const { name, email, password } = payload;
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

      return { uid: user.uid, email: user.email, displayName: name };
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Toast.show({
          type: 'error',
          text2: 'This email address is already in use!',
        });
        return rejectWithValue();
      } else if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text2: 'Invalid email address, try another!',
        });
        return rejectWithValue();
      } else {
        console.error(error);
        Toast.show({
          type: 'error',
          text2: 'Registration error!',
        });
        return rejectWithValue();
      }
    }
  },
);
export const userSignIn = createAsyncThunk(
  'auth/userSignIn',
  async (payload, { rejectWithValue }) => {
    const { email, password } = payload;

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      //save user  data to storage
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        }),
      );
      console.log('2222222222222222', user);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      if (error.code === 'auth/wrong-password' || 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text2: 'Invalid password or email!',
        });
        return rejectWithValue();
      } else {
        Toast.show({
          type: 'error',
          text2: 'Login failed, try again later!',
        });
        return rejectWithValue();
      }
    }
  },
);
export const checkAuthUser = createAsyncThunk(
  'auth/checkAuthUser',
  async (_, { dispatch }) => {
    try {
      const userJSON = await AsyncStorage.getItem('user');
      const user = JSON.parse(userJSON);
      console.log('setUserFromStorage', user);
      if (user?.uid) {
        dispatch(setUserFromStorage(user));
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
    setUserFromStorage(state, action) {
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
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userRegistration.rejected, state => {
        state.loading = false;
      })
      .addCase(userSignIn.pending, state => {
        state.loading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userSignIn.rejected, state => {
        state.loading = false;
      });
  },
});

export const selectLoading = state => state.auth.loading;
export const selectUser = state => state.auth.user;

export const { setUserFromStorage, logoutUser } = authSlice.actions;

export default authSlice.reducer;
