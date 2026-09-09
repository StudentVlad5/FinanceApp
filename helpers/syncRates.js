const axios = require('axios');
const moment = require('moment');
const ExchangeRate = require('../models/exchangeRate');

const currencyMap = { USD: '840', EUR: '978' };

// 1. Функція розумної синхронізації (перевірка за період)
async function syncRates(daysToLookBack = 14) {
  console.log(`Перевірка курсів за останні ${daysToLookBack} днів...`);

  for (let i = 0; i <= daysToLookBack; i++) {
    const targetDate = moment().subtract(i, 'days');
    const dateUrl = targetDate.format('YYYYMMDD');
    const dateDb = targetDate.format('YYYY-MM-DD');

    for (const [valcode, code] of Object.entries(currencyMap)) {
      // Перевіряємо, чи вже є курс у нашій базі
      const exists = await ExchangeRate.findOne({
        date: dateDb,
        currency_code: code,
      });

      if (!exists) {
        let success = false;
        let attempts = 0;

        // Пробуємо отримати з НБУ
        while (!success && attempts < 2) {
          try {
            const res = await axios.get(
              `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${valcode}&date=${dateUrl}&json`,
              {
                timeout: 10000,
                headers: {
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  Accept: 'application/json',
                },
              },
            );
            if (res.data && res.data[0]) {
              await ExchangeRate.create({
                date: dateDb,
                currency_code: code,
                valcode: valcode,
                rate: res.data[0].rate,
              });
              console.log(`Додано курс: ${valcode} за ${dateDb}`);
              success = true;
            } else {
              attempts++;
            }
          } catch (e) {
            console.error(
              `Помилка запиту (${valcode} / ${dateDb}):`,
              e.response?.status || e.message,
            );
            attempts++;
          }
        }

        // Якщо НБУ не відповів після спроб — беремо попередній відомий день
        if (!success) {
          const lastKnown = await ExchangeRate.findOne({
            currency_code: code,
            date: { $lt: dateDb },
          }).sort({ date: -1 });

          if (lastKnown) {
            await ExchangeRate.create({
              date: dateDb,
              currency_code: code,
              valcode: valcode,
              rate: lastKnown.rate,
            });
            console.log(
              ` Взято попередній курс для ${valcode} за ${dateDb} (з ${lastKnown.date})`,
            );
          }
        }
      }
    }
  }
  console.log('Синхронізація завершена.');
}
module.exports = { syncRates };
