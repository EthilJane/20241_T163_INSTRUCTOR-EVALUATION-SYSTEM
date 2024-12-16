import { axiosLoginRequest, axiosDataRequest } from './axios-config';


export const loginUsingEmailAndPass = async (
  password,
  email
) => {
  return await axiosLoginRequest.post('/login/email', {
    email: email,
    password: password,
  });
};

export const loginAdmin = async (
  password,
  username,
  captcha
) => {
  return await axiosLoginRequest.post('/login/admin', {
    username: username,
    password: password,
    captcha: captcha,
  });
};
export const loginUsingGmail = async (GCresponse) => {
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
  data
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

export const addEvaluation = async (data) => {
  return await axiosDataRequest.post('/admin/evaluation-data', data);
};

export const getEvaluation = async () => {
  return await axiosDataRequest.get('/admin/evaluation-data');
};
export const deleteEval = async (id) => {
  return await axiosDataRequest.post('/admin/delete/evaluation-data', {
    evaluation_id: id,
  });
};

