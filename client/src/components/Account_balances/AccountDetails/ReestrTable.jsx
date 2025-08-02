import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  TablePagination,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

const columns = [
  { id: 'RE_ID', label: 'RE_ID' },
  { id: 'RE_TRANS_SCH_ID', label: 'RE_TRANS_SCH_ID' },
  { id: 'RE_DATE', label: 'RE_DATE' },
  { id: 'RE_KOMENT', label: 'RE_KOMENT' },
  { id: 'RE_PAYE_ID', label: 'RE_PAYE_ID' },
  { id: 'RE_CAT_ID', label: 'RE_CAT_ID' },
  { id: 'RE_MONEY', label: 'RE_MONEY' },
  { id: 'RE_TRANS_RE', label: 'RE_TRANS_RE' },
  { id: 'RE_KURS', label: 'RE_KURS' },
  { id: 'RE_TAG', label: 'RE_TAG' },
];

const ReestrTable = ({ data, onSave, onDelete, setAccountData }) => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { items: accounts } = useSelector((state) => state.accounts);
  const groupAccounts = accounts.reduce((acc, account) => {
    if (account.SCH_ID) {
      acc[account.SCH_ID] = account.SCH_NAME;
    }
    return acc;
  }, {});

  useEffect(() => {
    if (!data || data.length === 0) return;

    const total = data.reduce((acc, account) => {
      const amount = Number(account.RE_MONEY);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    const accountName = groupAccounts[data[0]?.RE_SCH_ID] || 'Доходи/витрати';

    // Зберігаємо у вигляді масиву об'єктів
    setAccountData([{ name: accountName, total }]);
  }, [data, setAccountData, groupAccounts]);

  // пагінація
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // обробник пагінації
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Формат виводу
  const displayFormat = 'DD-MM-YYYY';
  //    moment(value).format(displayFormat)

  //   Format money
  const formatMoney = (value) =>
    value
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .replace('.', ',');

  // Стан фільтрів - ключі співпадають з id колонок
  const [filters, setFilters] = useState({
    RE_ID: '',
    RE_TRANS_SCH_ID: '',
    RE_DATE: '',
    RE_KOMENT: '',
    RE_PAYE_ID: '',
    RE_CAT_ID: '',
    RE_MONEY: '',
    RE_TRANS_RE: '',
    RE_KURS: '',
    RE_TAG: '',
  });

  // Обробник зміни фільтрів
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Сортування за датою (від новішої)
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(b.RE_DATE) - new Date(a.RE_DATE));
  }, [data]);
  // змінюємо візуалізацію
  const formattedData = sortedData.map((it) => ({
    ...it,
    RE_MONEY: formatMoney(+it.RE_MONEY),
    RE_DATE: moment(it.RE_DATE).format(displayFormat),
    RE_TRANS_SCH_ID: groupAccounts[it.RE_TRANS_SCH_ID]
      ? groupAccounts[it.RE_TRANS_SCH_ID]
      : 'Прибуток/збиток',
    // RE_KVO: groupAccounts[it.RE_KVO],
  }));

  // Фільтрація даних по всіх фільтрах
  const filteredData = useMemo(() => {
    return formattedData.filter((item) => {
      return columns.every(({ id }) => {
        const filterValue = filters[id].toLowerCase().trim();
        if (!filterValue) return true;

        const itemValue = item[id];
        if (itemValue === undefined || itemValue === null) return false;

        // Для дати і чисел перетворимо до рядка
        return String(itemValue).toLowerCase().includes(filterValue);
      });
    });
  }, [filters, formattedData]);

  // обмеження виведення рядків
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEditClick = (item) => {
    const originalItem = data.find((el) => el._id === item._id);
    if (originalItem) {
      setEditingItem({ ...originalItem });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editingItem);
    handleClose();
  };

  const handleDelete = (item) => {
    if (window.confirm(`Видалити запис RE_ID: ${item.RE_ID}?`)) {
      onDelete(item);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => (
                <TableCell key={id}>
                  {label}
                  <TextField
                    variant='standard'
                    size='small'
                    name={id}
                    value={filters[id]}
                    onChange={handleFilterChange}
                    placeholder='Пошук...'
                    fullWidth
                    sx={{ mt: 0.5 }}
                  />
                </TableCell>
              ))}
              <TableCell align='center'>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((formattedRow) => (
              <TableRow key={formattedRow._id}>
                {columns.map(({ id }) => (
                  <TableCell key={id}>{formattedRow[id]}</TableCell>
                ))}
                <TableCell align='center'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => handleEditClick(formattedRow)}
                    size='small'
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDelete(formattedRow)}
                    size='small'
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align='center'>
                  Дані не знайдені
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
      {/* Модальне вікно редагування */}
      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Редагувати запис RE_ID: {editingItem?.RE_ID}</DialogTitle>
        <DialogContent dividers>
          {editingItem && (
            <>
              <TextField
                margin='dense'
                label='RE_ID'
                type='number'
                fullWidth
                name='RE_ID'
                value={editingItem.RE_ID}
                onChange={handleChange}
                disabled
              />
              <TextField
                margin='dense'
                label='RE_SCH_ID'
                type='number'
                fullWidth
                name='RE_SCH_ID'
                value={editingItem.RE_SCH_ID}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_DATE'
                type='date'
                fullWidth
                name='RE_DATE'
                value={editingItem.RE_DATE}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin='dense'
                label='RE_KOMENT'
                type='text'
                fullWidth
                name='RE_KOMENT'
                value={editingItem.RE_KOMENT}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_PAYE_ID'
                type='number'
                fullWidth
                name='RE_PAYE_ID'
                value={editingItem.RE_PAYE_ID}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_CAT_ID'
                type='number'
                fullWidth
                name='RE_CAT_ID'
                value={editingItem.RE_CAT_ID}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_MONEY'
                type='number'
                fullWidth
                name='RE_MONEY'
                value={editingItem.RE_MONEY}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_TRANS_RE'
                type='number'
                fullWidth
                name='RE_TRANS_RE'
                value={editingItem.RE_TRANS_RE}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_KURS'
                type='text'
                fullWidth
                name='RE_KURS'
                value={editingItem.RE_KURS}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                label='RE_TAG'
                type='text'
                fullWidth
                name='RE_TAG'
                value={editingItem.RE_TAG}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відмінити</Button>
          <Button variant='contained' onClick={handleSave} color='primary'>
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReestrTable;
