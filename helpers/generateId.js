const Counter = require('../models/counter');

async function generateId(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  // якщо тільки-но створено — стартуємо з 10000
  if (counter.seq === 1) {
    counter.seq = 10000;
    await counter.save();
  }

  return counter.seq;
}

module.exports = generateId;
