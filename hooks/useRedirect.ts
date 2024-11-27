import { Role } from '@/utils/constant';
import { router } from 'expo-router';

export function useRedirect(role: Role) {
  switch (role) {
    case 'instructor':
    case 'student':
    case 'admin':
      return router.replace('/Dashboard');
    // case 'admin':
    //   return router.replace('/admin');
    default:
      return '';
      break;
  }
}
