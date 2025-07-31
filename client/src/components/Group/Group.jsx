import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroup, createGroup, deleteGroup, editGroup } from '../../redux/group/operations';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Group = () => {
  const dispatch = useDispatch();

  const { items: group, isLoading } = useSelector((state) => state.group);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newGroup, setNewGroup] = useState({
    SCHG_ID: '',
    SCHG_NAME: '',
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
  };

  const handleAddGroup = () => {
    if (newGroup.SCHG_ID.trim() !== '') {
      dispatch(createGroup(newGroup));
      setNewGroup({
        SCHG_ID: '',
        SCHG_NAME: '',
      });
    }
  };

  const handleDelete = (id) => {
    if (id) dispatch(deleteGroup(id));
  };

  const handleEdit = (row) => {
    if (row._id)
      dispatch(editGroup({ id: row._id, data: row })).then(
        setTimeout(() => {
          dispatch(getAllGroup());
        }, 500),
      );
  };

  const filteredRows = group.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const columns = [
    { field: 'SCHG_ID', headerName: 'ID', width: 100 },
    { field: 'SCHG_NAME', headerName: 'Назва групи', width: 200, editable: true },
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
        Словник груп
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

      {/* Форма для додавання нової групи */}
      <AddTaskIcon sx={{ m: 1.5, cursor: 'pointer' }} onClick={() => setAdd((prev) => !prev)} />
      {add && (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label='ID'
              name='SCHG_ID'
              value={newGroup.SCHG_ID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Назва групи'
              name='SCHG_NAME'
              value={newGroup.SCHG_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAddGroup} variant='contained' color='success'>
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

export default Group;
