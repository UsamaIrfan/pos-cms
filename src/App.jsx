import SettingsLayout from '@layouts/settings/SettingsLayout';
import { ROUTES } from '@utils/routes';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from '@components/auth/PrivateRoute';

import { store } from '@store';

import { CompanyLayout, DashboardLayout } from './layouts';
import {
  BOQ,
  Company,
  CreateBoqSection,
  CreateCompany,
  CreateSectionItem,
  CreateTender,
  Section,
  SectionItems,
  Tender
} from './pages';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import LoginPage from './pages/Auth/Login/Login';
import Logout from './pages/Auth/Logout';
import RegisterPage from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import VerifyEmailPage from './pages/Auth/VerifyEmail/VerifyEmail';
import VerifyForgotPassword from './pages/Auth/VerifyForgotPassword/VerifyForgotPassword';
import CreateBoq from './pages/BOQ/CreateBoq/CreateBoq';
import AppSettings from './pages/Settings/AppSettings';
import ThemeProvider from './theme/ThemeProvider';

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
        <Route element={<CompanyLayout />}>
          <Route path={ROUTES.COMPANY.MANAGE} element={<Company />} />
          <Route
            path={ROUTES.COMPANY.CREATE}
            element={
              <PrivateRoute>
                <CreateCompany />
              </PrivateRoute>
            }
          />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute>
                <div>App</div>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.TENDER.MANAGE}
            element={
              <PrivateRoute>
                <Tender />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.TENDER.CREATE}
            element={
              <PrivateRoute>
                <CreateTender />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.BOQ.MANAGE}
            element={
              <PrivateRoute>
                <BOQ />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.BOQ.CREATE}
            element={
              <PrivateRoute>
                <CreateBoq />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SECTION.MANAGE}
            element={
              <PrivateRoute>
                <Section />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SECTION.CREATE}
            element={
              <PrivateRoute>
                <CreateBoqSection />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SECTION_ITEMS.MANAGE}
            element={
              <PrivateRoute>
                <SectionItems />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SECTION_ITEMS.CREATE}
            element={
              <PrivateRoute>
                <CreateSectionItem />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<SettingsLayout />}>
          <Route
            path={ROUTES.SETTINGS.THEME}
            element={
              <PrivateRoute>
                <AppSettings />
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
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default WrappedApp;
