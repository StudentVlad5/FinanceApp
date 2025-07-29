import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCurrencies,
  createCurrency,
  deleteCurrency,
  editCurrency,
} from '../../redux/currency/operations';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Currency = () => {
  const dispatch = useDispatch();

  const { items: currencies, isLoading } = useSelector((state) => state.currency);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newCurrency, setNewCurrency] = useState({
    CUR_ID: '',
    CUR_SHOT_NAME: '',
    CUR_NAME: '',
    CUR_SHOT_NAME_US: '',
    CUR_VIEW: '',
    CUR_TYPE: '',
    CUR_LOW: '',
    CUR_HIGH: '',
    CUR_UPDATE: '',
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewCurrency({ ...newCurrency, [e.target.name]: e.target.value });
  };

  const handleAddCurrency = () => {
    if (newCurrency.CUR_ID.trim() !== '') {
      dispatch(createCurrency(newCurrency));
      setNewCurrency({
        CUR_ID: '',
        CUR_SHOT_NAME: '',
        CUR_NAME: '',
        CUR_SHOT_NAME_US: '',
        CUR_VIEW: '',
        CUR_TYPE: '',
        CUR_LOW: '',
        CUR_HIGH: '',
        CUR_UPDATE: '',
      });
    }
  };

  const handleDelete = (id) => {
    if (id) dispatch(deleteCurrency(id));
  };

  const handleEdit = (row) => {
    if (row._id)
      dispatch(editCurrency({ id: row._id, data: row })).then(
        setTimeout(() => {
          dispatch(getAllCurrencies());
        }, 500),
      );
  };

  const filteredRows = currencies.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const columns = [
    { field: 'CUR_ID', headerName: 'ID', width: 100 },
    { field: 'CUR_SHOT_NAME', headerName: 'Скорочена назва валюти', width: 100, editable: true },
    { field: 'CUR_NAME', headerName: 'Назва Валюти', width: 200, editable: true },
    { field: 'CUR_SHOT_NAME_US', headerName: 'АББР', width: 150, editable: true },
    { field: 'CUR_VIEW', headerName: 'Вид', width: 150, editable: true },
    { field: 'CUR_TYPE', headerName: 'Тип', width: 150, editable: true },
    // { field: 'CUR_LOW', headerName: 'LOW', width: 150, editable: true },
    // { field: 'CUR_HIGH', headerName: 'HIGH', width: 150, editable: true },
    // { field: 'CUR_UPDATE', headerName: 'UPDATE', width: 150, editable: true },
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
        Перелік валют
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

      {/* Форма для додавання нової валюти */}
      <AddTaskIcon sx={{ m: 1.5, cursor: 'pointer' }} onClick={() => setAdd((prev) => !prev)} />
      {add && (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label='ID'
              name='CUR_ID'
              value={newCurrency.CUR_ID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Коротка назва валюти'
              name='CUR_SHOT_NAME'
              value={newCurrency.CUR_SHOT_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Назва валюти'
              name='CUR_NAME'
              value={newCurrency.CUR_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Абрр'
              name='CUR_SHOT_NAME_US'
              value={newCurrency.CUR_SHOT_NAME_US}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Символ валюти'
              name='CUR_VIEW'
              value={newCurrency.CUR_VIEW}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Тип'
              name='CUR_TYPE'
              value={newCurrency.CUR_TYPE}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='LOW'
              name='CUR_LOW'
              value={newCurrency.CUR_LOW}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='HIGH'
              name='CUR_HIGH'
              value={newCurrency.CUR_HIGH}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Дата зміни'
              name='CUR_UPDATE'
              value={newCurrency.CUR_UPDATE}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAddCurrency} variant='contained' color='success'>
              Додати валюту
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

export default Currency;
