import EvaluationPage from '@/components/Dashboard/Admin/Evaluation';
import ReportPage from '@/components/Dashboard/Admin/Reports';
import { NavBar } from '@/components/NavBar';
import '@/constants/styles/dashboard.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { lazy } from 'react';
const Profile = lazy(() => import('@/components/Dashboard/profile/Main'));

const Dashboard = ({
  role
}) => {
  console.log('inside the dashboard');
  const [selected, setSelected] = useState();
  const selectedRef = useRef('reports');
  const handleSelection = (selected) => {
    selectedRef.current = selected;
    console.log(selectedRef.current, 'change selected');
    setSelected(selected);
  };
  console.log('ref ', selectedRef.current);
  useEffect(() => {
    console.log('mount');

    switch (role) {
      case 'instructor':
        console.log('set selected instructor');
        handleSelection('employee_profile');
        break;
      case 'student':
        handleSelection('student_profile');
        break;
      case 'admin':
        handleSelection('reports');
        break;
      default:
        break;
    }
    return () => {
      console.log('un mount');
    };
  }, []);

  if (!role || !selected) return;

  return (
    (<div className="dashboard">
      <NavBar selected={selected} role={role} handleSelection={handleSelection}></NavBar>
      <Suspense>
        <MainDisplay role={role} selected={selected}></MainDisplay>
      </Suspense>
    </div>)
  );
};
const MainDisplay = ({
  selected,
  role
}) => {
  switch (selected) {
    case 'employee_profile':
    case 'student_profile':
      return <Profile role={role}></Profile>;
      break;
    case 'reports':
      return <ReportPage></ReportPage>;
    case 'Link':
      return <EvaluationPage></EvaluationPage>;
    default:
      break;
  }
};

export default Dashboard;
