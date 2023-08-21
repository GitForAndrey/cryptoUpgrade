import React, { useState } from 'react';
import { Modal, View, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButton } from '../HeaderButton';
import { SearchItem } from '../SearchItem';
import { COLORS } from '../../constants';
import styles from './style';

export const SearchModal = ({ visible, handleOnBack }) => {
  const [value, onChangeText] = useState('');
  const [coinData, setCoinData] = useState([]);

  const fetchCoins = async query => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`,
    );
    const data = await response.json();
    setCoinData(data.coins);
  };
  const handleSearch = text => {
    onChangeText(text);
    if (text.length >= 3) {
      fetchCoins(text);
    } else {
      setCoinData([]);
    }
  };
  const renderItem = ({ item }) => <SearchItem coin={item} />;

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => handleOnBack()}>
      <View style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <HeaderButton
            icon={'chevron-back-outline'}
            handleOnPress={() => handleOnBack()}
          />
        </View>
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
          <Ionicons
            name={'search-outline'}
            size={30}
            color={COLORS.lightGray}
          />
        </View>
        {coinData && (
          <FlatList
            data={coinData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </Modal>
  );
};
