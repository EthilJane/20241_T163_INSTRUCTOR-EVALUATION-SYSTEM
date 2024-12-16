import '@/constants/styles/admin/evaluation.css';
import CreateButton from './CreateButton';
import EvaluationList from './EvaluationList';
import { EvalFormContextProvider } from './FormEvaluationContext';

const EvaluationPage = () => {
  return (
    (<EvalFormContextProvider>
      <div className="evaluation-main">
        <CreateButton></CreateButton>
        <EvaluationList />
      </div>
    </EvalFormContextProvider>)
  );
};

export default EvaluationPage;
