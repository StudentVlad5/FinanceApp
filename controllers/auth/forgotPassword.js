const { ValidationError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');
const nodemailer = require('nodemailer');
const { Users } = require('../../models');
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
} = require('../../helpers');

const forgotPassword = async (req, res, next) => {
  try {
    // 1. Отримуємо email з тіла запиту
    const { email } = dataFilter(req.body, userFieldReceivedFromFront);

    if (!email) {
      throw new ValidationError('Email обовʼязковий');
    }

    // 2. Шукаємо користувача
    const user = await Users.findOne({ email });
    if (!user) {
      throw new ValidationError('Користувача з таким email не знайдено');
    }

    // 3. Генеруємо новий пароль і хешуємо
    const newPassword = nanoid(10);
    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

    // 4. Оновлюємо пароль
    await Users.updateOne({ email }, { $set: { password: hashedPassword } });

    // 5. Готуємо email
    const transporter = nodemailer.createTransport({
      host: 'smtp.ukr.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Finance Service Support <${process.env.EMAIL_SEND}>`,
      to: email,
      subject: 'Зміна паролю',
      html: `
        <h1>Вітаємо!</h1>
        <p>Ваш новий пароль: <strong>${newPassword}</strong></p>
        <p>Будь ласка, увійдіть у свій акаунт і змініть пароль через розділ "Змінити пароль".</p>
        <p>Дякуємо, що ви з нами!<br>З повагою, Служба підтримки Finance App</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 6. Відповідь
    const response = dataFilter(user.toObject(), userMainField);
    return res
      .status(200)
      .json({ message: 'Пароль надіслано на пошту', user: response });
  } catch (err) {
    console.error('Forgot password error:', err);
    next(new ValidationError(err.message));
  }
};

module.exports = forgotPassword;
