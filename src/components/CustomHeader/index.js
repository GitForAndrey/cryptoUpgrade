import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButton } from '../HeaderButton';
import styles from './style';

export const CustomHeader = ({
  title,
  userName,
  handleOnSearch,
  handleGoBack,
  onAddFunc,
  onDelFunc,
  isWishlist,
  home = false,
  searchIcon = false,
  backIcon = false,
  wishlistIcon = false,
}) => {
  const renderWishlistIcon = (icon, func) => {
    return (
      <HeaderButton
        icon={icon}
        style={styles.headerRightButton}
        handleOnPress={() => func()}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {backIcon && (
          <HeaderButton
            icon={'chevron-back-outline'}
            handleOnPress={handleGoBack}
          />
        )}
        {home && (
          <View>
            <Text style={styles.textHome}>Hello, {userName}!</Text>
            <Text style={styles.textHome}>Wellcome to CryptoApp</Text>
          </View>
        )}
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.textContent}>{title}</Text>
      </View>
      <View style={styles.rightContent}>
        {searchIcon && (
          <HeaderButton
            icon={'search-outline'}
            style={styles.headerRightButton}
            handleOnPress={() => handleOnSearch()}
          />
        )}
        {wishlistIcon &&
          (isWishlist
            ? renderWishlistIcon('star', onDelFunc)
            : renderWishlistIcon('star-outline', onAddFunc))}
        <HeaderButton
          icon={'notifications-outline'}
          style={styles.headerRightButton}
        />
      </View>
    </View>
  );
};
