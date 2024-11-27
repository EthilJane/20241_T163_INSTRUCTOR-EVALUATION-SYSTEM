import dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || '';

export const CLIENT_ID = process.env.CLIENT_ID;
export const APP_TOKEN = process.env.TOKEN_SECRET || '';

export const ACCESS_TOKEN_NAME = 'accessToken';
export const DEFAULT_PASSWORD = process.env.DEFAULT_PASS || '';

export const STUDENT_EMAIL_STRUCTURE = 'student.buksu.edu';

export type ROLE = 'student' | 'instructor' | 'admin';

export const ADMIN_CREDENTIALS = {
  username: process.env.DEFAULT_ADMIN_USERNAME || '',
  password: process.env.DEFAULT_ADMIN_PASS || '',
};
