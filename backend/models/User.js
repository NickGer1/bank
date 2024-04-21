const mongoose = require('mongoose');

// Создаем новую схему пользователя
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Обрезает пробелы по краям
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now // Значение по умолчанию - текущая дата и время
  }
});

// Создаем модель на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User;