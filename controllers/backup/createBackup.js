const mongoose = require('mongoose');
const AdmZip = require('adm-zip');

const createBackup = async (req, res) => {
  try {
    // Перевірка підключення до БД
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({
        message: 'Помилка: База даних не підключена',
      });
    }

    const zip = new AdmZip();
    const collections = await db.listCollections().toArray();

    // Проходимо по всіх колекціях
    for (const collection of collections) {
      const name = collection.name;

      // Ігноруємо системні колекції, якщо вони є (опціонально)
      if (name.startsWith('system.')) continue;

      const data = await db.collection(name).find({}).toArray();

      // Перетворюємо дані в JSON рядок
      const jsonContent = JSON.stringify(data, null, 2);

      // Додаємо файл до архіву: назва_колекції.json
      zip.addFile(`${name}.json`, Buffer.from(jsonContent, 'utf8'));
    }

    // Формуємо ім'я файлу з поточною датою
    const date = new Date().toISOString().split('T')[0];
    const fileName = `backup_${date}.zip`;

    const zipBuffer = zip.toBuffer();

    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': zipBuffer.length,
    });

    res.end(zipBuffer);

    // Встановлюємо заголовки для браузера
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': zipBuffer.length,
      // Дозволяємо фронтенду бачити заголовок Content-Disposition, якщо потрібно
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    // Відправляємо файл
    res.send(zipBuffer);
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).json({
      message: 'Помилка при створенні архіву',
      error: error.message,
    });
  }
};

module.exports = createBackup;
