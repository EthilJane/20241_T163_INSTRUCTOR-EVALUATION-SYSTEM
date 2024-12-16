import { loginUsingEmailAndPass } from '@/utils/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateEmail } from '@/utils/constant';
import { useLoginContext } from '../LoginContext';

const emailValidation = yup
  .string()
  .email('Not an email')
  .test('match', 'Please use the university email', (email) => {
    return validateEmail(email || '');
  })
  .required('* This field is required');
const schema = yup
  .object({
    email: emailValidation,
    password: yup.string().required(),
  })
  .required();
const EmailLoginForm = ({
  topErrorHandler
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const LoginContext = useLoginContext();
  const submit = (loginDetails) => {
    loginUsingEmailAndPass(loginDetails.password, loginDetails.email)
      .then((serverResponse) => {
        LoginContext.ChangeStatus(serverResponse.data.role);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        reset();
        topErrorHandler(err.response?.data?.message);
      });
  };

  return (
    (<form className="form" method="post" onSubmit={handleSubmit(submit)}>
      <label htmlFor="email">{'University Email buksu.edu.ph'}</label>
      <input {...register('email')}></input>
      {errors?.email && <p className="error-message">{errors.email.message}</p>}
      <label htmlFor="password">{'Password'}</label>
      <input {...register('password')} type="password" name="password"></input>
      {errors?.password && (
        <p className="error-message">{errors.password.message}</p>
      )}
      <input className="submit" type="submit" value={'Login'}></input>
    </form>)
  );
};

export default EmailLoginForm;
