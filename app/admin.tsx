import LoginPage from '@/components/Login';
import { LoginContextProvider } from '@/components/LoginContext';

const Homepage = () => {
  return (
    <LoginContextProvider>
      <LoginPage usertype="admin"></LoginPage>
    </LoginContextProvider>
  );
};

export default Homepage;
