const MaxHeap = require("./max-heap.js");

class PriorityQueue {
  constructor(maxSize) {
    this.maxSize = maxSize ? maxSize : 30;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.heap.size() >= this.maxSize) {
      throw new Error("Queue size");
    }
    this.heap.push(data, priority);
  }

  shift() {
    if (this.heap.isEmpty()) {
      throw new Error("Empty");
    }
    const node = this.heap.pop();

    return node;
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
