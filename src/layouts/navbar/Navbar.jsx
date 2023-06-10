import { UserOutlined } from '@ant-design/icons';
import { ROUTES } from '@utils/routes';
import { Button, Layout, Menu, Typography } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './navbar.module.css';

const { Header: AntHeader } = Layout;

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AntHeader className={cn(styles.navbar_background)}>
      <div className={cn(styles.logo)}>
        <Typography.Title level={3}>ProXcure</Typography.Title>
      </div>

      <Menu
        theme='light'
        mode='horizontal'
        selectedKeys={[location.pathname]}
        items={routes.map((route) => ({
          ...route,
          onClick: () => navigate(route.key)
        }))}
      />
      <Menu
        theme='light'
        selectable={false}
        mode='horizontal'
        overflowedIndicator={
          <Button
            icon={<UserOutlined />}
            type='primary'
            shape='circle'
            size='large'
          ></Button>
        }
        getPopupContainer={undefined}
        style={{ position: 'absolute', top: 0, right: 10, maxWidth: '150px' }}
        items={dropDownRoutes.map((route) => ({
          ...route,
          onClick: () => navigate(route.key)
        }))}
      />
    </AntHeader>
  );
}

export default NavBar;

const routes = [];

const dropDownRoutes = [
  {
    label: 'Profile',
    key: ROUTES.PROFILE
  },
  {
    label: 'Logout',
    key: ROUTES.LOGOUT
  }
];
