const http = require('http');
const cluster = require('cluster');
const child_process = require('child_process');

const hostname = '127.0.0.1';
const port = 3000;
const NUM_WORKERS = 4;

function init() {
  if (cluster.isMaster) {
    for (let i = 0; i < NUM_WORKERS; i++) {
      cluster.fork({ workerId: i });
    }
  } else {
    http.Server((req, res) => {
      const forked = child_process.fork(__dirname + '/' + 'calcsum.js');
      const first = (Math.random() * 100).toFixed();
      const second = (Math.random() * 100).toFixed();
      forked.send({ first, second });
      forked.on('message', (sum) => {
        console.log(`first ${first} second ${second} sum ${sum}`);
        res.writeHead(200);
        res.end(`${sum}`);
      });

    }).listen(port, hostname, () => {
      console.log(`server running at http://${hostname}:${port}/`);
    });
  }
}

init();