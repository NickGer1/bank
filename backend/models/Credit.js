const mongoose = require('mongoose');

const settings = {
  name: String,
  nameTab: String,
  percent: {
    type: Number,
    default: 0,
  },
  nameFirstField: {
    type: String,
    default: 'Необходимая сумма',
  },
};

const creditSchema = new mongoose.Schema(settings);

// Pre-save hook
creditSchema.pre('save', function (next) {
  if (this.percent === null) {
    this.percent = settings.percent.default;
  }
  if (this.nameFirstField === '') {
    this.nameFirstField = settings.nameFirstField.default;
  }
  next();
});

const Credit = mongoose.model('Credit', creditSchema);

module.exports = Credit;