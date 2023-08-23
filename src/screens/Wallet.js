import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AssetsItem } from '../components/AssetsItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChartPie } from '../components/PieChart';

import { COLORS, FONTS } from '../constants';
import { useSelector } from 'react-redux';
import { SwipeListItem } from '../components/SwipeListItem';
import {
  delAssetsCoin,
  selectAssetsCoinsData,
} from '../redux/features/assetsSlice';
import { useNavigation } from '@react-navigation/native';

export const WalletScreen = () => {
  const navigation = useNavigation();
  let assetsCoinData = useSelector(selectAssetsCoinsData);

  const totalPrice = assetsCoinData
    ?.reduce((acc, item) => acc + item.current_price * item.quantity, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.chartPieContainer}>
        <ChartPie assetsCoinData={assetsCoinData} />
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Total balance</Text>
          <Text style={styles.balanceSum}>${totalPrice}</Text>
          {/* <Text style={styles.balanceSumBtc}>BTC: 1.6564</Text> */}
        </View>
      </View>
      <View style={styles.assetBlock}>
        <Text style={styles.textContent}>Assets</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons
            name={'add-circle-outline'}
            size={34}
            color={COLORS.lightGray}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginBottom: 55 }}>
        {assetsCoinData?.length ? (
          <SwipeListItem
            data={assetsCoinData}
            renderItemComponent={AssetsItem}
            onDelFunc={delAssetsCoin}
            isWalletPage={true}
          />
        ) : (
          <Text style={{ color: '#ccc', textAlign: 'center' }}>no coins</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.mainBg,
  },
  chartPieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  balanceContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  balanceText: {
    ...FONTS.textLight,
    color: COLORS.tabBottomGray,
    fontSize: 18,
    lineHeight: 20,
  },
  balanceSum: {
    ...FONTS.textRegular,
    fontSize: 20,
    lineHeight: 24,
  },
  balanceSumBtc: {
    ...FONTS.textLight,
    color: COLORS.tabBottomGray,
    lineHeight: 18,
  },
  assetBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textContent: {
    marginVertical: 10,
    ...FONTS.textRegular,
    fontSize: 18,
  },
});
