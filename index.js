const readlineInterface = require('node:readline')

const readline = readlineInterface.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let threads = [];
let threadsLog = [];

readline.question(`Quantas Treads?  `, number => {
  console.log(`Programa vai rodar com ${number} treads`);
  if (parseInt(number) > 0) {
    startThreads(parseInt(number));
  }
  readline.close();
});

function startThreads(number) {
  const { Worker } = require('worker_threads');
  threads = [];
  for (let i = 0; i < number; i++) {
    let worker = new Worker('./worker.js', { workerData: { threadId: i } });
    worker.postMessage({ start: true, threadId: i, count: 40 });
    threads.push(worker);
  }
  threads.forEach(worker => {
    worker.on('message', (message) => {
      // console.log('Thread:', message.threadId, 'terminou em', message.time, 'ms');
      let thr = threadsLog.find((thr) => thr.threadId === message.threadId);
      if (thr) {
        thr.time = message.time;
      } else {
        threadsLog.push({ threadId: message.threadId, time: message.time });
      }
    });
  });
  setInterval(showLog, 1000);
}

function showLog() {
  console.clear();
  console.table(threadsLog);
}