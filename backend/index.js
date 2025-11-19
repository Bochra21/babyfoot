const { connectDB, client } = require('./db/client');

(async () => {
  await connectDB();


  client.end();
})();
