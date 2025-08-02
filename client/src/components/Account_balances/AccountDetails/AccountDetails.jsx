import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError, onSuccess } from 'helpers/Messages/NotifyMessages';
import ReestrTable from './ReestrTable';

const formatMoney = (value) =>
  value
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace('.', ',');

const AccountDetails = () => {
  const { id } = useParams();
  const [reestrById, setReestrById] = useState([]);
  const [accountData, setAccountData] = useState([]);
  useEffect(() => {
    const fetchReestr = async () => {
      if (!id) return;

      try {
        const result = await fetchData(`/reestr/get/${id}`);
        setReestrById(result.data);
        onSuccess('Дані по рахунку отримані');
      } catch (error) {
        onFetchError('Виникла помилка при отриманні даних по рахунку');
      }
    };

    fetchReestr();
  }, [id]);

  const handleSave = async (updatedItem) => {
    // TODO: виклик API для збереження змін
    console.log('Зберегти:', updatedItem);
    // Після успішного збереження оновити локальний стан
    setReestrById((prev) =>
      prev.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    );
  };

  const handleDelete = async (itemToDelete) => {
    // TODO: виклик API для видалення
    console.log('Видалити:', itemToDelete);
    // Після успішного видалення оновити локальний стан
    setReestrById((prev) => prev.filter((item) => item._id !== itemToDelete._id));
  };
  console.log('accountData', accountData);
  return (
    <div>
      <Typography variant='h5'>
        Деталі рахунку {id}{' '}
        {accountData.length > 0 && (
          <>
            {accountData[0].name} — загалом: {formatMoney(accountData[0].total)} грн
          </>
        )}
      </Typography>
      <ReestrTable
        data={reestrById}
        onSave={handleSave}
        onDelete={handleDelete}
        setAccountData={setAccountData}
      />
    </div>
  );
};

export default AccountDetails;
