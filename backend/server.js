const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

// Routes
const creditsRouter = require('./routes/credits');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json()); // Это позволяет приложению читать JSON из тела запроса
app.use(cors());         // Это позволит доступ к вашему API со всех доменов

mongoose.connect(config.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api/credits', creditsRouter);
app.use('/api/login', usersRouter);

app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});