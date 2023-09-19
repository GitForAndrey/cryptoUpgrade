import React,{FunctionComponent} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SearchItem } from './SearchItem';
import { SearchCoin } from '../types/coinTypes';

interface SearchItemListProps {
  data: SearchCoin[],
}

//some space from bottom
const renderFooter = () => (
  <View style={{minHeight:80}} />
);

export const SearchItemList:FunctionComponent<SearchItemListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SearchItem coin={item} />}
      keyExtractor={item => item.id}
      ListFooterComponent={renderFooter}
    />
  );
};

