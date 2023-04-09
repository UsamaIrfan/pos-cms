import { ROUTES } from '@utils/routes';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { store } from '@store';

import { DashboardLayout } from './layouts';
import LoginPage from './pages/Login';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.LOGIN} element={<div>App</div>} />
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
