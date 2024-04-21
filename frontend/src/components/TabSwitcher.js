import React, { useState, useEffect } from 'react';
import Calculator from './Calculator';

function TabSwitcher() {
  // Состояние для отслеживания активного таба
  const [activeTab, setActiveTab] = useState(0);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    // Получение данных о кредитах
    fetch('http://localhost:5010/api/credits')
      .then(response => response.json()) // Преобразование ответа в JSON
      .then(data => setCredits(data)) // Обновление состояния данных о кредитах
      .catch(error => console.error('Error:', error)); // Обработка ошибок
  }, []); // Пустой массив зависимостей гарантирует, что эффект выполняется только при монтировании компонента

  // Создаем массив кнопок для каждого таба, используя данные из tabComponents
  const tabs = credits.map((credit, index) => (
    <button
      key={credit._id}
      className={`py-2 px-4 text-sm font-medium text-center rounded-t-lg flex-grow
                 ${activeTab === index ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'bg-transparent hover:bg-gray-700'}`}
      onClick={() => setActiveTab(index)}
    >
      {credit.nameTab}
    </button>
  ));

  return (
    <div className="w-128">
      <div className="flex flex-wrap border-b border-gray-700">
        {tabs}
      </div>
      <div className="p-4 text-gray-200 mt-5">
        <Calculator name={credits[activeTab]?.name} percent={credits[activeTab]?.percent} nameFirstField={credits[activeTab]?.nameFirstField} />
      </div>
    </div>
  );
}

export default TabSwitcher;
