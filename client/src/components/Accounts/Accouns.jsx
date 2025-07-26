import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Grid, Box, Typography } from '@mui/material';
import nameAccount from '../../helpers/data/SCHETA.json';

const Accounts = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (nameAccount && Array.isArray(nameAccount)) {
      // Модифікуємо RE_SCH_ID, якщо він дорівнює 0
      const updatedRows = nameAccount.map((obj) => {
        if (obj.SCH_ID === 0) {
          obj.SCH_ID = 99999; // Змінюємо на 99999
        }
        obj.id = obj.SCH_ID;
        return obj;
      });
      setRows(updatedRows); // Встановлюємо модифіковані дані
    }
  }, []);

  // Фільтрування за пошуком
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.SCH_ID.toString().includes(search) ||
      row.SCH_NAME.toString().includes(search) ||
      row.SCH_GROUP.toString().includes(search) ||
      row.SCH_CUR.toString().includes(search) ||
      row.SCH_TYPE.toString().includes(search) ||
      row.SCH_BANK_NAME.toString().includes(search)
    );
  });

  const columns = [
    { field: 'SCH_ID', headerName: 'ID', width: 100 },
    { field: 'SCH_NAME', headerName: 'Назва рахунку', width: 350 },
    { field: 'SCH_GROUP', headerName: 'Група', width: 150 },
    { field: 'SCH_CUR', headerName: 'Курс', width: 150 },
    { field: 'SCH_TYPE', headerName: 'Тип рахунку', width: 150 },
    { field: 'SCH_BANK_NAME', headerName: 'Банк', width: 150 },
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

      {/* Таблиця MUI DataGrid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default Accounts;
