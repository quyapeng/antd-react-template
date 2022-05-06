import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { Breadcrumb } from 'antd';
import styles from './index.less';

function BreadCrumb() {
  // const [userName, setUserName] = useState('');
  const history = useHistory();

  useEffect(() => {
    console.log('history', history);
  }, []);

  return (
    <div className={styles.bgWhite}>
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumb;
