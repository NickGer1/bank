const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const bcrypt = require('bcryptjs');   // кэширование паролецй
const jwt = require('jsonwebtoken');  // работа с токенами авторизации
const config = require('./../config');

router.post('/', async (req, res) => {
  try {
    // Поиск пользователя по имени пользователя
    const user = await User.findOne({ login: req.body.login });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    // Пользователь найден и пароль верный, создаем JWT
    const token = jwt.sign(
      { userId: user._id },
      config.JWT_SECRET,
      { expiresIn: '1000h' } // Токен истекает через 1000 часов
    );

    // Отправляем клиенту токен
    res.json({ token, userId: user._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при попытке входа в систему' });
  }
});


module.exports = router;