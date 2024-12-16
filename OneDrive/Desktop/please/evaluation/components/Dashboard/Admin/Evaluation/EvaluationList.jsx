import '@/constants/styles/admin/evaluation-list.css';

import { useEffect, useState } from 'react';
import { deleteEval, getEvaluation } from '@/utils/api';
import { formatDate } from '@/utils/date';
import { router } from 'expo-router';
import { useFormEvaluationContext } from './FormEvaluationContext';

const EvaluationList = () => {
  const EvalFormContext = useFormEvaluationContext();
  const [isToggled, setIsToggled] = useState(false);
  const [list, setList] = useState([]);

  const handleDelete = (evaluation_id) => {
    if (!evaluation_id) return;
    deleteEval(evaluation_id).then(() => {
      setIsToggled((prev) => !prev);
    });
  };
  useEffect(() => {
    getEvaluation().then((serverResponse) => {
      setList(serverResponse.data.data);
    });
  }, [EvalFormContext.refresh, isToggled]);
  return (
    (<div className="table-container">
      <table border={1}>
        <tbody>
          <tr>
            <th>Semester</th>
            <th>Evaluation</th>
            <th>College</th>
            <th>Deadline</th>
            <th>Link</th>
            <th></th>
          </tr>
          {list.map((values, index) => (
            <Row handleDelete={handleDelete} key={index} values={values}></Row>
          ))}
        </tbody>
      </table>
    </div>)
  );
};
const Row = ({
  values,
  handleDelete
}) => {
  const EvalFormContext = useFormEvaluationContext();

  return (
    (<tr>
      <td>{values.semester}</td>
      <td>{values.evaluation}</td>
      <td>{values.college}</td>
      <td>{formatDate(new Date(values.deadline || ''))}</td>
      <td
        onClick={() => {
          router.push({
            pathname: '/Random/[randomid]',
            params: { randomid: values.link_id || '' },
          });
        }}>
        {window.location.origin + '/Random/' + (values.link_id || '')}
      </td>
      <td className="evaluation-button-container">
        <button
          onClick={() => EvalFormContext.open(values, 'save')}
          className="evaluation-button">
          Change
        </button>
        <button
          onClick={() => {
            confirm('Are you sure you want to delete this? ') &&
              handleDelete(values?.evaluation_id);
          }}
          className="evaluation-button-delete">
          Delete
        </button>
      </td>
    </tr>)
  );
};

export default EvaluationList;
