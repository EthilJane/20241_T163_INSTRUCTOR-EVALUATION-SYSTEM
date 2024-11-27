const ClientId = process.env.REACT_APP_CLIENT_ID;
export { ClientId };
export const validateEmail = (email: string) => {
  return email?.endsWith('buksu.edu.ph') || email?.endsWith('@gmail.com');
};

export type Role = 'student' | 'instructor' | 'admin';