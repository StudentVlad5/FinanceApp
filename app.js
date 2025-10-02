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

app.use((req, res) => {
  console.log('!!!!! START APP (req, res) !!!!!!');
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: 'ERRR JSONS' });
});

app.use(errorHandler);

module.exports = app;
