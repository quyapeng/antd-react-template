import React, { memo, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { LoginParams } from '@/services/loginService';
import { history } from 'umi';
// import Cookies from 'js-cookie';
import styles from './index.less';
import useLogin from './useHooks';

function LoginForm() {
  const [form] = Form.useForm();
  const { loginController } = useLogin();

  const onFinish = (value: LoginParams) => {
    value.grant_type = 'password';
    value.scope = 'client';
    loginController.run(value);
  };

  useEffect(() => {
    // Bug ==> umijs
    // 兼容跳转之后 useEffect 先于 onRouteChange 执行导致 token不更新问题
    if (history.location?.query?.type === 'valid') {
      window.history.replaceState({}, '', '#/login');
      window.location.reload();
      return;
    }
  }, [form]);

  return (
    <div className={styles.loginWrap}>
      <h1>欢迎登录</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
        form={form}
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input allowClear placeholder="请输入账号名称" maxLength={20} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            allowClear
            placeholder="请输入密码"
            maxLength={20}
            autoComplete="off"
          />
        </Form.Item>

        {/* <Form.Item>
          <div className={styles.remember}>
            <Form.Item noStyle name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </div>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loginController.loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(LoginForm);
