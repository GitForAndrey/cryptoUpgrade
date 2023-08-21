import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RestorePasswordScreen, SignInScreen, SignUpScreen } from '../screens';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();

export const AuthTabs = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Sign up',
          headerStyle: {
            backgroundColor: COLORS.mainBg,
          },
          headerTintColor: COLORS.lightGray,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="RestorePassword"
        component={RestorePasswordScreen}
        options={{
          title: 'Restore password',
          headerStyle: {
            backgroundColor: COLORS.mainBg,
          },
          headerTintColor: COLORS.lightGray,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
