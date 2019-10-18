class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      node.parent = this;
      this.left = node;
    } else if (!this.right) {
      node.parent = this;
      this.right = node;
    }
  }

  removeChild(node) {
    if (this.left && this.left === node) {
      this.left = null;
      node.parent = null;
    } else if (this.right && this.right === node) {
      this.right = null;
      node.parent = null;
    } else {
      throw new Error();
    }
  }

  remove() {
    if (!this.parent) {
      return;
    }
    this.parent.removeChild(this);
  }

  swapWithParent() {
    if (!this.parent) {
      return;
    }
    const curParent = this.parent;
    const parentLeft = curParent.left;
    const parentRight = curParent.right;
    const childLeft = this.left;
    const childRight = this.right;
    this.left = null;
    this.right = null;
    curParent.left = null;
    curParent.right = null;
    this.parent = curParent.parent;
    if (this.parent && this.parent.left === curParent) {
      this.parent.left = this;
    } else if (this.parent && this.parent.right === curParent) {
      this.parent.right = this;
    }
    this.appendChild(curParent);
    if (parentLeft && parentLeft !== this) {
      this.appendChild(parentLeft);
    }
    if (parentRight && parentRight !== this) {
      this.appendChild(parentRight);
    }
    if (childLeft) {
      curParent.appendChild(childLeft);
    }
    if (childRight) {
      curParent.appendChild(childRight);
    }
  }
}

module.exports = Node;
