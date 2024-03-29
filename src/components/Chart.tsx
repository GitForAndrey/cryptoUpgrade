import React, { FunctionComponent } from 'react';
import { LineChart } from 'react-native-svg-charts';
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface ChartProps {
  data: [];
  lineColor: boolean;
}

export const Chart: FunctionComponent<ChartProps> = ({ data, lineColor }) => {
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

const styles = StyleSheet.create({});
