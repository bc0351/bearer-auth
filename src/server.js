'use script';

const logger = require('./middleware/logger');
const authRouter = require('./routes/auth');
const { sequelize } = require('./models/index');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

module.exports = {
  server: app,
  sequelize,
  start: () => app.listen(PORT, console.log('listening on port:', PORT))
}
