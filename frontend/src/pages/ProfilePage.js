import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { ReactComponent as EditIcon } from './../assets/icons/pencil.svg';
import { ReactComponent as CloseIcon } from './../assets/icons/close.svg';
import { ReactComponent as AddIcon } from './../assets/icons/plus.svg';
import { ReactComponent as SaveIcon } from './../assets/icons/bookmark.svg';

function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [credits, setCredits] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Получение доступных кредитов
  useEffect(() => {
    document.title = "Редактирование калькуляторов";
    if (!isAuthenticated) {
      navigate('/login');
    }

    fetch('http://localhost:5010/api/credits')
      .then(response => response.json())
      .then(data => setCredits(data))
      .catch(error => console.error('Error:', error));
  }, [isAuthenticated, navigate]);

  // Редактирование кредита
  const handleEdit = (index) => {
    if (index === editIndex) {
      setEditIndex(null);
      return;
    }
    setEditIndex(index);
  };

  // Удаление кредита
  const handleDelete = (id) => {
    fetch(`http://localhost:5010/api/credits/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          // Если сервер возвращает статус не 'OK', бросаем ошибку
          throw new Error('Не удалось удалить кредит');
        }
        // Если сервер подтвердил успешное удаление, обновляем состояние на клиенте
        setCredits(credits.filter(credit => credit._id !== id));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Сохранение редактируемых данных
  const handleSave = (index) => {
    const credit = credits[index];
    const url = credit._id ? `http://localhost:5010/api/credits/${credit._id}` : 'http://localhost:5010/api/credits';
    const method = credit._id ? 'PUT' : 'POST';

    console.log('url = ' + url);
    console.log('method = ' + method);

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credit),
    })
      .then(response => response.json())
      .then(data => {
        if (method === 'POST') {
          setCredits([...credits.slice(0, index), data, ...credits.slice(index + 1)]);
        } else {
          setCredits(credits.map((item, i) => i === index ? data : item));
        }
        setEditIndex(null); // Выход из режима редактирования
      })
      .catch(error => {
        console.error('Failed to save the credit:', error);
      });
  };

  // Добавление кредита
  const handleAddCredit = () => {
    const newCredit = { name: "", nameTab: "", percent: "", nameFirstField: "" };
    setCredits([...credits, newCredit]);
    setEditIndex(credits.length);
  };
  return (
    <div className="h-screen flex flex-col bg-gray-800 text-white">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Редактирование калькуляторов</h1>
          <div className="flex flex-col text-sm font-bold mb-2 mr-0 sm:mr-28 sm:block">
            <span className="w-full sm:w-1/4 inline-block pl-4">Название кредита</span>
            <span className="sm:w-1/4 inline-block pl-4">Название во вкладке</span>
            <span className="sm:w-1/4 inline-block pl-4">Проценты</span>
            <span className="sm:w-1/4 inline-block pl-4">Название первого поля</span>
          </div>
          <div className="space-y-4">
            {credits.map((credit, index) => (
              <div key={index} className="flex flex-col items-center justify-between bg-gray-700 p-2 rounded sm:flex-row">
                {editIndex === index ? (
                  <>
                    <input type="text" value={credit.name} className="w-full flex-1 mx-2 p-1 bg-gray-800 border border-gray-600 rounded" required onChange={(e) => {
                      const updatedCredits = [...credits];
                      updatedCredits[index].name = e.target.value;
                      setCredits(updatedCredits);
                    }} />
                    <input type="text" value={credit.nameTab} className="w-full flex-1 mx-2 p-1 bg-gray-800 border border-gray-600 rounded" required onChange={(e) => {
                      const updatedCredits = [...credits];
                      updatedCredits[index].nameTab = e.target.value;
                      setCredits(updatedCredits);
                    }} />
                    <input type="number" value={credit.percent} className="w-full flex-1 mx-2 p-1 bg-gray-800 border border-gray-600 rounded" required onChange={(e) => {
                      const updatedCredits = [...credits];
                      updatedCredits[index].percent = parseFloat(e.target.value);
                      setCredits(updatedCredits);
                    }} />
                    <input type="text" value={credit.nameFirstField} className="w-full flex-1 mx-2 p-1 bg-gray-800 border border-gray-600 rounded" onChange={(e) => {
                      const updatedCredits = [...credits];
                      updatedCredits[index].nameFirstField = e.target.value;
                      setCredits(updatedCredits);
                    }} />
                    <button onClick={() => handleSave(index)} className="p-3 bg-blue-500 hover:bg-blue-700 rounded-full transition duration-300">
                      <SaveIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 mx-2 p-1">{credit.name}</div>
                    <div className="flex-1 mx-2 p-1">{credit.nameTab}</div>
                    <div className="flex-1 mx-2 p-1">{credit.percent}%</div>
                    <div className="flex-1 mx-2 p-1">{credit.nameFirstField}</div>
                  </>
                )}
                {editIndex === null && (
                  <button onClick={() => handleEdit(index)} className="p-3 bg-yellow-500 hover:bg-yellow-700 rounded-full transition duration-300">
                    <EditIcon />
                  </button>
                )}
                {editIndex === null && (
                  <button onClick={() => handleDelete(credit._id)} className="ml-2 p-3 bg-red-500 hover:bg-red-700 rounded-full transition duration-300">
                    <CloseIcon />
                  </button>
                )}
              </div>
            ))}
            {editIndex === null && (
              <button onClick={handleAddCredit} className="flex align-center w-full justify-center sm:w-auto text-center flex ml-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-300">
                Добавить новый кредит <AddIcon className="ml-2 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
