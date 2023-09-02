import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AssetsCardEmpty } from './AssetsCardEmpty';
import { AssetsCard } from './AssetsCard';
import { Coin } from '../types/coinTypes';

interface AssetsCardListProps {
  data:Coin[]
}

export const AssetsCardList: FunctionComponent<AssetsCardListProps> = ({ data }) => {
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
