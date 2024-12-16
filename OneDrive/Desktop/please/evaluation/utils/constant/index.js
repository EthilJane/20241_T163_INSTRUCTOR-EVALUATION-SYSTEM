export const ClientId = process.env.EXPO_PUBLIC_CLIENT_ID || '';

export const RECAPTCHA_ID = process.env.EXPO_PUBLIC_CAPTCHA_ID || '';

export const validateEmail = (email) => {
  return email?.endsWith('buksu.edu.ph') || email?.endsWith('@gmail.com');
};
