import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, createType, deleteType, editType } from '../../redux/types/operations';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Types = () => {
  const dispatch = useDispatch();

  const { items: types, isLoading } = useSelector((state) => state.types);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newType, setNewType] = useState({
    TPSCH_ID: '',
    TPSCH_NAME: '',
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewType({ ...newType, [e.target.name]: e.target.value });
  };

  const handleAddType = () => {
    if (newType.TPSCH_ID.trim() !== '') {
      dispatch(createType(newType));
      setNewType({
        TPSCH_ID: '',
        TPSCH_NAME: '',
      });
    }
  };

  const handleDelete = (id) => {
    if (id) dispatch(deleteType(id));
  };

  const handleEdit = (row) => {
    if (row._id)
      dispatch(editType({ id: row._id, data: row })).then(
        setTimeout(() => {
          dispatch(getAllTypes());
        }, 500),
      );
  };

  const filteredRows = types.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const columns = [
    { field: 'TPSCH_ID', headerName: 'ID', width: 100 },
    { field: 'TPSCH_NAME', headerName: 'Назва типу', width: 200, editable: true },
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
        Словник типів рахунків
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

      {/* Форма для додавання нового типу */}
      <AddTaskIcon sx={{ m: 1.5, cursor: 'pointer' }} onClick={() => setAdd((prev) => !prev)} />
      {add && (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label='ID'
              name='TPSCH_ID'
              value={newType.TPSCH_ID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Назва типу'
              name='TPSCH_NAME'
              value={newType.TPSCH_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAddType} variant='contained' color='success'>
              Додати групу
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

export default Types;
