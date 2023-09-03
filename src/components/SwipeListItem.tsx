import React,{FunctionComponent} from 'react';
import {StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS } from '../constants';
import { WithWishlistCoin } from '../types/coinTypes';
import { SwipeHiddenItem } from './SwipeHiddenItem';

interface SwipeListItemProps {
  data: WithWishlistCoin[],
  RenderItemComponent: FunctionComponent<any>,
  onAddFunc:(() => void | undefined),
  onDelFunc:(() => void | undefined),
  isWishlistPage?:boolean,
  isWalletPage?:boolean,
  onLoadMore: () => Promise<void>,
}

export const SwipeListItem:FunctionComponent<SwipeListItemProps> = ({
  data,
  RenderItemComponent,
  onAddFunc,
  onDelFunc,
  isWishlistPage = false,
  isWalletPage = false,
  onLoadMore,
}) => {
const colorAdd = COLORS.itemColorAdd;
const colorDel = COLORS.itemColorDel;
  return (
    <SwipeListView
      useFlatList={true}
      data={data}
      renderItem={({ item }) => (
        <RenderItemComponent coin={item} key={item.id} />
      )}
      keyExtractor={item => item.id}
      renderHiddenItem={({ item }) =>
        (item.isWishlist || isWishlistPage || isWalletPage)
          ? <SwipeHiddenItem item={item} handleOnPress={onDelFunc} color={colorAdd} iconName ={'close'}  title={'Del'} isWalletPage={isWalletPage} />
          : <SwipeHiddenItem item={item} handleOnPress={onAddFunc} color={colorDel} iconName={'star-outline'} title={'Add'} isWalletPage={isWalletPage} />
      }
      rightOpenValue={-75}
      disableRightSwipe={true}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  
});
