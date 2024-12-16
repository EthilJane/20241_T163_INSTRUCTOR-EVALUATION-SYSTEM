import PieChart from './Chart';

export const ChartList = ({
  report
}) => {
  return (
    (<div className="charts-container">
      {report.chart.map((chart, index) => (
        <PieChart key={index} chart={chart}></PieChart>
      ))}
    </div>)
  );
};
