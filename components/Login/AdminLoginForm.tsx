import { useRedirect } from '@/hooks/useRedirect';
import { loginAdmin } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const AdminLoginForm = ({
  topErrorHandler,
}: {
  topErrorHandler: (errorMessage: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const submit: SubmitHandler<FormData> = (loginDetails) => {
    loginAdmin(loginDetails.password, loginDetails.username)
      .then((serverResponse) => {
        useRedirect(serverResponse.data.role);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        reset();
        topErrorHandler(err.response.data.message);
      });
  };

  return (
    <form className="form" method="post" onSubmit={handleSubmit(submit)}>
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
    </form>
  );
};

export default AdminLoginForm;
