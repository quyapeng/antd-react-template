import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import empty from '@/assets/img/404.png';

function PageNotFound() {
  return (
    <div className={styles.wrap}>
      <section className={styles.main}>
        <img src={empty} alt="404" />
        <p className={styles.text}>
          页面未找到{' '}
          <Button type="link" size="large" onClick={() => history.replace('/')}>
            返回首页
          </Button>
        </p>
      </section>
    </div>
  );
}

PageNotFound.title = '页面未找到';

export default PageNotFound;
