const { parentPort } = require("worker_threads");
const Fibonacci = require('./fibonacci');

let runner;
// Recebo a mensagem para
parentPort.on("message", (config) => {
  console.log('Thread', config.threadId, 'iniciou a contagem', config.count);
  if(config.start){
    if(runner){
      runner.stop();
    }
    runner = new Fibonacci(config.threadId, config.count);
    runner.on('done', (message) => {
      parentPort.postMessage(message);
    });
    runner.on('stop', (message) => {
      parentPort.postMessage(message);
    }
    );

    runner.on('error', (message) => { 
      console.log('Error', message);
    });
    runner.start();
  }
});