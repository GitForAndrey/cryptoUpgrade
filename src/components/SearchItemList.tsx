import React,{FunctionComponent} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SearchItem } from './SearchItem';
import { SearchCoin } from '../types/coinTypes';

interface SearchItemListProps {
  data: SearchCoin[],
}

export const SearchItemList:FunctionComponent<SearchItemListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SearchItem coin={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({});
