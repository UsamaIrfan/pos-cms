import NavBar from '@layouts/navbar/Navbar';
import { THEME_OPTIONS } from '@utils/enums';
import { ROUTES } from '@utils/routes';
import { Button, Layout } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Colors from 'src/theme/Colors';

import styles from './app.module.css';

const { Content } = Layout;

const TourLayout = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.app.theme);

  const onSkip = () => navigate(ROUTES.DASHBOARD);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar hideProfileMenu />
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className={cn(styles.site_container)}
            style={{
              padding: 12,
              marginTop: 24,
              minHeight: 280,
              position: 'relative',
              background:
                theme === THEME_OPTIONS.DARK
                  ? Colors.default.black1
                  : Colors.default.white1,
            }}
          >
            <Button
              onClick={onSkip}
              style={{ position: 'absolute', top: 10, right: 10 }}
            >
              Skip Accounts Creation
            </Button>
            <div className={cn(styles.page_container)}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default TourLayout;
