import React, { useEffect } from 'react';
import { history } from 'umi';
import LoginForm from './LoginForm';
import styles from './index.less';

function LoginPage() {
  useEffect(() => {
    const userName = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (userName && token) history.replace('home');
  }, []);
  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <LoginForm />
      </div>
    </div>
  );
}

LoginPage.title = '登录';

export default LoginPage;
