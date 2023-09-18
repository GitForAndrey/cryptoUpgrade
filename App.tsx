import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { COLORS } from './src/constants';
import { StatusBar } from 'react-native';
import { AuthTabs } from './src/navigation/authStack';
import { MainStackNav } from './src/navigation/mainStack';
import { checkAuthUser, selectUser } from './src/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from './src/redux/store';

const toastConfig = {
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: COLORS.chartColorGreen }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  error:  (props:any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: COLORS.chartColorRed }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
};

export const App = () => {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector(selectUser);

  //check is active user in storage and close splash screen
  useEffect(() => {
    dispatch(checkAuthUser()).then(() => {
      RNBootSplash.hide({ fade: true, duration: 500 });
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor={COLORS.mainBg} barStyle="light-content" />
      {isUser ? <MainStackNav /> : <AuthTabs />}
      <Toast visibilityTime={3000} config={toastConfig} />
    </>
  );
};
