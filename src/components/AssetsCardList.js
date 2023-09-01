import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { AssetsCardEmpty } from './AssetsCardEmpty';
import { AssetsCard } from './AssetsCard';

export const AssetsCardList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item, index }) => {
        return <AssetsCard coin={item} firstStyle={index === 0} />;
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<AssetsCardEmpty />}
    />
  );
};

const styles = StyleSheet.create({});
