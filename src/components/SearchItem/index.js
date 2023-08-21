import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { getSearchCoin } from '../../redux/features/coinSlice';
import styles from './style';

export const SearchItem = ({ coin }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressHandle = () => {
    dispatch(getSearchCoin(coin.id));
    navigation.navigate('Coin');
  };
  return (
    <TouchableOpacity onPress={() => onPressHandle()} style={styles.container}>
      <Image source={{ uri: coin.thumb }} style={styles.coinImage} />
      <View style={styles.textContent}>
        <Text style={styles.coinName}>{coin.name}</Text>
        <Text style={styles.coinSymbol}>{coin.symbol}</Text>
      </View>
      <Text style={styles.coinSymbol}>#{coin.market_cap_rank}</Text>
    </TouchableOpacity>
  );
};
