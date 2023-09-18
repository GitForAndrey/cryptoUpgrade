import React, { FunctionComponent, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { COLORS, GLOB_STYLE, SIZES } from '../constants';
import {
  getSearchData,
  resetSearchData,
  selectSearchData,
  selectSearchLoading,
} from '../redux/features/searchSlice';
import { SearchItemList } from '../components/SearchItemList';
import { useAppDispatch, useAppSelector } from '../redux/store';

export const SearchScreen:FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [value, onChangeText] = useState('');
  const coinData = useAppSelector(selectSearchData);
  const searchLoading = useAppSelector(selectSearchLoading);

  //get data on search input
  const handleSearch = (search:string) => {
    onChangeText(search);
    if (search.length >= 3) {
      dispatch(getSearchData(search));
    } else {
      dispatch(resetSearchData());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search for a coin"
          value={value}
          placeholderTextColor={COLORS.lightGray}
          onChangeText={handleSearch}
          style={styles.inputField}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Ionicons name={'search-outline'} size={30} color={COLORS.white} />
      </View>
      {searchLoading ? (
        <LoadingIndicator />
      ) : (
        <SearchItemList data={coinData} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { ...GLOB_STYLE.screenContainer },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 15,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: SIZES.radius,
  },
  inputField: {
    flex: 1,
    color: COLORS.white,
    fontSize: 17,
  },
});
