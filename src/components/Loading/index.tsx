import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

function Loading() {
  return (
    <div className={styles.wrap}>
      <Spin tip="加载中..." delay={300} />
    </div>
  );
}
export default Loading;
