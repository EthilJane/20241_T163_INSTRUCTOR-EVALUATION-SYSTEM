import React from 'react';
import { Chart } from 'react-google-charts';

const PieChart = ({
  chart
}) => {
  console.log(chart);
  return (
    (<div className="chart-container">
      <Chart
        chartType="PieChart"
        data={chart.data}
        options={{ ...chart.options, title: chart.title}}
        width={'100%'}
        height={'500px'} />
    </div>)
  );
};
export default PieChart;
