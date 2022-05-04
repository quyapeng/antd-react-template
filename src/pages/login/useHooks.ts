// import { useRequest } from 'ahooks';
// import { login, LoginParams } from '@/services/loginService';
// import { message } from 'antd';
// import { history } from 'umi';
// import { ErrMap, getControllerErrMsg } from '@/utils/message';

// const useLogin = () => {
//   const loginController = useRequest(
//     async (params: LoginParams) => {
//       try {
//         const {
//           data: { token, user_info },
//         } = await login(params);
//         message.success('登录成功');
//         localStorage.setItem('username', user_info.username);
//         localStorage.setItem('token', token);
//         history.replace('/home');
//       } catch (err: any) {
//         const { status, data } = err.response;
//         message.error(getControllerErrMsg(ErrMap.login, '登录', status, data?.detail));
//       }
//     },
//     {
//       manual: true,
//     },
//   );
//   return {
//     loginController,
//   };
// };

// export default useLogin;
