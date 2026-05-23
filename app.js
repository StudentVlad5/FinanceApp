const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./helpers');
const {
  routerAuth,
  routerAccouns,
  routerCurrency,
  routerGroup,
  routerTypes,
  routerReestr,
  routerContragents,
  routerTags,
  routerCategories,
  routerBackup,
} = require('./routes');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(`${__dirname}/images`));
app.use('/uploads', express.static(`${__dirname}/images/events`));
app.use('/uploads', express.static(`${__dirname}/images/avatars`));

app.use('/api/auth', routerAuth);
app.use('/api/accounts', routerAccouns);
app.use('/api/currency', routerCurrency);
app.use('/api/group', routerGroup);
app.use('/api/types', routerTypes);
app.use('/api/reestr', routerReestr);
app.use('/api/reports', routerReports);
app.use('/api/contragent', routerContragents);
app.use('/api/tags', routerTags);
app.use('/api/category', routerCategories);
app.use('/api/backup', routerBackup);

app.get('/api/cron/sync-rates', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Запуск синхронізації через Vercel Cron...');

    await repairMissingRates();
    await syncRates(7);

    return res
      .status(200)
      .json({ success: true, message: 'Rates synced successfully' });
  } catch (error) {
    console.error('Помилка синхронізації:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.use((req, res) => {
  console.log('!!!!! START APP (req, res) !!!!!!');
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: 'ERRR JSONS' });
});

app.use(errorHandler);

module.exports = app;
