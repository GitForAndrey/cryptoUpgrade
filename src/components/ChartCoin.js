import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import { COLORS } from '../constants';

export const ChartCoin = ({ data }) => {
  const key = data.join('-');
  return (
    <View style={styles.container}>
      <LineChart
        style={{ flex: 1 }}
        data={data}
        svg={{ stroke: COLORS.orange }}
        contentInset={{ top: 10, bottom: 10 }}>
        <Grid svg={{ stroke: 'rgba(255, 255, 255, 0.1)' }} />
      </LineChart>
      <YAxis
        key={key}
        data={data}
        contentInset={{ top: 10, bottom: 10 }}
        formatLabel={value => `$${value.toFixed(2)}`}
        numberOfTicks={10}
        style={{
          color: COLORS.white,
        }}
        svg={{ fill: COLORS.white }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
