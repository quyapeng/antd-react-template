import React, { useState, useMemo } from 'react';
import { IRouteComponentProps } from 'umi';
import { Layout, ConfigProvider, Space, Tag } from 'antd';
import { ToolOutlined, AlertOutlined } from '@ant-design/icons';
import { RecoilRoot } from 'recoil';
import { envMap } from '@/constant';
import zhCN from 'antd/es/locale/zh_CN';
import styles from './index.less';
import LFMenu from './LFMenu';
import HeaderMenu from './HeaderMenu';

const { Header, Content, Sider: Slider } = Layout;

export default function MainLayout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = location;
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const currentEnv = useMemo(() => {
    if (origin.includes('localhost')) {
      return <Tag icon={<ToolOutlined />}>{envMap.local}</Tag>;
    }
    if (origin.includes('staging-kjds')) {
      return (
        <Tag icon={<AlertOutlined />} color="warning">
          {envMap.stg}
        </Tag>
      );
    }
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <RecoilRoot>
        {pathname === '/login' ? (
          children
        ) : (
          <Layout style={{ minHeight: '100vh' }}>
            <Slider
              collapsible
              collapsed={collapsed}
              onCollapse={onCollapse}
              theme="dark"
              className={styles.slider}
            >
              <div className={styles.logoWrap} />
              <LFMenu onClick={({ key }) => history.push(key)} />
            </Slider>
            <Layout className={styles.layout}>
              <Header className={styles.header}>
                <Space>
                  {currentEnv}
                  <HeaderMenu />
                </Space>
              </Header>
              <Content className={styles.container}>{children}</Content>
            </Layout>
          </Layout>
        )}
      </RecoilRoot>
    </ConfigProvider>
  );
}
