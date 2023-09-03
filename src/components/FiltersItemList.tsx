import React,{FunctionComponent} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FiltersItem } from './FiltersItem';

interface FiltersElement {
  id:string,
  title:string ,
}

interface FiltersItemListProps {
  data:FiltersElement[],
  activeFilter:string,
  handleFilterOnPress: (value: string) => void,
}

export const FiltersItemList: FunctionComponent<FiltersItemListProps> = ({
  data,
  activeFilter,
  handleFilterOnPress,
}) => {
  return (
    <View style={styles.filters_container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
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
