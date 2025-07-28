const jwt = require('jsonwebtoken'); // Для роботи з токенами
const { Users } = require('../models');
const { ValidationError } = require('../helpers/errors');

// Мідлвеєр для перевірки прав доступу
const checkPermission = async (req, res, next) => {
  // Переконайтеся, що SECRET_KEY доступний
  const { SECRET_KEY } = process.env;
  if (!SECRET_KEY) {
    return res.status(500).json({ message: 'SECRET_KEY не знайдений' });
  }

  try {
    // Витягування токену з заголовка запиту
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ValidationError('Bad request, токен не знайдений');
    }

    // Декодування токену і перевірка користувача
    const decoded = jwt.verify(token, SECRET_KEY); // Використовуйте ваш секретний ключ для верифікації
    const user = await Users.findOne({ _id: decoded.id });
    if (!user) {
      throw new ValidationError('Користувача не знайдено');
    }

    // Перевірка ролі користувача
    if (user.role !== 'admin') {
      throw new ValidationError('Ви не маєте розрішення на проведення зміни');
    }

    // Якщо все в порядку, переходимо до наступного middleware
    next();
  } catch (error) {
    // Обробка помилок
    res.status(403).json({ message: error.message });
  }
};

module.exports = { checkPermission };
