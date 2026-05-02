const { Schema, model } = require('mongoose');

const exchangeRateSchema = new Schema({
  date: { type: String, required: true }, // Формат YYYY-MM-DD
  currency_code: { type: String, required: true }, // "840" або "978"
  valcode: { type: String, required: true }, // "USD" або "EUR"
  rate: { type: Number, required: true },
});

// Індекс для швидкого пошуку та запобігання дублікатів
exchangeRateSchema.index({ date: 1, currency_code: 1 }, { unique: true });

const ExchangeRate = model('ExchangeRate', exchangeRateSchema);
module.exports = ExchangeRate;
