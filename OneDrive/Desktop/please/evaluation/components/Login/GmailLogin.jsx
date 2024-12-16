import { loginUsingGmail } from '@/utils/api';
import { ClientId, validateEmail } from '@/utils/constant';
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useLoginContext } from '../LoginContext';

const GmailLogin = ({
  topErrorHandler
}) => {
  const LoginContext = useLoginContext();
  const gmailSubmit = (credentialResponse) => {
    let decoded = jwtDecode(credentialResponse.credential || '');

    if (!validateEmail(decoded.email)) {
      topErrorHandler('Wrong email');
      return;
    }
    // return;
    loginUsingGmail(credentialResponse)
      .then((serverResponse) => {
        LoginContext.ChangeStatus(serverResponse.data.role);
      })
      .catch((error) => {
        topErrorHandler(error.response.data.message);
      });
  };
  return (
    (<GoogleOAuthProvider clientId={ClientId}>
      <p className="break">OR</p>
      <div className="google-login-container">
        <GoogleLogin
          shape="rectangular"
          theme="outline"
          onSuccess={(credentialResponse) => {
            gmailSubmit(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
            googleLogout();
          }} />
      </div>
    </GoogleOAuthProvider>)
  );
};

export default GmailLogin;
