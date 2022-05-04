import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  FileTextOutlined,
  ApiOutlined,
  MobileOutlined,
  WalletOutlined,
} from '@ant-design/icons';
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
  {
    label: 'SIM卡',
    path: '/sim',
    icon: <WalletOutlined />,
  },
  {
    label: '账号清单',
    path: '/account',
    icon: <TeamOutlined />,
  },
  {
    label: '行为日志',
    path: '/behavior',
    icon: <FileTextOutlined />,
  },
  {
    label: '代理配置',
    path: '/proxy',
    icon: <ApiOutlined />,
  },
  {
    label: '设备管理',
    path: '/deviceManager',
    icon: <MobileOutlined />,
    children: [
      {
        label: '手机设备管理',
        path: '/device',
      },
      {
        label: 'APP管理',
        path: '/app',
      },
      {
        label: 'WEB机器管理',
        path: '/webServer',
      },
    ],
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
      theme="light"
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
