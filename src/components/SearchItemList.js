import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SearchItem } from './SearchItem';

export const SearchItemList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <SearchItem coin={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({});
