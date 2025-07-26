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
import Accounts from './Accounts/Accouns';

// import Specialists from './Admin/scenes/Specialists/spesialists';
// import Categories from './Admin/scenes/Categories/categories';
// import Events from './Admin/scenes/Events/events';
// import Activate_events from './Admin/scenes/Activate_events/activate_events';
// import Orders from './Admin/scenes/Orders/orders';
// import Messages from './Admin/scenes/Message/message';

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
  // const TeamPage = lazy(() => import('pages/TeamPage'));
  // const SpecialistPage = lazy(() => import('pages/SpecialistPage'));
  // const EventsPage = lazy(() => import('pages/EventsPage'));
  // const EventDetailsPage = lazy(() => import('pages/EventDetailsPage'));
  // const AboutUsPage = lazy(() => import('pages/AboutUsPage'));
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
              {/* {/* <Route
                path="categories"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<Categories />}
                  />
                }
              /> */}
              <Route
                path='account_balances'
                element={<PrivateRoute redirectTo='/login' component={<AccountBalances />} />}
              />
              <Route
                path='accounts'
                element={<PrivateRoute redirectTo='/login' component={<Accounts />} />}
              />
              {/* <Route
                path="activate_events"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<Activate_events />}
                  />
                }
              /> */}
              {/* <Route
                path="orders"
                element={
                  <PrivateRoute redirectTo="/login" component={<Orders />} />
                }
              /> */}
              {/* <Route
                path="messages"
                element={
                  <PrivateRoute redirectTo="/login" component={<Messages />} />
                }
              /> */}
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

            {/* <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailsPage />} />
            <Route path="specialists" element={<TeamPage />} />
            <Route path="specialists/:id" element={<SpecialistPage />} />
            <Route path="about" element={<AboutUsPage />} /> */}

            <Route path='*' element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};
