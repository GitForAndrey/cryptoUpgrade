import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './bottomTabs';
import { CoinScreen, NotificationScreen, SearchScreen } from '../screens';
import { GLOB_STYLE } from '../constants';
import { HeaderButton } from '../components/HeaderButton';

const renderBackButton = navigation => (
  <HeaderButton
    icon={'chevron-back-outline'}
    handleOnPress={() => navigation.goBack()}
  />
);

const Stack = createNativeStackNavigator();

export const MainStackNav = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        ...GLOB_STYLE.headerBasic,
      }}>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Coin"
        component={CoinScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
        })}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={({ navigation }) => ({
          headerLeft: () => renderBackButton(navigation),
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
