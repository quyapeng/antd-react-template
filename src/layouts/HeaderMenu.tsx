import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { Menu, Dropdown, Avatar, Space } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from './index.less';

const menuList = [
  {
    label: '退出登录',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];

function HeaderMenu() {
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const menu = (
    <Menu
      onClick={({ key }) => {
        switch (key) {
          case 'logout':
            // 退出登录
            localStorage.clear();
            history.replace('/login?type=valid');
            break;
        }
      }}
    >
      {menuList.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    const userName = localStorage.getItem('username') || '';
    setUserName(userName);
  }, []);

  return (
    <>
      <Dropdown overlay={menu} arrow overlayClassName={styles.dropDown}>
        <Space>
          <Avatar size={32} icon={<UserOutlined />} /> {userName}{' '}
          <DownOutlined style={{ color: '#ffffff' }} />
        </Space>
      </Dropdown>
    </>
  );
}

export default HeaderMenu;
