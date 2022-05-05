import { useRequest } from 'ahooks';
import { login, LoginParams } from '@/services/loginService';
import { message } from 'antd';
import { history } from 'umi';
import { ErrMap, getControllerErrMsg } from '@/utils/message';
import { xsrfHeaderName } from '@/constant';

const useLogin = () => {
  const loginController = useRequest(
    async (params: LoginParams) => {
      // login(params);
      try {
        const {
          data: { access_token, token_type },
        } = await login(params);
        message.success('登录成功');
        localStorage.setItem(xsrfHeaderName, `${token_type} ${access_token}`);
        history.replace('/home');
      } catch (error: any) {
        console.log(error);
        const { code, msg } = error.response.data;
        console.log(error.response);
        message.error(getControllerErrMsg(ErrMap.login, '登录', code, msg));
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
