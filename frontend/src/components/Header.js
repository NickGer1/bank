import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Убедитесь в правильности пути

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white flex justify-between items-center p-3">
      <Link to="/" className="logo">
        <h1 className="text-base font-bold sm:text-lg">Лотус Банк</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="mr-2 inline-flex bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition duration-300 sm:text-base sm:mr-4">
              Личный кабинет
            </Link>
            <button onClick={logout} className="inline-flex bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded transition duration-300 sm:text-base">
              Выйти
            </button>
          </>
        ) : (
          <Link to="/login" className="inline-flex bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded transition duration-300 sm:text-base">
            Вход в админ панель
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
