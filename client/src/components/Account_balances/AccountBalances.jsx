import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReestr } from '../../redux/reestr/operations';
import { useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const formatMoney = (value) =>
  value
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace('.', ',');

const AccountBalances = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading, error } = useSelector((state) => state.reestr);
  const { items: group } = useSelector((state) => state.group);
  const { items: accounts } = useSelector((state) => state.accounts);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getReestr());
  }, [dispatch]);

  const groupAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.SCH_GROUP]) acc[account.SCH_GROUP] = [];
    acc[account.SCH_GROUP].push(account);
    return acc;
  }, {});

  const groupNameById = group.reduce((acc, g) => {
    acc[g.SCHG_ID] = g.SCHG_NAME;
    return acc;
  }, {});

  const totalMoneyBySchId = items.reduce((acc, item) => {
    acc[item._id.schId] = item.totalMoney;
    return acc;
  }, {});

  const groupTotals = Object.entries(groupAccounts)
    .map(([groupId, accountsInGroup]) => {
      const accountsFiltered = accountsInGroup
        .map((acc) => ({
          id: acc.SCH_ID,
          name: acc.SCH_NAME,
          money: totalMoneyBySchId[acc.SCH_ID] || 0,
        }))
        .filter((acc) => acc.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.money - b.money);

      const total = accountsFiltered.reduce((sum, acc) => sum + acc.money, 0);

      return {
        groupId,
        groupName: groupNameById[groupId] || `Група ${groupId}`,
        total,
        accounts: accountsFiltered,
      };
    })
    .filter((group) => group.accounts.length > 0); // Only show groups with matches

  const grandTotal = groupTotals.reduce((sum, group) => sum + group.total, 0);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant='h5' gutterBottom>
        Реєстр
      </Typography>

      <TextField
        label='Пошук по назві рахунку'
        variant='outlined'
        size='small'
        fullWidth
        margin='normal'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading && <h3>Прошу зачекати, очікуємо на отримання даних</h3>}
      {error && <h3>Отримали помилку: {error}</h3>}

      {groupTotals.map((group) => (
        <Accordion key={group.groupId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='subtitle1'>{group.groupName}</Typography>
            </Box>
            <Typography variant='subtitle1'>
              <strong>{formatMoney(group.total)} грн</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Рахунок (ID)</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Назва</strong>
                  </TableCell>
                  <TableCell align='right'>
                    <strong>Сума</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.accounts.map((acc) => (
                  <TableRow key={acc.id}>
                    <TableCell>{acc.id}</TableCell>
                    <TableCell
                      onClick={() => navigate(`/admin/account_balances/${acc.id}`)}
                      sx={{ cursor: 'pointer', color: 'black', textDecoration: 'none' }}
                    >
                      {acc.name}
                    </TableCell>
                    <TableCell align='right'>{formatMoney(acc.money)} грн</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant='h6' align='right' sx={{ mt: 3 }}>
        Загальна сума: <strong>{formatMoney(grandTotal)} грн</strong>
      </Typography>
    </Paper>
  );
};

export default AccountBalances;
