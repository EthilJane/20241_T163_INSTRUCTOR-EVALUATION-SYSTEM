import { SubmitHandler, useForm } from 'react-hook-form';
import CustomDatePicker from './Datepicker';
import '@/constants/styles/admin/evaluation-form.css';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addEvaluation } from '@/utils/api';
const EvaluationForm = ({ toggleRefresh }: { toggleRefresh: () => void }) => {
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        className="evaluation-button"
        onClick={() => setOpen((prev) => true)}
      >
        Add
      </button>
      <Form
        handleRefresh={toggleRefresh}
        setClose={handleClose}
        open={isOpen}
      ></Form>
    </div>
  );
};

const schema = yup
  .object({
    semester: yup.string().required(),
    evaluation: yup.string().required(),
    college: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export type EvaluationValues = {
  evaluation_id?: number;
  semester?: string;
  evaluation?: string;
  college?: string;
  deadline?: Date;
  link_id?: string;
};
export const Form = ({
  open,
  setClose,
  create = true,
  values,
  handleRefresh,
}: {
  open: boolean;
  setClose: () => void;
  handleRefresh: () => void;
  create?: boolean;
  values?: EvaluationValues;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const [deadline, setDeadline] = useState(
    new Date(values?.deadline || new Date())
  );
  console.log(values?.deadline);
  const dateHandler = (newDate: Date) => {
    setDeadline(newDate);
  };
  const submit: SubmitHandler<FormData> = (data) => {
    addEvaluation({
      evaluation_id: values?.evaluation_id,
      semester: data.semester,
      college: data.college,
      evaluation: data.evaluation,
      deadline: deadline,
    })
      .then((res) => {
        console.log(res);
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setClose();
      });
  };
  useEffect(() => {
    reset();
  }, [open]);
  return (
    <div
      style={{ display: open ? 'grid' : 'none' }}
      className="eval-form-container"
    >
      <div className="eval-form-main">
        <div className="close-button" onClick={setClose}>
          <button>x</button>
        </div>
        <form className="eval-form">
          <p className="form-label">
            {create ? 'Create link' : 'Change values'}
          </p>
          <label>Evaluation</label>
          <input
            {...register('evaluation')}
            defaultValue={values?.evaluation}
            type="input"
          ></input>
          {errors?.evaluation && (
            <p className="error-message-form">{errors.evaluation.message}</p>
          )}
          <label>Semester</label>
          <input
            {...register('semester')}
            defaultValue={values?.semester}
            type="input"
          ></input>
          {errors?.semester && (
            <p className="error-message-form">{errors.semester.message}</p>
          )}
          <label>College</label>
          <input
            {...register('college')}
            defaultValue={values?.college}
            type="input"
          ></input>
          {errors?.college && (
            <p className="error-message-form">{errors.college.message}</p>
          )}
          <label>Deadline</label>
          <CustomDatePicker
            dateSetter={dateHandler}
            date={deadline}
          ></CustomDatePicker>
        </form>
        <div className="save-button-container" onClick={handleSubmit(submit)}>
          <button className="evaluation-button">
            {create ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;
