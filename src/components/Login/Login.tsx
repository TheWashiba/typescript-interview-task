import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Routes } from '~/constants';
import { login } from '~/services/auth.services';
import ErrorBlock from '../shared/ErrorBlock';
import LoadingScreen from '../shared/LoadingScreen';

import './login-style.scss';

interface ILoginForm {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { push } = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginForm) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await login(data.username, data.password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login__page">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Password Health</h1>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <input
              placeholder="Username"
              type="text"
              className="input mt-52px"
              ref={register}
              name="username"
            />
            {errors.username?.message && <p>{errors.username?.message}</p>}
            <input
              placeholder="Password"
              type="password"
              className="input mt-24px"
              ref={register}
              name="password"
            />
            {errors.password?.message && <p>{errors.password?.message}</p>}
            <ErrorBlock error={errorMessage} />
            <button type="submit" className="button mt-24px">
              Login
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
