import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AssetsItem } from '../components/AssetsItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChartPie } from '../components/ChartPie';

import { COLORS, FONTS, GLOB_STYLE } from '../constants';
import { SwipeListItem } from '../components/SwipeListItem';
import {
  deleteAssetsFirebase,
  selectAssetsCoinsData,
} from '../redux/features/assetsSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { ContentTitle } from '../components/ContentTitle';
import { useAppSelector } from '../redux/store';

export const AssetsScreen = () => {
  // Ignore all logs for this screen, have some error with chart lib
  LogBox.ignoreAllLogs();

  const navigation: NavigationProp<ParamListBase> = useNavigation();
  let assetsCoinData = useAppSelector(selectAssetsCoinsData);

  // Calculate total asset balance
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
        </View>
      </View>
      <View style={styles.assetBlock}>
        <ContentTitle
          title={'My assets'}
          style={styles.title_block}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons
            name={'add-circle-outline'}
            size={34}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.list_container}>
        {assetsCoinData?.length ? (
          <SwipeListItem
            data={assetsCoinData}
            RenderItemComponent={AssetsItem}
            onDelFunc={deleteAssetsFirebase}
            isWalletPage={true}
          />
        ) : (
          <Text style={styles.list_empty}>no coins</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GLOB_STYLE.screenContainer,
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
    fontSize: 18,
    lineHeight: 20,
  },
  balanceSum: {
    ...FONTS.textRegular,
    fontSize: 20,
    lineHeight: 24,
  },
  assetBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title_block:{ paddingLeft: 0, fontSize: 18 },
  list_container: { flex: 1, paddingBottom: 80 },
  list_empty: { color: COLORS.white, textAlign: 'center' },
});
