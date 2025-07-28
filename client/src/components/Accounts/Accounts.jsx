import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAccounts,
  createAccount,
  deleteAccount,
  editAccount,
} from '../../redux/accounts/operations';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Accounts = () => {
  const dispatch = useDispatch();
  const { items: accounts, isLoading } = useSelector((state) => state.accounts);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newAccount, setNewAccount] = useState({
    SCH_ID: '',
    SCH_NAME: '',
    SCH_GROUP: '',
    SCH_CUR: '',
    SCH_TYPE: '',
    SCH_BANK_NAME: '',
    SCH_DATE: '',
    SCH_VID: '',
    SCH_KONTAKT_NAME: '',
    SCH_KONTAKT_TEL: '',
    SCH_KOL_AMORTIZ: '',
    SCH_PROC: '',
    SCH_PAYEE: '',
    SCH_TYPE_PROC: '',
    SCH_PERIOD: '',
    SCH_PERIOD_NACH_PRO: '',
    SCH_DATE_CREDIT: '',
    SCH_KOM_MES: '',
    SCH_W: '',
    SCH_SUM: '',
    SCH_MEMO: '',
    SCH_CDATE: '',
    SCH_CSUM: '',
    SCH_SYNC: '',
    SCH_HIDE: '',
  });

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [dispatch]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleAddAccount = () => {
    if (newAccount.SCH_ID.trim() !== '') {
      dispatch(createAccount(newAccount));
      setNewAccount({
        SCH_ID: '',
        SCH_NAME: '',
        SCH_GROUP: '',
        SCH_CUR: '',
        SCH_TYPE: '',
        SCH_BANK_NAME: '',
        SCH_DATE: '',
        SCH_VID: '',
        SCH_KONTAKT_NAME: '',
        SCH_KONTAKT_TEL: '',
        SCH_KOL_AMORTIZ: '',
        SCH_PROC: '',
        SCH_PAYEE: '',
        SCH_TYPE_PROC: '',
        SCH_PERIOD: '',
        SCH_PERIOD_NACH_PRO: '',
        SCH_DATE_CREDIT: '',
        SCH_KOM_MES: '',
        SCH_W: '',
        SCH_SUM: '',
        SCH_MEMO: '',
        SCH_CDATE: '',
        SCH_CSUM: '',
        SCH_SYNC: '',
        SCH_HIDE: '',
      });
    }
  };

  const handleDelete = (id) => {
    if (id) dispatch(deleteAccount(id));
  };

  const handleEdit = (row) => {
    if (row._id)
      dispatch(editAccount({ id: row._id, data: row })).then(() => {
        dispatch(getAllAccounts()); // форсуємо оновлення persist
      });
  };

  let filteredRows = [];
  if (accounts && Array.isArray(accounts)) {
    filteredRows = accounts.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }

  const columns = [
    { field: 'SCH_ID', headerName: 'ID', width: 100 },
    { field: 'SCH_NAME', headerName: 'Назва рахунку', width: 200, editable: true },
    { field: 'SCH_CUR', headerName: 'Валюта рахунку', width: 100, editable: true },
    { field: 'SCH_TYPE', headerName: 'Тип рахунку', width: 150, editable: true },
    { field: 'SCH_BANK_NAME', headerName: 'Банк рахунку', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Дії',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            size='small'
            onClick={() => handleEdit(params.row)}
            variant='contained'
            color='primary'
          >
            Редагувати
          </Button>
          <Button
            size='small'
            onClick={() => handleDelete(params.row._id)}
            variant='outlined'
            color='error'
            style={{ marginLeft: 8 }}
          >
            Видалити
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h6' gutterBottom>
        Перелік рахунків
      </Typography>
      {/* Поле для пошуку */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Пошук'
            variant='outlined'
            fullWidth
            value={search}
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
      {/* Форма для додавання нового рахунку */}
      <AddTaskIcon sx={{ m: 1.5, cursor: 'pointer' }} onClick={() => setAdd((prev) => !prev)} />
      {add && (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label='ID'
              name='SCH_ID'
              value={newAccount.SCH_ID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Назва рахунку'
              name='SCH_NAME'
              value={newAccount.SCH_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Група рахунку'
              name='SCH_GROUP'
              value={newAccount.SCH_GROUP}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Валюта рахунку'
              name='SCH_CUR'
              value={newAccount.SCH_CUR}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Тип'
              name='SCH_TYPE'
              value={newAccount.SCH_TYPE}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Банк рахунку'
              name='SCH_BANK_NAME'
              value={newAccount.SCH_BANK_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAddAccount} variant='contained' color='success'>
              Додати рахунок
            </Button>
          </Grid>
        </Grid>
      )}
      {/* Таблиця з даними */}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={isLoading}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default Accounts;
