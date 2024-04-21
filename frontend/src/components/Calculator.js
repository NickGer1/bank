// Импорт React и хука useState для создания компонента и управления состоянием
import React, { useState } from 'react';

// Функция для форматирования числового ввода: удаляет все нецифровые символы и применяет форматирование числа
const formatNumberInput = (value) => {
  const digits = value.replace(/[^0-9.,]+|(?<=\.\d\d)\d+|(?<=,\d\d)\d+/g, '').replace(/,/g, '.');
  return new Intl.NumberFormat('ru-RU').format(digits);
};

// Функция для преобразования отформатированного числового ввода обратно в числовое значение
const parseFormattedInput = (formattedValue) => {
  return parseInt(formattedValue.replace(/\s/g, ''), 10);
};

// Основной компонент калькулятора ипотеки
const Calculator = props => {
  // Состояния для хранения значений ввода пользователя и результатов расчетов
  const [propertyValue, setPropertyValue] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [overpayment, setOverpayment] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // Фиксированная годовая процентная ставка
  const interestRate = props.percent;

  // Обработчик изменений в полях ввода, форматирует ввод пользователя
  const handleInputChange = (setter) => (e) => {
    const formattedValue = formatNumberInput(e.target.value);
    setter(formattedValue);
  };

  // Функция для расчета ипотеки, вызывается при отправке формы
  const calculateMortgage = (e) => {
    e.preventDefault(); // Предотвращение стандартного поведения формы
    const loan = parseFormattedInput(propertyValue) - parseFormattedInput(downPayment); // Расчет суммы кредита
    const monthlyInterestRate = interestRate / 12 / 100; // Ежемесячная процентная ставка
    const numberOfPayments = loanTerm * 12; // Количество платежей (в месяцах)

    // Расчет ежемесячного платежа, общей суммы займа и переплаты
    const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthly = (loan * monthlyInterestRate * factor) / (factor - 1);
    const total = monthly * numberOfPayments;
    const overpay = total - loan;

    // Обновление состояний с результатами расчетов
    setMonthlyPayment(formatNumberInput(monthly.toFixed(2)));
    setLoanAmount(formatNumberInput(loan.toFixed(2)));
    setOverpayment(formatNumberInput(overpay.toFixed(2)));
    setTotalAmount(formatNumberInput(total.toFixed(2)));
  };

  // Рендеринг компонента
  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-semibold text-white mb-6">{props.name}</h2>
      <div className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-white mb-3">Процентная ставка: {interestRate}% годовых</p>
        <form onSubmit={calculateMortgage} className="">
          {/* Форма для ввода данных ипотеки */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="propertyValue">
              {props.nameFirstField}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="propertyValue"
              type="text"
              value={propertyValue}
              onChange={handleInputChange(setPropertyValue)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="downPayment">
              Первоначальный взнос
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="downPayment"
              type="text"
              value={downPayment}
              onChange={handleInputChange(setDownPayment)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="loanTerm">
              Срок кредита (в годах)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="loanTerm"
              type="text"
              value={loanTerm}
              onChange={handleInputChange(setLoanTerm)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-all focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Рассчитать
            </button>
          </div>
          {/* Отображение результатов расчета */}
          {monthlyPayment && (
            <div className="mt-4 text-white">
              <p>Сумма кредита: {loanAmount} ₽</p>
              <p>Ежемесячный платеж: {monthlyPayment} ₽</p>
              <p>Переплата: {overpayment} ₽</p>
              <p>Общая сумма займа: {totalAmount} ₽</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Экспорт компонента для использования в других частях приложения
export default Calculator;
