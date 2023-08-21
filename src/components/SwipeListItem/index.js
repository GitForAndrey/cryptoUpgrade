import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import styles from './style';

export const SwipeListItem = ({
  data,
  renderItemComponent,
  onAddFunc,
  onDelFunc,
  isWishlistPage = false,
  isWalletPage = false,
}) => {
  let dispatch = useDispatch();
  const RenderItemComponent = renderItemComponent;
  const renderItem = (item, func, color, iconName, text) => (
    <TouchableOpacity
      onPress={() => dispatch(func(item))}
      style={{
        ...styles.rightAction,
        backgroundColor: color,
        height: isWalletPage ? 70 : 50,
      }}
      activeOpacity={0.8}>
      <Icon name={iconName} size={24} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SwipeListView
      data={data}
      renderItem={({ item }) => (
        <RenderItemComponent coin={item} key={item.id} />
      )}
      keyExtractor={item => item.id}
      renderHiddenItem={({ item }) =>
        item.isWishlist || isWishlistPage || isWalletPage
          ? renderItem(item, onDelFunc, 'rgba(253,27,27,0.6)', 'close', 'Del')
          : renderItem(
              item,
              onAddFunc,
              'rgba(255,145,26,0.8)',
              'star-outline',
              'Add',
            )
      }
      rightOpenValue={-75}
      disableRightSwipe={true}
    />
  );
};
