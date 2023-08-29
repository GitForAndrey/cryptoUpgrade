import React from 'react';
import { PieChart } from 'react-native-svg-charts';

import styles from './style';

export const ChartPie = ({ assetsCoinData }) => {
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
