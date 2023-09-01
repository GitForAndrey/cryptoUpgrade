import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FiltersItem } from './FiltersItem';

export const FiltersItemList = ({
  data,
  activeFilter,
  handleFilterOnPress,
}) => {
  return (
    <View style={styles.filters_container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <FiltersItem
              item={item}
              isActive={activeFilter === item.id}
              handleFilterOnPress={handleFilterOnPress}
            />
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        AssetsCard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filters_container: {
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});
