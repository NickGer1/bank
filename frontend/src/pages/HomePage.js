import React, { useEffect } from 'react';
import Header from './../components/Header';
import TabSwitcher from './../components/TabSwitcher';

function HomePage() {
  useEffect(() => { document.title = "Лотус банк - онлайн калькулятор" }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex grow justify-center items-center bg-gray-800 text-white">
        <TabSwitcher />
      </div>
    </div>
  );
}

export default HomePage;
