const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {}

  detachRoot() {}

  restoreRootFromLastInsertedNode(detached) {}

  size() {}

  isEmpty() {}

  clear() {}

  insertNode(node) {
    if (!this.root) {
      this.root = node;
      this.parentNodes.push(node);
      return;
    }
    if (!this.parentNodes[0].left || !this.parentNodes[0].right) {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
    }
    if (this.parentNodes[0].left && this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
  }

  shiftNodeUp(node) {
    node.swapWithParent();
    while (node.parent !== null) {
      this.shiftNodeUp(node);
    }
    this.root = node;
  }

  shiftNodeDown(node) {}
}

module.exports = MaxHeap;
