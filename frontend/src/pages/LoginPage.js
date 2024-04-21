import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';
import Header from './../components/Header';

function LoginPage() {
  const { isAuthenticated, loginUser } = useAuth(); // Получаем состояние аутентификации
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Вход в систему";
    if (isAuthenticated) {
      navigate('/profile'); // Переадресация на профиль, если пользователь уже вошел
    }
  }, [isAuthenticated, navigate]);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // Состояние для хранения сообщения об ошибке

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');  // Очистка предыдущих ошибок при новой попытке отправки

    const response = await fetch('http://localhost:5010/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();
    if (response.ok) {
      loginUser(data.token);  // Вызываем функцию loginUser для обновления состояния аутентификации
      navigate('/profile'); // Используем navigate для перенаправления
    } else {
      setError(data.message || 'Ошибка при входе');  // Установка сообщения об ошибке
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex grow items-center justify-center bg-gray-800">
        <form className="p-8 bg-gray-700 shadow-md rounded w-96" onSubmit={handleSubmit}>
          <h2 className="text-white text-xl font-bold mb-6 text-center">Вход в систему для администраторов</h2>
          <div className="mb-4">
            <label htmlFor="login" className="block text-white text-sm font-bold mb-2">Логин:</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Войти
            </button>
          </div>
          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
