import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { SearchItem } from '../components/SearchItem';
import { COLORS } from '../constants';
import {
  getSearchData,
  resetSearchData,
  selectSearchData,
  selectSearchStatus,
} from '../redux/features/searchSlice';

export const SearchScreen = () => {
  const dispatch = useDispatch();
  const [value, onChangeText] = useState('');
  const coinData = useSelector(selectSearchData);
  const searchLoading = useSelector(selectSearchStatus);

  const handleSearch = text => {
    onChangeText(text);
    if (text.length >= 3) {
      dispatch(getSearchData(text));
    } else {
      dispatch(resetSearchData());
    }
  };
  const renderItem = ({ item }) => <SearchItem coin={item} />;

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
        <Ionicons name={'search-outline'} size={30} color={COLORS.lightGray} />
      </View>
      {searchLoading === 'loading' ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={coinData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.mainBg },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 15,
    backgroundColor: COLORS.transparentLightGray,
    borderRadius: 12,
  },
  inputField: {
    flex: 1,
    color: COLORS.lightGray,
    fontSize: 17,
  },
});
