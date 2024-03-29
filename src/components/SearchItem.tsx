import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent} from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { SearchCoin } from '../types/coinTypes';
import { MainStackParamList } from '../navigation/mainStack';


interface SearchItemProps {
  coin: SearchCoin,
}

export const SearchItem:FunctionComponent<SearchItemProps> = React.memo(({ coin }) => {
  const navigation = useNavigation<NavigationProp<MainStackParamList, 'Coin'>>();
  const onPressHandle = () => {
    navigation.navigate('Coin', {
      coinId: coin.id,
    });
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
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.transparentLightGray,
  },
  coinImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  textContent: {
    alignSelf: 'flex-start',
    flexGrow: 2,
  },
  coinName: {
    ...FONTS.textRegular,
    fontSize: 16,
  },
  coinSymbol: {
    ...FONTS.textLight,
    color: COLORS.lightGray,
  },
});
