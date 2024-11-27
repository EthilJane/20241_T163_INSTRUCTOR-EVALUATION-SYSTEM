import { useRedirect } from '@/hooks/useRedirect';
import { loginUsingGmail } from '@/utils/api';
import { ClientId, validateEmail } from '@/utils/constant';
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
interface GoogleIdTokenPayload {
  iss: string; // Issuer
  azp: string; // Authorized party (client ID)
  aud: string; // Audience (client ID)
  sub: string; // Subject (unique identifier for the user)
  email: string; // User's email
  email_verified: boolean; // Whether the user's email is verified
  exp: number; // Expiration time (timestamp)
  given_name?: string; // User's given name (optional)
  iat: number; // Issued-at time (timestamp)
  name: string; // Full name of the user
  nbf?: number; // Not-before time (optional)
  picture?: string; // URL to the user's profile picture (optional)
  jti?: string; // Token ID (optional)
}

const GmailLogin = ({
  topErrorHandler,
}: {
  topErrorHandler: (errorMessage: string) => void;
}) => {
  const gmailSubmit = (credentialResponse: CredentialResponse) => {
    let decoded = jwtDecode(
      credentialResponse.credential || ''
    ) as GoogleIdTokenPayload;

    if (!validateEmail(decoded.email)) {
      topErrorHandler('Wrong email');
      return;
    }
    // return;
    loginUsingGmail(credentialResponse)
      .then((serverResponse) => {
        useRedirect(serverResponse.data.role);
      })
      .catch((error) => {
        topErrorHandler(error.response.data.message);
      });
  };
  return (
    <GoogleOAuthProvider clientId={ClientId}>
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
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GmailLogin;
