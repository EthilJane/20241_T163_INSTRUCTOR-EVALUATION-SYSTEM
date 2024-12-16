import { useForm } from 'react-hook-form';
import CustomDatePicker from './Datepicker';
import '@/constants/styles/admin/evaluation-form.css';
import { useEffect, useState, createContext, useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addEvaluation } from '@/utils/api';
import CustomInput from './CustomInput';

// const EvaluationForm = ({ toggleRefresh }: { toggleRefresh: () => void }) => {
//   const [isOpen, setOpen] = useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <div>
//       <button
//         className="evaluation-button"
//         onClick={() => setOpen((prev) => true)}
//       >
//         Add
//       </button>
//       <Form
//         handleRefresh={toggleRefresh}
//         setClose={handleClose}
//         open={isOpen}
//       ></Form>
//     </div>
//   );
// };

const schema = yup
  .object({
    semester: yup.string().required(),
    evaluation: yup.string().required(),
    college: yup.string().required(),
  })
  .required();
const EvaluationFormContext = createContext(null);

export const EvalFormContextProvider = ({
  children
}) => {
  const [values, setValues] = useState({});
  const [open, setOpen] = useState(false);
  const [purpose, setPurpose] = useState('create');
  const [refresh, toggleRefresh] = useState(true);
  const [onSave, setOnSave] = useState(() => () => toggleRefresh((prev) => !prev));
  const [finaly, setFinally] = useState(() => () => setOpen(false));
  const closeHandler = () => {
    setOpen(false);
  };
  const openHandler = (
    values,
    purpose,
    finallyFunction
  ) => {
    setValues(values);
    setOpen(true);
    setPurpose(purpose);
    finallyFunction && setFinally(() => finallyFunction);
  };
  return (
    (<EvaluationFormContext.Provider value={{ open: openHandler, close: closeHandler, refresh: refresh }}>
      <EvalForm
        closeHandler={closeHandler}
        onDone={finaly}
        open={open}
        purpose={purpose}
        onSave={onSave}
        values={values}></EvalForm>
      {children}
    </EvaluationFormContext.Provider>)
  );
};

const EvalForm = ({
  open,
  onDone,
  purpose = 'create',
  values,
  onSave,
  closeHandler
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [deadline, setDeadline] = useState(new Date(values?.deadline || new Date()));
  const dateHandler = (newDate) => {
    setDeadline(newDate);
  };
  const submit = (data) => {
    addEvaluation({
      evaluation_id: values?.evaluation_id,
      semester: data.semester,
      college: data.college,
      evaluation: data.evaluation,
      deadline: deadline,
    })
      .then((res) => {
        onSave();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        onDone();
      });
  };

  useEffect(() => {
    reset();
  }, [open]);
  return (
    (<div
      style={{ display: open ? 'grid' : 'none' }}
      className="eval-form-container">
      <div className="eval-form-main">
        <div className="close-button" onClick={closeHandler}>
          <button>x</button>
        </div>
        <form className="eval-form">
          <p className="form-label">
            {purpose == 'create' ? 'Create link' : 'Change values'}
          </p>
          <CustomInput
            labelName="Evaluation"
            registerProps={register('evaluation')}
            errorField={errors?.evaluation}
            defaultValue={values?.evaluation} />

          <CustomInput
            labelName="Semester"
            registerProps={register('semester')}
            errorField={errors?.semester}
            defaultValue={values?.semester} />
          <CustomInput
            labelName="College"
            registerProps={register('college')}
            errorField={errors?.college}
            defaultValue={values?.college} />
          <label>Deadline</label>
          <CustomDatePicker dateSetter={dateHandler} date={deadline}></CustomDatePicker>
        </form>
        <div className="save-button-container" onClick={handleSubmit(submit)}>
          <button className="evaluation-button">
            {purpose == 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>)
  );
};

export const useFormEvaluationContext = () => {
  const evalContext = useContext(EvaluationFormContext);
  if (!evalContext) throw new Error('Evaluation form is not set');
  return evalContext;
};
