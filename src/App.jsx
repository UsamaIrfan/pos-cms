import { ROUTES } from '@utils/routes';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from '@components/auth/PrivateRoute';

import { store } from '@store';

import { DashboardLayout } from './layouts';
import LoginPage from './pages/Login';
import Logout from './pages/Logout';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />
        <Route element={<DashboardLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute>
                <div>App</div>
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

const WrappedApp = () => {
  return (
    <Provider store={store()}>
      <ConfigProvider
        getPopupContainer={(trigger) => trigger?.parentNode}
        theme={{ token: { colorPrimary: '#4c52bc' } }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  );
};

export default WrappedApp;
