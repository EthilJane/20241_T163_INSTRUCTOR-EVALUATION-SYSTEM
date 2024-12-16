import { getRole } from '@/utils/api';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

const useGetRole = () => {
  const [isLoading, setLoading] = useState(true);
  const [role, setRole] = useState();
  useEffect(() => {
    getRole()
      .then((response) => {
        let responseRole = response.data.role;
        setRole(responseRole);
        //   switch (responseRole as Role) {
        //     case 'instructor':
        //       console.log('set selected instructor');
        //       handleSelection('employee_profile');
        //       break;
        //     case 'student':
        //       handleSelection('student_profile');
        //       break;
        //     case 'admin':
        //       handleSelection('reports');
        //       break;
        //     default:
        //       break;
        //   }
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
};
