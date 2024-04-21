const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Credit = require('../models/Credit');

// Получение всех доступных кредитов
router.get('/', async (req, res) => {
  try {
    const credits = await Credit.find();
    res.json(credits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Создание нового кредита
router.post('/', async (req, res) => {
  const credit = new Credit({
    name: req.body.name,
    nameTab: req.body.nameTab,
    percent: req.body.percent,
    nameFirstField: req.body.nameFirstField,
  });

  try {
    const newCredit = await credit.save();
    res.status(201).json(newCredit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Редактирование кредита по ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('Неверный ID кредита.');
  }

  try {
    const credit = await Credit.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!credit) {
      return res.status(404).json('Кредит с указанным ID не найден.');
    }

    res.status(200).json(credit);
  } catch (error) {
    res.status(500).json('Ошибка при редактировании кредита: ' + error.message);
  }
});

// Удаление кредита по id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json('Неверный ID кредита.');
  }

  try {
    const credit = await Credit.findByIdAndDelete(id);

    if (!credit) {
      return res.status(404).json('Кредит не найден.');
    }

    res.status(204).json(`Кредит с ID ${id} успешно удален.`);
  } catch (error) {
    res.status(500).json('Ошибка при удалении кредита: ' + error);
  }
});

module.exports = router;