import {
  AppstoreOutlined,
  ContainerOutlined,
  DollarCircleOutlined,
  FileWordOutlined
} from '@ant-design/icons';
import NavBar from '@layouts/navbar/Navbar';
import { THEME_OPTIONS } from '@utils/enums';
import { ROUTES } from '@utils/routes';
import { Layout, Menu } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Colors from 'src/theme/Colors';

import styles from './app.module.css';

const { Content, Sider } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.app.theme);

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
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={items.map((item) => ({
              ...item,
              onClick: item.children ? null : () => navigate(item.route),
              ...(item.icon ? { icon: item?.icon } : {}),
              ...(item.children
                ? {
                    children: item.children
                      ? item.children?.map((child) => ({
                          ...child,
                          onClick: () => navigate(child.route)
                        }))
                      : []
                  }
                : {})
            }))}
          />
        </Sider>
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
            <Outlet />
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

export default DashboardLayout;
