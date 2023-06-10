import { ROUTES } from '@utils/routes';
import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from '@components/auth/PrivateRoute';

import { store } from '@store';

import { DashboardLayout } from './layouts';
import { CreateTender, Tender } from './pages';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import LoginPage from './pages/Auth/Login/Login';
import Logout from './pages/Auth/Logout';
import RegisterPage from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import VerifyEmailPage from './pages/Auth/VerifyEmail/VerifyEmail';
import VerifyForgotPassword from './pages/Auth/VerifyForgotPassword/VerifyForgotPassword';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route
          path={ROUTES.VERIFY_FORGOT_TOKEN}
          element={<VerifyForgotPassword />}
        />
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
          <Route path={ROUTES.TENDER.MANAGE} element={<Tender />} />
          <Route path={ROUTES.TENDER.CREATE} element={<CreateTender />} />
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
        theme={{
          token: { colorPrimary: '#4c52bc', fontFamily: 'Primary' },
          algorithm: theme.compactAlgorithm
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  );
};

export default WrappedApp;
