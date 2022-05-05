import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import styles from './index.less';

interface MenuData {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuData[];
}

interface iProps {
  onClick: (val: any) => void;
}

const { SubMenu } = Menu;

const menuList: MenuData[] = [
  {
    label: '首页',
    path: '/home',
    icon: <HomeOutlined />,
  },
];

const getDefaultOpenKeys = (pathname: string): string[] => {
  const res: string[] = [];
  for (let i = 0; i < menuList.length; i += 1) {
    const { children } = menuList[i];
    children?.forEach((sub) => {
      if (sub.path === pathname) res.push(menuList[i].path as string);
    });
  }
  return res;
};

function LFMenu(props: iProps) {
  const { onClick } = props;
  const { pathname } = useLocation();
  const defaultOpenKeys = getDefaultOpenKeys(pathname);
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[pathname]}
      mode="inline"
      defaultOpenKeys={defaultOpenKeys}
      onClick={onClick}
      className={styles.menu}
    >
      {menuList?.map((item) => {
        const { label, children, path, icon } = item;
        if (!children) {
          return (
            <Menu.Item key={path} icon={icon}>
              {label}
            </Menu.Item>
          );
        }
        return (
          <SubMenu key={path} icon={icon} title={label}>
            {children.map((sub) => (
              <Menu.Item key={sub.path}>{sub.label}</Menu.Item>
            ))}
          </SubMenu>
        );
      })}
    </Menu>
  );
}

export default LFMenu;
