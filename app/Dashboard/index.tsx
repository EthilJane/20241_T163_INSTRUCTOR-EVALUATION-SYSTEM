import EvaluationPage from '@/components/Dashboard/Admin/Evaluation';
import { NavBar } from '@/components/NavBar';
import '@/constants/styles/dashboard.css';
import { getRole } from '@/utils/api';
import { Role } from '@/utils/constant';
import { router } from 'expo-router';
import { Suspense, useEffect, useState } from 'react';
import { lazy } from 'react';
const Profile = lazy(() => import('@/components/Dashboard/profile/Main'));

export type DashboardOptions =
  | 'student_profile'
  | 'Evaluation'
  | 'employee_profile'
  | 'reports'
  | 'Link';

const Dashboard = () => {
  console.log('inside the dashboard');
  const [selected, setSelected] = useState<DashboardOptions>();
  const [isLoading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>();
  const handleSelection = (selected: DashboardOptions) => {
    setSelected(selected);
  };
  useEffect(() => {
    getRole()
      .then((response) => {
        let responseRole = response.data.role;
        setRole(responseRole);
        switch (responseRole as Role) {
          case 'instructor':
            console.log('set selected instructor');
            handleSelection('employee_profile');
            break;
          case 'student':
            handleSelection('student_profile');
            break;
          case 'admin':
            handleSelection('Link');
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        router.replace('/');
        console.log('error dashboard');
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(role, selected);
  if (!role || !selected) return;

  return (
    <div className="dashboard">
      {!isLoading && (
        <NavBar
          selected={selected}
          role={role}
          handleSelection={handleSelection}
        ></NavBar>
      )}
      <Suspense>
        <MainDisplay role={role} selected={selected}></MainDisplay>
      </Suspense>
    </div>
  );
};
const MainDisplay = ({
  selected,
  role,
}: {
  selected: DashboardOptions;
  role: Role;
}) => {
  switch (selected) {
    case 'employee_profile':
    case 'student_profile':
      return <Profile role={role}></Profile>;
      break;
    case 'reports':
      return <p>reports</p>;
    case 'Link':
      return <EvaluationPage></EvaluationPage>;
    default:
      break;
  }
};

export default Dashboard;
