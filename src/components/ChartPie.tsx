import React,{FunctionComponent} from 'react';
import { PieChart } from 'react-native-svg-charts';
import { StyleSheet } from 'react-native';
import { AssetsCoin } from '../types/coinTypes';


interface ChartPieProps  {
  assetsCoinData:AssetsCoin[],
}

export const ChartPie:FunctionComponent<ChartPieProps> = ({ assetsCoinData }) => {
  let chartData = assetsCoinData.map(item => {
    return {
      key: item.id,
      value: Number((item.current_price * item.quantity).toFixed(2)),
      svg: { fill: item.fillColor },
    };
  });

  return (
    <PieChart
      style={styles.chart}
      data={chartData}
      innerRadius="85%"
      spacing={5}
      strokeWidth={5}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    width: 185,
    height: 185,
  },
});
