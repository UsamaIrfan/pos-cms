import SettingsLayout from '@layouts/settings/SettingsLayout';
import { ROUTES } from '@utils/routes';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import PrivateRoute from '@components/auth/PrivateRoute';

import { store } from '@store';

import { CompanyLayout, DashboardLayout, TourLayout } from './layouts';
import {
  BalanceSheets,
  Company,
  CreateBoqSection,
  CreateCompany,
  CreateInventoryPurchase,
  CreateMasterAccount,
  ItemAccounts,
  MasterAccounts,
  PurchaseInventory,
  Section,
} from './pages';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import LoginPage from './pages/Auth/Login/Login';
import Logout from './pages/Auth/Logout';
import RegisterPage from './pages/Auth/Register/Register';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import VerifyEmailPage from './pages/Auth/VerifyEmail/VerifyEmail';
import VerifyForgotPassword from './pages/Auth/VerifyForgotPassword/VerifyForgotPassword';
import CreateInvestment from './pages/Investment/Investment';
import CreateItemAccount from './pages/ItemAccount/CreateItemAccount/CreateItemAccount';
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
        <Route element={<TourLayout />}>
          <Route
            path={ROUTES.TOUR.MASTER_ACCOUNTS}
            element={<CreateMasterAccount />}
          />{' '}
          <Route
            path={ROUTES.TOUR.ITEM_ACCOUNTS}
            element={<CreateItemAccount />}
          />
        </Route>
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
            path={ROUTES.MASTER_ACCOUNTS.MANAGE}
            element={
              <PrivateRoute>
                <MasterAccounts />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.MASTER_ACCOUNTS.CREATE}
            element={
              <PrivateRoute>
                <CreateMasterAccount />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ITEM_ACCOUNTS.MANAGE}
            element={
              <PrivateRoute>
                <ItemAccounts />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.INVESTMENT}
            element={
              <PrivateRoute>
                <CreateInvestment />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REPORTS.BALANCE_SHEETS}
            element={
              <PrivateRoute>
                <BalanceSheets />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PURCHASE.MANAGE}
            element={
              <PrivateRoute>
                <PurchaseInventory />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PURCHASE.CREATE}
            element={
              <PrivateRoute>
                <CreateInventoryPurchase />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ITEM_ACCOUNTS.CREATE}
            element={
              <PrivateRoute>
                <CreateItemAccount />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SALES.MANAGE}
            element={
              <PrivateRoute>
                <Section />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.SALES.CREATE}
            element={
              <PrivateRoute>
                <CreateBoqSection />
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
