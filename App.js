import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { COLORS } from './src/constants';
import { StatusBar } from 'react-native';
import { AuthTabs } from './src/navigation/authStack';
import { MainStackNav } from './src/navigation/mainStack';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthUser, selectUser } from './src/redux/features/authSlice';

const toastConfig = {
  success: props => (
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
  error: props => (
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
  const dispatch = useDispatch();
  const isUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(checkAuthUser()).then(() => {
      RNBootSplash.hide({ fade: true, duration: 500 });
    });
  }, []);

  return (
    <>
      <StatusBar backgroundColor={COLORS.mainBg} barStyle="light-content" />
      {isUser?.uid ? <MainStackNav /> : <AuthTabs />}
      <Toast visibilityTime={1500} config={toastConfig} />
    </>
  );
};
