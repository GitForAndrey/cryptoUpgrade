import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  WalletScreen,
  HomeScreen,
  WishListScreen,
  SettingsScreen,
} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const Tabs = createBottomTabNavigator();

function getTabIcon(routeName, focused) {
  if (routeName === 'Home') {
    return focused ? 'home' : 'home-outline';
  } else if (routeName === 'Wallet') {
    return focused ? 'wallet' : 'wallet-outline';
  } else if (routeName === 'WishList') {
    return focused ? 'star' : 'star-outline';
  } else if (routeName === 'Settings') {
    return focused ? 'settings' : 'settings-outline';
  } else {
    return null;
  }
}

export const BottomTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.tabBottomGray,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          paddingTop: 8,
          borderTopWidth: 0,
          shadowColor: 'transparent',
          backgroundColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 8,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={300}
            overlayColor={'transparent'}
            style={{
              position: 'absolute',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={getTabIcon(route.name, focused)}
              size={24}
              color={color}
              style={styles.icons}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={getTabIcon(route.name, focused)}
              size={24}
              color={color}
              style={styles.icons}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="WishList"
        component={WishListScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={getTabIcon(route.name, focused)}
              size={24}
              color={color}
              style={styles.icons}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={getTabIcon(route.name, focused)}
              size={24}
              color={color}
              style={styles.icons}
            />
          ),
        })}
      />
    </Tabs.Navigator>
  );
};
const styles = StyleSheet.create({
  icons: {
    height: 28,
    paddingBottom: 3,
  },
});
