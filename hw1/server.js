const http = require('http');
const helpers = require('./helpers');

const hostname = '127.0.0.1';
const port = 3000;

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function init() {
  let counter = 0;
  http.Server((req, res) => {
    helpers.sleep(2000);
    res.writeHead(200);
    res.end();
  }).listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
  });
}

module.exports.init = init;