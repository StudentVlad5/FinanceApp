const axios = require('axios');
const moment = require('moment');
const ExchangeRate = require('../models/exchangeRate');

async function repairMissingRates() {
  const currencies = ['840', '978'];
  let startDate = moment().subtract(14, 'days');
  const endDate = moment();

  console.log('Починаємо перевірку та ремонт дірок у базі...');

  while (startDate.isBefore(endDate)) {
    const dateDb = startDate.format('YYYY-MM-DD');

    for (const code of currencies) {
      const exists = await ExchangeRate.findOne({
        date: dateDb,
        currency_code: code,
      });

      if (!exists) {
        // Шукаємо найближчий попередній курс
        const prevRate = await ExchangeRate.findOne({
          currency_code: code,
          date: { $lt: dateDb },
        }).sort({ date: -1 });

        if (prevRate) {
          await ExchangeRate.create({
            date: dateDb,
            currency_code: code,
            valcode: prevRate.valcode,
            rate: prevRate.rate,
          });
          console.log(
            `Заповнено пропуск: ${code} за ${dateDb} (взято з ${prevRate.date})`,
          );
        }
      }
    }
    startDate.add(1, 'days');
  }
  console.log('Ремонт завершено!');
}

module.exports = { repairMissingRates };
