const helpers = require('./helpers');

process.on('message', (msg) => {
  helpers.sleep(2000);
  process.send(parseInt(msg.first) + parseInt(msg.second));
});



