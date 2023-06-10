import NavBar from '@layouts/navbar/Navbar';
import { ROUTES } from '@utils/routes';
import { Layout, Menu } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from './app.module.css';

const { Content, Sider } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <NavBar />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={280}
          className={cn(styles.site_container, 'custom-scroll')}
          theme='light'
        >
          <Menu
            mode='inline'
            theme='light'
            defaultOpenKeys={['0']}
            selectedKeys={['0', '1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items.map((item) => ({
              ...item,
              children: item.children
                ? item.children?.map((child) => ({
                    ...child,
                    onClick: () => navigate(child.route)
                  }))
                : []
            }))}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className={cn(styles.site_container)}
            style={{
              padding: 12,
              marginTop: 24,
              minHeight: 280
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const items = [
  {
    key: '0',
    label: 'Dashboard',
    children: [
      {
        route: ROUTES.TENDER.MANAGE,
        key: '1',
        label: 'Tender Management'
      }
    ]
  }
];

export default DashboardLayout;
