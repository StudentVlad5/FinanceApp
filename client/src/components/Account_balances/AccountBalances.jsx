import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Grid, Box, Typography } from '@mui/material';
import data from '../../helpers/data/REESTR.json';
import nameAccount from '../../helpers/data/SCHETA.json';

const AccountBalances = () => {
  // Функція для сумування даних по RE_SCH_ID
  const sumById = (data) => {
    const result = [];

    data.forEach((item) => {
      // Переконуємося, що ці значення числові
      const money = Math.round(+item.RE_MONEY * (+item.RE_KURS || 1) * 100) / 100 || 0;

      let existing = result.find((obj) => obj.RE_SCH_ID === item.RE_SCH_ID);
      if (existing) {
        // Додаємо до існуючого значення
        existing.RE_MONEY += money;
      } else {
        // Створюємо новий запис
        result.push({ RE_SCH_ID: item.RE_SCH_ID, RE_MONEY: money });
      }
    });

    // Якщо є запис з RE_SCH_ID === 0, змінюємо його на 99999
    let correctResult = result.find((obj) => obj.RE_SCH_ID === 0);
    if (correctResult) {
      correctResult.RE_SCH_ID = 99999;
    }

    // отримуємо назву рахунку
    result.forEach((it) => {
      const perem = nameAccount.find((item) => item.SCH_ID === it.RE_SCH_ID);
      if (perem) {
        it.SCH_NAME = perem.SCH_NAME;
      }
    });

    return result.map((row, index) => ({
      ...row,
      id: row.RE_SCH_ID || index + 1,
      RE_MONEY: Math.round(row.RE_MONEY * 100) / 100,
    }));
  };

  const [rows, setRows] = useState(sumById(data));
  const [search, setSearch] = useState('');

  // Фільтрування за пошуком
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.RE_SCH_ID.toString().includes(search) ||
      row.RE_MONEY.toString().includes(search) ||
      row.SCH_NAME.toString().includes(search)
    );
  });

  // Обчислення загальної суми
  const totalMoney = filteredRows.reduce((total, row) => total + row.RE_MONEY, 0);

  // Округлення підсумку до двох знаків після коми
  const roundedTotalMoney = Math.round(totalMoney * 100) / 100;

  const columns = [
    { field: 'RE_SCH_ID', headerName: 'ID', width: 150 },
    { field: 'SCH_NAME', headerName: 'Назва рахунку', width: 350 },
    { field: 'RE_MONEY', headerName: 'Сума', width: 150 },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h6' gutterBottom>
        Таблиця з сумами за RE_SCH_ID
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
      <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          checkboxSelection
        />
      </div>

      {/* Підсумок */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant='h6'>Загальний підсумок: {roundedTotalMoney}</Typography>
      </Box>
    </Box>
  );
};

export default AccountBalances;
