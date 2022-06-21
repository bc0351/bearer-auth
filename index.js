'use strict';

const { server, start, sequelize } = require('./src/server');
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    server.listen(PORT, () => console.log('server listening on port:', PORT));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });

start();
