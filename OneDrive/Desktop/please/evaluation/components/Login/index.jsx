import { useState } from 'react';

import '@/constants/styles/loginpage.css';
import AdminLoginForm from './AdminLoginForm';
import EmailLoginForm from './EmailLoginForm';
import GmailLogin from './GmailLogin';
import { useAssetsContext } from '../AssetsContext';

const LoginPage = ({
  usertype
}) => {
  const [topError, setTopError] = useState('');
  const imgAssets = useAssetsContext();
  const topErrorHandler = (errorMessage) => {
    setTopError(errorMessage);
  };

  return (
    (<div className="main-container">
      <div className="image-container">
        <img className="bg" src={imgAssets.bgImg}></img>
      </div>
      <div className="content-container">
        <div className="login-container">
          <img className="logo" src={imgAssets.logo}></img>
          {topError && <p className="error-message">{topError}</p>}
          {usertype == 'admin' && (
            <>
              <AdminLoginForm topErrorHandler={topErrorHandler}></AdminLoginForm>
            </>
          )}

          {usertype != 'admin' && (
            <>
              <EmailLoginForm topErrorHandler={topErrorHandler}></EmailLoginForm>
              <GmailLogin topErrorHandler={topErrorHandler}></GmailLogin>
            </>
          )}
        </div>
      </div>
    </div>)
  );
};

export default LoginPage;
