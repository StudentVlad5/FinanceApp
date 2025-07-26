const { ValidationError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { Users } = require('../../models');
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
} = require('../../helpers');

const changePassword = async (req, res, next) => {
  try {
    const { email, password } = dataFilter(
      req.body,
      userFieldReceivedFromFront,
    );

    if (!email || !password) {
      throw new ValidationError('Необхідно вказати email і новий пароль');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { returnDocument: 'after' },
    );

    if (!user) {
      throw new ValidationError('Користувача з таким email не знайдено');
    }

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
        <h1>Вітаю!</h1>
        <p>Ваш пароль успішно змінено для акаунту у FinanceApp.</p>
        <p>Не забудьте оновити його у своїх менеджерах паролів.</p>
        <p>З повагою,<br>Служба Підтримки Finance App</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    const response = dataFilter(user.toObject(), userMainField);

    return res.status(200).json({
      message: 'Пароль успішно змінено',
      user: response,
    });
  } catch (err) {
    console.error('Change password error:', err);
    next(new ValidationError(err.message));
  }
};

module.exports = changePassword;
