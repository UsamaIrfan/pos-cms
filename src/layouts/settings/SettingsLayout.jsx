import { THEME_OPTIONS } from '@utils/enums';
import { ROUTES } from '@utils/routes';
import { Layout, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Colors from 'src/theme/Colors';

import styles from './settings.module.css';

import { NavBar } from '..';

const { Content } = Layout;
const SettingsLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.app.theme);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar />
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className={cn(styles.site_container)}
            style={{
              padding: 12,
              marginTop: 24,
              minHeight: 280,
              backgroundColor:
                theme === THEME_OPTIONS.DARK
                  ? Colors.default.black1
                  : Colors.default.white1
            }}
          >
            <Sider className='site-layout-background' width={200}>
              <Menu
                mode='inline'
                defaultSelectedKeys={[ROUTES.SETTINGS.PROFILE]}
                selectedKeys={[location.pathname]}
                style={{ height: '100%' }}
                items={settingRoutes}
                onClick={({ key }) => navigate(key)}
              />
            </Sider>
            <Content
              style={{
                padding: '0 24px',
                minHeight: 280,
                backgroundColor:
                  theme === THEME_OPTIONS.DARK
                    ? Colors.default.black1
                    : Colors.default.white1
              }}
            >
              <Outlet />
            </Content>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default SettingsLayout;

const settingRoutes = [
  {
    label: 'Settings',
    type: 'group',
    children: [
      {
        label: 'Personal Profile',
        key: ROUTES.SETTINGS.PROFILE
      },
      {
        label: 'Theme Settings',
        key: ROUTES.SETTINGS.THEME
      }
    ]
  }
];
