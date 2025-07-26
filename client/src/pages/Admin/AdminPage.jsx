import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SEO } from 'utils/SEO';
// import { fetchData } from 'services/APIservice';
// import { useDispatch } from 'react-redux';
import Topbar from 'components/Admin/global/Topbar';
import Sidebar from 'components/Admin/global/Sidebar';
import { AdminContainer } from './Pages.styled';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import ChangePasswordForm from 'components/Auth/ChangePasswordForm/ChangePasswordForm';
// import { getCategory } from '../../redux/category/operation';
// import { getSpecialists } from '../../redux/specialists/operation';
// import { getEvents } from '../../redux/events/operation';
// import { getActiveEvents } from '../../redux/activate_events/operation';
// import { getOrders } from '../../redux/orders/operation';
// import { getMessages } from '../../redux/messages/operation';

const AdminPage = () => {
  //   const [category, setCategory] = useState([]);
  //   const [specialists, setSpecialists] = useState([]);
  //   const [events, setEvents] = useState([]);
  //   const [active_events, setActive_events] = useState([]);
  //   const [orders, setOrders] = useState([]);
  //   const [messages, setMessages] = useState([]);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData(`/categories`);
  //         dispatch(getCategory({ ...data }));
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //         setCategory(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData(`/specialists`);
  //         dispatch(getSpecialists({ ...data }));
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //         setSpecialists(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData(`/events`);
  //         dispatch(getEvents({ ...data }));
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //         setEvents(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData(`/active_events`);
  //         dispatch(getActiveEvents({ ...data }));
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //         setActive_events(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //       setTimeout(()=>getData(), 60000)
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData(`/orders`);
  //         dispatch(getOrders({ ...data }));
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //         setOrders(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //       setTimeout(()=>getData(), 60000)
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     (async function getData() {
  //       setIsLoading(true);
  //       try {
  //         const { data } = await fetchData(`/messages`);
  //         dispatch(getMessages({ ...data }));
  //         if (!data) {
  //           return onFetchError('Whoops, something went wrong');
  //         }
  //         setMessages(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //         setTimeout(()=>getData(), 60000)
  //       }
  //     })();
  //   }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title='Administration' description='Page Administration' />
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      <Topbar />
      <AdminContainer>
        <Sidebar />
        <Outlet />
        <ChangePasswordForm />
      </AdminContainer>
    </>
  );
};

export default AdminPage;
