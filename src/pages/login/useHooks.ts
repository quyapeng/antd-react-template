import { useRequest } from 'ahooks';
import { login, LoginParams } from '@/services/loginService';
import { message } from 'antd';
import { history } from 'umi';
import { ErrMap, getControllerErrMsg } from '@/utils/message';

const useLogin = () => {
  const loginController = useRequest(
    async (params: LoginParams) => {
      console.log('params', params);
      // login(params);
      try {
        const { data } = await login(params);
        message.success('登录成功');
        console.log('ddd------', data);
        // localStorage.setItem('username', user_info.username);
        // localStorage.setItem('token', token);
        // history.replace('/home');
      } catch (err: any) {
        console.log(err);
        const { status, msg } = err.response;

        message.error(getControllerErrMsg(ErrMap.login, '登录', status, msg));
      }
    },
    {
      manual: true,
    },
  );
  return {
    loginController,
  };
};

export default useLogin;
