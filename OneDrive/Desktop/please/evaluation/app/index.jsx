import LoginPage from '@/components/Login';
import { useLoginContext } from '@/components/LoginContext';
import Dashboard from './Dashboard';

const Homepage = () => {
  const loginContext = useLoginContext();
  if (loginContext.isLoading) return;

  return (<>
    {loginContext.role ? (
      <Dashboard role={loginContext.role} />
    ) : (
      <LoginPage usertype="users" />
    )}
  </>);
};

export default Homepage;
