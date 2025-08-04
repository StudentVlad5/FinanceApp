import { HelmetProvider } from 'react-helmet-async';
import { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { RestrictedRoute } from 'routes/RestrictedRoute';
import { PrivateRoute } from 'routes/PrivateRoute';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing, getPermission } from './redux/auth/selectors';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import AccountBalances from './components/Account_balances/AccountBalances';
import Accounts from './components/Accounts/Accounts';
import Currency from './components/Currency/Currency';
import Group from './components/Group/Group';
import Types from './components/Types/Types';
import AccountDetails from './components/Account_balances/AccountDetails/AccountDetails';
import Contragents from './components/Contragents/Contragents';
import Tags from './components/Tags/Tags';
import Categories from './components/Categories/Categories';

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
        <Router>
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
                  path='account_balances/:id'
                  element={<PrivateRoute redirectTo='/login' component={<AccountDetails />} />}
                />
                <Route
                  path='accounts'
                  element={<PrivateRoute redirectTo='/login' component={<Accounts />} />}
                />
                <Route
                  path='group'
                  element={<PrivateRoute redirectTo='/login' component={<Group />} />}
                />
                <Route
                  path='types'
                  element={<PrivateRoute redirectTo='/login' component={<Types />} />}
                />
                <Route
                  path='currency'
                  element={<PrivateRoute redirectTo='/login' component={<Currency />} />}
                />
                <Route
                  path='contragents'
                  element={<PrivateRoute redirectTo='/login' component={<Contragents />} />}
                />
                <Route
                  path='categories'
                  element={<PrivateRoute redirectTo='/login' component={<Categories />} />}
                />
                <Route
                  path='tags'
                  element={<PrivateRoute redirectTo='/login' component={<Tags />} />}
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
        </Router>
      </Suspense>
    </HelmetProvider>
  );
};
