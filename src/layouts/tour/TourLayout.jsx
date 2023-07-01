import {
  AppstoreOutlined,
  ContainerOutlined,
  DollarCircleOutlined,
  FileWordOutlined
} from '@ant-design/icons';
import NavBar from '@layouts/navbar/Navbar';
import { THEME_OPTIONS } from '@utils/enums';
import { ROUTES } from '@utils/routes';
import { Layout } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Colors from 'src/theme/Colors';

import styles from './app.module.css';

const { Content, Sider } = Layout;

const TourLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.app.theme);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <NavBar hideProfileMenu />
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className={cn(styles.site_container)}
            style={{
              padding: 12,
              marginTop: 24,
              minHeight: 280,
              background:
                theme === THEME_OPTIONS.DARK
                  ? Colors.default.black1
                  : Colors.default.white1
            }}
          >
            <div className={cn(styles.page_container)}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const items = [
  {
    route: ROUTES.TENDER.MANAGE,
    key: ROUTES.TENDER.MANAGE,
    label: 'Tender Management',
    icon: <FileWordOutlined />
  },
  {
    route: ROUTES.BOQ.MANAGE,
    key: ROUTES.BOQ.MANAGE,
    label: 'Bill of Quantity Management',
    icon: <DollarCircleOutlined />
  },
  {
    route: ROUTES.SECTION.MANAGE,
    key: ROUTES.SECTION.MANAGE,
    label: 'BOQ Sections',
    icon: <AppstoreOutlined />
  },
  {
    route: ROUTES.SECTION_ITEMS.MANAGE,
    key: ROUTES.SECTION_ITEMS.MANAGE,
    label: 'Sections Items',
    icon: <ContainerOutlined />
  }
];

export default TourLayout;
