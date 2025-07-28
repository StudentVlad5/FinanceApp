import { HelmetProvider } from 'react-helmet-async';
import { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from 'routes/RestrictedRoute';
import { PrivateRoute } from 'routes/PrivateRoute';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing, getPermission } from '../redux/auth/selectors';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import AccountBalances from './Account_balances/AccountBalances';
import Accounts from './Accounts/Accounts';
import Currency from './Currency/Currency';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const permission = useSelector(getPermission);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const HomePage = lazy(() => import('pages/HomePage'));
  const LoginPage = lazy(() => import('pages/LoginPage'));
  const RegisterPage = lazy(() => import('pages/RegisterPage'));
  const ForgotPasswordPage = lazy(() => import('pages/ForgotPasswordPage'));
  const AdminPage = lazy(() => import('pages/Admin/AdminPage'));

  return isRefreshing ? (
    <></>
  ) : (
    <HelmetProvider>
      <Suspense fallback={<div>{'Loading...'}</div>}>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path='admin'
              element={<PrivateRoute redirectTo='/login' component={<AdminPage />} />}
            >
              <Route
                path='account_balances'
                element={<PrivateRoute redirectTo='/login' component={<AccountBalances />} />}
              />
              <Route
                path='accounts'
                element={<PrivateRoute redirectTo='/login' component={<Accounts />} />}
              />
              <Route
                path='currency'
                element={<PrivateRoute redirectTo='/login' component={<Currency />} />}
              />
            </Route>
            <Route
              path='login'
              element={
                <RestrictedRoute
                  redirectTo={permission === 'admin' ? '/admin' : '/admin'}
                  // redirectTo={permission === 'admin' ? '/admin' : '/user'}
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path='signup'
              element={
                <RestrictedRoute
                  redirectTo={permission === 'admin' ? '/admin' : '/admin'}
                  // redirectTo={permission === 'admin' ? '/admin' : '/user'}
                  component={<RegisterPage />}
                />
              }
            />

            <Route
              path='forgot_password'
              element={
                <RestrictedRoute redirectTo='/user/profile' component={<ForgotPasswordPage />} />
              }
            />
            <Route path='*' element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};
