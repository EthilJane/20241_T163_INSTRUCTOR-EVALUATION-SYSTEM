import '@/constants/styles/admin/evaluation-form.css';
import { useFormEvaluationContext } from './FormEvaluationContext';

const CreateButton = () => {
  const FormEvalContext = useFormEvaluationContext();
  return (
    (<div>
      <button
        className="evaluation-button"
        onClick={() => FormEvalContext.open({}, 'create')}>
        Add
      </button>
    </div>)
  );
};

// const schema = yup
//   .object({
//     semester: yup.string().required(),
//     evaluation: yup.string().required(),
//     college: yup.string().required(),
//   })
//   .required();
// type FormData = yup.InferType<typeof schema>;

// export type EvaluationValues = {
//   evaluation_id?: number;
//   semester?: string;
//   evaluation?: string;
//   college?: string;
//   deadline?: Date;
//   link_id?: string;
// };
// export const Form = ({
//   open,
//   setClose,
//   create = true,
//   values,
//   handleRefresh,
// }: {
//   open: boolean;
//   setClose: () => void;
//   handleRefresh: () => void;
//   create?: boolean;
//   values?: EvaluationValues;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: yupResolver(schema) });
//   const [deadline, setDeadline] = useState(
//     new Date(values?.deadline || new Date())
//   );
//   const dateHandler = (newDate: Date) => {
//     setDeadline(newDate);
//   };
//   const submit: SubmitHandler<FormData> = (data) => {
//     addEvaluation({
//       evaluation_id: values?.evaluation_id,
//       semester: data.semester,
//       college: data.college,
//       evaluation: data.evaluation,
//       deadline: deadline,
//     })
//       .then((res) => {
//         handleRefresh();
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setClose();
//       });
//   };

//   useEffect(() => {
//     reset();
//   }, [open]);
//   return (
//     <div
//       style={{ display: open ? 'grid' : 'none' }}
//       className="eval-form-container"
//     >
//       <div className="eval-form-main">
//         <div className="close-button" onClick={setClose}>
//           <button>x</button>
//         </div>
//         <form className="eval-form">
//           <p className="form-label">
//             {create ? 'Create link' : 'Change values'}
//           </p>
//           <CustomInput
//             labelName="Evaluation"
//             registerProps={register('evaluation')}
//             errorField={errors?.evaluation}
//             defaultValue={values?.evaluation}
//           />

//           <CustomInput
//             labelName="Semester"
//             registerProps={register('semester')}
//             errorField={errors?.semester}
//             defaultValue={values?.semester}
//           />
//           <CustomInput
//             labelName="College"
//             registerProps={register('college')}
//             errorField={errors?.college}
//             defaultValue={values?.college}
//           />
//           <label>Deadline</label>
//           <CustomDatePicker
//             dateSetter={dateHandler}
//             date={deadline}
//           ></CustomDatePicker>
//         </form>
//         <div className="save-button-container" onClick={handleSubmit(submit)}>
//           <button className="evaluation-button">
//             {create ? 'Create' : 'Save'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CreateButton;
