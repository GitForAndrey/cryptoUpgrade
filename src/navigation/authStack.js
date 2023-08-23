import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RestorePasswordScreen, SignInScreen, SignUpScreen } from '../screens';
import { COLORS } from '../constants';
import { HeaderButton } from '../components/HeaderButton';

const renderBackButton = navigation => (
  <HeaderButton
    icon={'chevron-back-outline'}
    handleOnPress={() => navigation.goBack()}
  />
);

const Stack = createNativeStackNavigator();

export const AuthTabs = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.mainBg,
        },
        headerTintColor: COLORS.lightGray,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
          title: 'Sign up',
        })}
      />
      <Stack.Screen
        name="RestorePassword"
        component={RestorePasswordScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
          title: 'Restore password',
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
