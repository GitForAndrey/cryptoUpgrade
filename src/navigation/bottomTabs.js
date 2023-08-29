import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AssetsScreen,
  HomeScreen,
  WishListScreen,
  SettingsScreen,
} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, GLOB_STYLE } from '../constants';
import { StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { HeaderButton } from '../components/HeaderButton';

const Tabs = createBottomTabNavigator();

function getTabIcon(routeName, focused) {
  if (routeName === 'Home') {
    return focused ? 'home' : 'home-outline';
  } else if (routeName === 'Assets') {
    return focused ? 'wallet' : 'wallet-outline';
  } else if (routeName === 'WishList') {
    return focused ? 'star' : 'star-outline';
  } else if (routeName === 'Settings') {
    return focused ? 'settings' : 'settings-outline';
  } else {
    return null;
  }
}
const renderHeaderButtons = navigation => (
  <View style={styles.headerButtonsContainer}>
    <HeaderButton
      icon={'search-outline'}
      handleOnPress={() => navigation.navigate('Search')}
    />
    <HeaderButton
      icon={'notifications-outline'}
      handleOnPress={() => navigation.navigate('Notification')}
    />
  </View>
);
const renderTabBarIcon = (routeName, focused, color) => (
  <Icon
    name={getTabIcon(routeName, focused)}
    size={24}
    color={color}
    style={styles.icons}
  />
);
const renderTabBarBackground = () => (
  <BlurView
    tint="dark"
    intensity={300}
    overlayColor={'transparent'}
    style={styles.blurBg}
  />
);

export const BottomTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        ...GLOB_STYLE.headerBasic,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.tabBottomGray,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarBackground: () => renderTabBarBackground(),
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerRight: () => renderHeaderButtons(navigation),
          tabBarIcon: ({ color, focused }) =>
            renderTabBarIcon(route.name, focused, color),
        })}
      />
      <Tabs.Screen
        name="Assets"
        component={AssetsScreen}
        options={({ navigation, route }) => ({
          headerRight: () => renderHeaderButtons(navigation),
          tabBarIcon: ({ color, focused }) =>
            renderTabBarIcon(route.name, focused, color),
        })}
      />
      <Tabs.Screen
        name="WishList"
        component={WishListScreen}
        options={({ navigation, route }) => ({
          headerRight: () => renderHeaderButtons(navigation),
          tabBarIcon: ({ color, focused }) =>
            renderTabBarIcon(route.name, focused, color),
        })}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ color, focused }) =>
            renderTabBarIcon(route.name, focused, color),
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
  blurBg: {
    position: 'absolute',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tabBarStyle: {
    position: 'absolute',
    height: 80,
    paddingTop: 8,
    borderTopWidth: 0,
    shadowColor: 'transparent',
    backgroundColor: 'transparent',
  },
  tabBarLabelStyle: { fontSize: 12, paddingBottom: 8 },
  headerButtonsContainer: {
    flexDirection: 'row',
  },
});
