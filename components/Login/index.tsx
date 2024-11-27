import {
  CSSProperties,
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
} from 'react';

import '@/constants/styles/loginpage.css';
import AdminLoginForm from './AdminLoginForm';
import EmailLoginForm from './EmailLoginForm';
import GmailLogin from './GmailLogin';

const LoginPage = ({ usertype }: { usertype: 'admin' | 'users' }) => {
  const [topError, setTopError] = useState('');
  const topErrorHandler = (errorMessage: string) => {
    setTopError(errorMessage);
  };

  return (
    <div className="main-container">
      <div className="image-container">
        <img className="bg" src="../assets/images/bg.jpg"></img>
      </div>
      <div className="content-container">
        <div className="login-container">
          <img
            className="logo"
            src="../assets/images/log-removebg-preview.png"
          ></img>
          {topError && <p className="error-message">{topError}</p>}
          {usertype == 'admin' && (
            <AdminLoginForm topErrorHandler={topErrorHandler}></AdminLoginForm>
          )}

          {usertype != 'admin' && (
            <>
              <EmailLoginForm
                topErrorHandler={topErrorHandler}
              ></EmailLoginForm>
              <GmailLogin topErrorHandler={topErrorHandler}></GmailLogin>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
