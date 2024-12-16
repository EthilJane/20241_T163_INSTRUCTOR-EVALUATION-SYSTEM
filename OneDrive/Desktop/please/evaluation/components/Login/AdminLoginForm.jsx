import { loginAdmin } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Recaptcha from './Recaptcha';
import { useLoginContext } from '../LoginContext';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    captcha: yup.string().required('Check the captcha'),
  })
  .required();

const AdminLoginForm = ({
  topErrorHandler
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });
  const LoginContext = useLoginContext();
  const handleCaptchaValue = (value) => {
    value && setValue('captcha', value);
  };
  const submit = (loginDetails) => {
    loginAdmin(loginDetails.password, loginDetails.username, loginDetails.captcha)
      .then((serverResponse) => {
        LoginContext.ChangeStatus(serverResponse.data.role);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        reset();
        topErrorHandler(err.response.data.message);
      });
  };

  return (
    (<form className="form" method="post" onSubmit={handleSubmit(submit)}>
      <label htmlFor="username">{'Admin login'}</label>
      <input {...register('username')}></input>
      {errors?.username && (
        <p className="error-message">{errors.username.message}</p>
      )}
      <label htmlFor="password">{'Password'}</label>
      <input {...register('password')} type="password" name="password"></input>
      {errors?.password && (
        <p className="error-message">{errors.password.message}</p>
      )}
      <input className="submit" type="submit" value={'Login'}></input>
      <Recaptcha valueSetter={handleCaptchaValue}></Recaptcha>
      {errors?.captcha && (
        <p className="error-message">{errors.captcha.message}</p>
      )}
    </form>)
  );
};

export default AdminLoginForm;
