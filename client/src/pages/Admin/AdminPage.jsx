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

const AdminPage = () => {
  const [isLoading] = useState(false);
  const [error] = useState(null);

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
