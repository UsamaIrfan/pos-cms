import { ROUTES } from '@utils/routes';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from '@components/auth/PrivateRoute';

import { store } from '@store';

import { DashboardLayout } from './layouts';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import LoginPage from './pages/Login/Login';
import Logout from './pages/Logout';
import RegisterPage from './pages/Register/Register';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import VerifyEmailPage from './pages/VerifyEmail/VerifyEmail';
import VerifyForgotPassword from './pages/VerifyForgotPassword/VerifyForgotPassword';

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
        theme={{ token: { colorPrimary: '#4c52bc', fontFamily: 'Primary' } }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  );
};

export default WrappedApp;
