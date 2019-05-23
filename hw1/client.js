const http = require('http');

function makeRequest(index) {
  return http.get('http://localhost:3000', resp => {
    resp.on('end', () => {
      console.log(`http call ${index}`);
    });
    resp.on('data', (data) => { if (data) { console.log(`completed by worker ${data}`) } });
  });
}
function makeRequests() {
  for (let i = 0; i < 10; i++) {
    makeRequest(i);
  }
}

makeRequests();

module.exports.makeRequests = makeRequests;