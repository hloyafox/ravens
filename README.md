## Установка

### На сервере:

Версия npm 8.11.0
Версия node js v19.6.0

файл config.js для работы сервера и подключения к бд

### После клонирования на сервер

npm install в корне проекта
npm install в папке client

В папке client
npm install react-router-dom
npm install react-bootstrap bootstrap

В корне
npm install express
npm install --save sequelize
npm install mysql2
npm install --save-dev sequelize-cli

Выполнить из корня
npx sequelize-cli init
npx sequelize-cli db:migrate

npm run build

добавить пользователя admin с бу