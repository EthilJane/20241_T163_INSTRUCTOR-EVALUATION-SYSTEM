import '@/constants/styles/admin/reports.css';
import { REPORTS } from '@/constants/sampleReports';
import { useState } from 'react';
import { ChartList } from './ChartList';

function getProfNames(reports) {
  return reports.map((report) => report.prof_name);
}
const ReportPage = () => {
  const [optionValue, setOptionValue] = useState(REPORTS[0].prof_name);
  const findReport = (id) => {
    return REPORTS.find((report) => report.prof_name == id) || REPORTS[0];
  };
  const [currentReport, setCurrentReport] = useState(findReport(optionValue));

  const handleReportChange = (profName) => {
    setCurrentReport(findReport(profName));
    console.log(currentReport);
  };
  return (
    (<div className="reports-main">
      <div className="reports-selector-container">
        <h1>Reports</h1>
        <hr></hr>

        <div>
          <h2>Select Instructor</h2>
          <select
            onChange={(e) => handleReportChange(e.target.value)}
            defaultValue={optionValue}
            className="report-select">
            {getProfNames(REPORTS).map((name, index) => (
              <Option key={index} name={name}></Option>
            ))}
          </select>
        </div>
      </div>
      <ChartList report={currentReport} />
    </div>)
  );
};
const Option = ({
  name
}) => {
  return <option value={name}>{name}</option>;
};

export default ReportPage;
