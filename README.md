Проект доступен для просмотра на удаленном сервере по ссылке: https://calc.adnokulovnikita.online/

API работает по ссылке: https://calc.adnokulovnikita.online/api/

Пример GET запроса к API на получение всех доступных калькуляторов: https://calc.adnokulovnikita.online/api/credits/


Доступ в личный кабинет администратора банка:

Логин: admin

Пароль: admin


Инструкция для запуска проекта локально

=====[ Импорт базы данных ]=====
1. Запустить mongo DB
2. Создать таблицу с названием calc
3. Создать столбец с названием users и импортировать данные из ./backend/database/calc.users.json
4. Создать столбец с названием credits и импортировать данные из ./backend/database/calc.credits.json

=====[ Запуск API (backend часть | строго после импорта бд) ]=====
1. cd backend
2. npm install
3. npm run start (запуститься на 5010 порту)


=====[ Запуск клиентской части (frontend часть) ]=====
1. cd frontend
2. npm install
3. npm run start (запуститься на 3000 порту)


=====[ Доступы от аккаунта админа (при наличии импорта бд) ]=====
Логин: admin
Пароль: admin
