import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTags, createTag, deleteTag, editTag } from '../../redux/tags/operations';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Tags = () => {
  const dispatch = useDispatch();

  const { items: tags, isLoading } = useSelector((state) => state.tags);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newTag, setNewTag] = useState({
    TG_ID: '',
    TG_NAME: '',
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewTag({ ...newTag, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (newTag.TG_ID.trim() !== '') {
      dispatch(createTag(newTag));
      setNewTag({
        TG_ID: '',
        TG_NAME: '',
      });
    }
  };

  const handleDelete = (id) => {
    if (id) dispatch(deleteTag(id));
  };

  const handleEdit = (row) => {
    if (row._id)
      dispatch(editTag({ id: row._id, data: row })).then(
        setTimeout(() => {
          dispatch(getAllTags());
        }, 500),
      );
  };

  const filteredRows = tags.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const columns = [
    { field: 'TG_ID', headerName: 'ID', width: 100 },
    { field: 'TG_NAME', headerName: 'Назва тегу', width: 300, editable: true },
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
        Словник тегів
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

      {/* Форма для додавання нового тегу */}
      <AddTaskIcon sx={{ m: 1.5, cursor: 'pointer' }} onClick={() => setAdd((prev) => !prev)} />
      {add && (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label='ID'
              name='TG_ID'
              value={newTag.TG_ID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Назва тегу'
              name='TG_NAME'
              value={newTag.TG_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAddTag} variant='contained' color='success'>
              Додати тег
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

export default Tags;
