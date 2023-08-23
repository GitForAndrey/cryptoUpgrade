import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import styles from './style';
import { COLORS } from '../../constants';

export const SwipeListItem = ({
  data,
  renderItemComponent,
  onAddFunc,
  onDelFunc,
  isWishlistPage = false,
  isWalletPage = false,
  onLoadMore,
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
      useFlatList={true}
      data={data}
      renderItem={({ item }) => (
        <RenderItemComponent coin={item} key={item.id} />
      )}
      keyExtractor={item => item.id}
      renderHiddenItem={({ item }) =>
        item.isWishlist || isWishlistPage || isWalletPage
          ? renderItem(item, onDelFunc, COLORS.itemColorAdd, 'close', 'Del')
          : renderItem(
              item,
              onAddFunc,
              COLORS.itemColorDel,
              'star-outline',
              'Add',
            )
      }
      rightOpenValue={-75}
      disableRightSwipe={true}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};
