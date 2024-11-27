import { FixedSizeList } from 'react-window';
import '@/constants/styles/admin/evaluation-list.css';
import { EvaluationValues, Form } from './Form';
import { useEffect, useState } from 'react';
import { deleteEval, getEvaluation } from '@/utils/api';
import { formatDate } from '@/utils/date';
import { router } from 'expo-router';

const EvaluationList = ({
  refresh,
  toggleRefresh,
}: {
  refresh: boolean;
  toggleRefresh: () => void;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState<EvaluationValues>();
  const [list, setList] = useState<EvaluationValues[]>([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (values: EvaluationValues) => {
    setOpen(true);
    setValues({ ...values });
  };
  const handleDelete = (evaluation_id: number | undefined) => {
    if (!evaluation_id) return;
    deleteEval(evaluation_id).then(() => {
      toggleRefresh();
    });
  };
  useEffect(() => {
    getEvaluation().then((serverResponse) => {
      setList(serverResponse.data.data);
    });
  }, [refresh]);
  return (
    <div className="table-container">
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
            <Row
              handleDelete={handleDelete}
              key={index}
              values={values}
              handleOpen={handleOpen}
            ></Row>
          ))}
        </tbody>
      </table>
      <Form
        handleRefresh={toggleRefresh}
        open={isOpen}
        create={false}
        values={values}
        setClose={handleClose}
      ></Form>
    </div>
  );
};
const Row = ({
  handleOpen,
  values,
  handleDelete,
}: {
  handleOpen: (values: EvaluationValues) => void;
  values: EvaluationValues;
  handleDelete: (id: number | undefined) => void;
}) => {
  return (
    <tr>
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
        }}
      >
        {window.location.origin + '/Random/' + (values.link_id || '')}
      </td>
      <td className="evaluation-button-container">
        <button
          onClick={() => handleOpen(values)}
          className="evaluation-button"
        >
          Change
        </button>
        <button
          onClick={() => {
            confirm('Are you sure you want to delete this? ') &&
              handleDelete(values?.evaluation_id);
          }}
          className="evaluation-button-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EvaluationList;
