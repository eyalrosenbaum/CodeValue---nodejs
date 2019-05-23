const http = require('http');
const cluster = require('cluster');
const helpers = require('./helpers')
const hostname = '127.0.0.1';
const port = 3000;
const NUM_WORKERS = 4;

function init() {
  cluster.on("exit", (worker, code, signal) => console.log(`worker: ${worker} code: ${code} signal: ${signal}`));
  cluster.on("disconnect", (worker) => console.log(`worker ${worker} has disconnected`));
  if (cluster.isMaster) {
    // const numCPUs = require('os').cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) {
      cluster.fork({ workerId: i });
      // for (let i = 0; i < NUM_WORKERS; i++) {
      // cluster.fork({ workerId: i })
    }
  } else {
    http.Server((req, res) => {
      helpers.sleep(2000);
      res.writeHead(200);
      res.end(process.env["workerId"]);
    }).listen(port, hostname, () => {
      console.log(`server running at http://${hostname}:${port}/`);
    });
  }
}

init();