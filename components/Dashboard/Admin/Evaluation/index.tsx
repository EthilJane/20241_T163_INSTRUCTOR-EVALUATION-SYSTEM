import '@/constants/styles/admin/evaluation.css';
import EvaluationForm from './Form';
import EvaluationList from './EvaluationList';
import { useState } from 'react';

const EvaluationPage = () => {
  const [refresh, setRefresh] = useState(true);
  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <div className="evaluation-main">
      <EvaluationForm toggleRefresh={toggleRefresh}></EvaluationForm>
      <EvaluationList
        toggleRefresh={toggleRefresh}
        refresh={refresh}
      ></EvaluationList>
    </div>
  );
};

export default EvaluationPage;
