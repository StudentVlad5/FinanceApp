import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SEO } from 'utils/SEO';
import Topbar from 'components/Admin/global/Topbar';
import Sidebar from 'components/Admin/global/Sidebar';
import { AdminContainer } from './Pages.styled';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import ChangePasswordForm from 'components/Auth/ChangePasswordForm/ChangePasswordForm';
import { useDispatch } from 'react-redux';
import { getAllCurrencies } from '../../redux/currency/operations';
import { getAllAccounts } from '../../redux/accounts/operations';
import { getAllGroup } from '../../redux/group/operations';
import { getAllTypes } from '../../redux/types/operations';
import { getAllContragents } from '../../redux/contragents/operations';
import { getAllTags } from '../../redux/tags/operations';

const AdminPage = () => {
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(getAllCurrencies());
    dispatch(getAllAccounts());
    dispatch(getAllGroup());
    dispatch(getAllTypes());
    dispatch(getAllContragents());
    dispatch(getAllTags());
  }, [dispatch]);

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
