import React from 'react';
import { LineChart } from 'react-native-svg-charts';
import { COLORS } from '../../constants';

export const Chart = ({ data, lineColor }) => {
  let strokeColor = lineColor ? COLORS.chartColorGreen : COLORS.chartColorRed;

  return (
    <>
      <LineChart
        style={{ height: 70, width: 120 }}
        data={data}
        svg={{ stroke: strokeColor, strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}
      />
    </>
  );
};
