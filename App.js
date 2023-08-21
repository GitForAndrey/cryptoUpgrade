import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { COLORS } from './src/constants';
import { StatusBar } from 'react-native';
import { AuthTabs } from './src/navigation/authStack';
import { MainStackNav } from './src/navigation/mainStack';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthUser, selectUser } from './src/redux/features/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
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
      style={{ borderLeftColor: 'red' }}
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
    RNBootSplash.hide({ fade: true, duration: 500 });
    dispatch(checkAuthUser());
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.mainBg} barStyle="light-content" />
        {isUser?.uid ? <MainStackNav /> : <AuthTabs />}
        <Toast visibilityTime={1500} config={toastConfig} />
      </SafeAreaView>
    </>
  );
};