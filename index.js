'use strict';

const { server, start } = require('./src/server');
const { db } = require('./src/auth/models/index');
const PORT = process.env.PORT || 3001;

db.sync()
  .then(() => {
    server.listen(PORT, () => console.log('Server listening on port:', PORT));
  }).catch(e => {
    console.error('ERROR:',e.message);
  });

start();
