const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this._length = 0;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);

    this._length++;
  }

  pop() {
    if (this.isEmpty()) return;
    const oldRoot = this.detachRoot();

    this.restoreRootFromLastInsertedNode(oldRoot);

    this.shiftNodeDown(this.root);

    return oldRoot.data;
  }

  detachRoot() {
    const curRoot = this.root;
    if (this.parentNodes.indexOf(this.root) != -1) {
      this.parentNodes.shift();
    }
    this.root = null;
    this._length--;
    return curRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.isEmpty()) return;
    const lastInsertedNode = this.parentNodes.pop();
    if (lastInsertedNode) {
      const lastNodeParent = lastInsertedNode.parent;
      this.root = lastInsertedNode;
      if (lastNodeParent) {
        lastInsertedNode.remove();
        if (!lastNodeParent.right && lastNodeParent.left && lastNodeParent !== detached) {
          this.parentNodes.unshift(lastNodeParent);
        }
      }
      if (detached.left && detached.left !== lastInsertedNode) {
        this.root.appendChild(detached.left);
      }
      if (detached.right && detached.right !== lastInsertedNode) {
        this.root.appendChild(detached.right);
        return;
      }

      this.parentNodes.unshift(lastInsertedNode);
    }
  }

  size() {
    return this._length;
  }

  isEmpty() {
    return this._length === 0;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this._length = 0;
  }

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
    const tempNode = node.parent;
    if (tempNode && node.priority > tempNode.priority) {
      if (tempNode === this.root) {
        this.root = node;
      }
      const tempIndex = this.parentNodes.indexOf(tempNode);
      const curIndex = this.parentNodes.indexOf(node);
      if (tempIndex === -1) {
        this.parentNodes[curIndex] = tempNode;
      } else {
        this.parentNodes[tempIndex] = node;
        this.parentNodes[curIndex] = tempNode;
      }
      node.swapWithParent();
      this.shiftNodeUp(node);
    }
  }

  shiftNodeDown(node) {
    if (node === null || node.left === null) {
      return;
    }
    let nodeToShift = null;
    if (node.left) {
      nodeToShift = node.left;
      if (node.right && node.right.priority > node.left.priority) {
        nodeToShift = node.right;
      }
    }
    if (nodeToShift && nodeToShift.priority > node.priority) {
      nodeToShift.swapWithParent();
      const nodeToShiftIndex = this.parentNodes.indexOf(nodeToShift);
      const nodeIndex = this.parentNodes.indexOf(node);
      if (nodeToShiftIndex !== -1) {
        this.parentNodes[nodeToShiftIndex] = node;
        this.parentNodes[nodeIndex] = nodeToShift;
      } else if (!node.left || !node.right) {
        this.parentNodes.unshift(node);
      }
      if (!node.parent.parent) {
        this.root = node.parent;
      }
      this.shiftNodeDown(node);
    }
  }
}

module.exports = MaxHeap;
