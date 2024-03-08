const EventEmitter = require('events');

module.exports = class Fibonacci extends EventEmitter {
  constructor(threadId, count) {
    super();
    this.threadId = threadId;
    this.count = count;
    this.run = true;

  }

  start = () => {
    while (this.run) {
      let now = new Date().getTime();
      this.fibonacci(this.count);
      console.log("Thread", this.threadId, "terminou o calculo");
      this.emit('done', { threadId: this.threadId, count: this.count, time: new Date().getTime() - now});
    }
  }

  stop = () => {
    this.run = false;
    this.emit('stop', { threadId: this.threadId, count: this.count });
  }


  fibonacci(n) {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}