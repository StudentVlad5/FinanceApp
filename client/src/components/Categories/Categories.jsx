import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  editCategory,
} from '../../redux/categories/operations';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Categories = () => {
  const dispatch = useDispatch();

  const { items: categories, isLoading } = useSelector((state) => state.categories);
  const [add, setAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [newCategory, setNewCategory] = useState({
    CAT0_ID: '',
    CAT0_NAME: '',
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddCategory = () => {
    if (newCategory.CAT0_ID.trim() !== '') {
      dispatch(createCategory(newCategory));
      setNewCategory({
        CAT0_ID: '',
        CAT0_NAME: '',
      });
    }
  };

  const handleDelete = (id) => {
    if (id) dispatch(deleteCategory(id));
  };

  const handleEdit = (row) => {
    if (row._id)
      dispatch(editCategory({ id: row._id, data: row })).then(
        setTimeout(() => {
          dispatch(getAllCategories());
        }, 500),
      );
  };

  const filteredRows = categories.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const columns = [
    { field: 'CAT0_ID', headerName: 'ID', width: 100 },
    { field: 'CAT0_NAME', headerName: 'Назва категорії', width: 300, editable: true },
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
        Словник контрагентів
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

      {/* Форма для додавання категорії */}
      <AddTaskIcon sx={{ m: 1.5, cursor: 'pointer' }} onClick={() => setAdd((prev) => !prev)} />
      {add && (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label='ID'
              name='CAT0_ID'
              value={newCategory.CAT0_ID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Назва контрагенту'
              name='CAT0_NAME'
              value={newCategory.CAT0_NAME}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAddCategory} variant='contained' color='success'>
              Додати контрагента
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

export default Categories;
