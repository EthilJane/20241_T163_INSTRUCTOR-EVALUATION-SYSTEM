import { GoogleCredentialResponse } from '@react-oauth/google';
import { axiosLoginRequest, axiosDataRequest } from './axios-config';
import { AdditionalInformation } from '@/components/Dashboard/profile/AdditionalInfo';
import { EvaluationValues } from '@/components/Dashboard/Admin/Evaluation/Form';

export const loginUsingEmailAndPass = async (
  password: string,
  email: string
) => {
  return await axiosLoginRequest.post('/login/email', {
    email: email,
    password: password,
  });
};

export const loginAdmin = async (password: string, username: string) => {
  return await axiosLoginRequest.post('/login/admin', {
    username: username,
    password: password,
  });
};
export const loginUsingGmail = async (GCresponse: GoogleCredentialResponse) => {
  return await axiosLoginRequest.post('/login/gmail', {
    credentials: GCresponse.credential,
  });
};

export const isLogin = async () => {
  console.log('verify login');
  return await axiosDataRequest.post('/authetication/verify');
};

export const getInstructorAdditionalInfo = async () => {
  return await axiosDataRequest.get('/instructor/additional-info');
};

export const updateInstructorAdditionalInfo = async (
  data: AdditionalInformation
) => {
  return await axiosDataRequest.post('/instructor/additional-info', data);
};

export const getRole = async () => {
  return await axiosDataRequest.get('/user/role');
};
export const getInfo = async () => {
  return await axiosDataRequest.get('/user/info');
};
export const logout = async () => {
  return await axiosDataRequest.post('/user/logout');
};

export const addEvaluation = async (data: EvaluationValues) => {
  return await axiosDataRequest.post('/admin/evaluation-data', data);
};

export const getEvaluation = async () => {
  return await axiosDataRequest.get('/admin/evaluation-data');
};
export const deleteEval = async (id: number) => {
  return await axiosDataRequest.post('/admin/delete/evaluation-data', {
    evaluation_id: id,
  });
};

