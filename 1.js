function Node(elem, left, right) {
  this.elem = elem;
  this.left = left || null;
  this.right = right || null;
}

function BST() {
  this.root = null;
}

BST.prototype.insert = function (elem) {
  const newNode = new Node(elem);
  if (!this.root) {
    this.root = newNode;
  } else {
    let cur = this.root;
    let parent;
    while (true) {
      parent = cur;
      if (elem < cur.elem) {
        cur = cur.left;
        if (cur === null) {
          parent.left = newNode;
          break;
        }
      } else {
        cur = cur.right;
        if (cur === null) {
          parent.right = newNode;
          break;
        }
      }
    }
  }
};

BST.prototype.log = function () {
  let cur = this.root;
};

BST.prototype.find = function (elem) {
  let cur = this.root;
  while (cur !== null && cur.elem !== elem) {
    if (cur.elem > elem) {
      cur = cur.left;
    } else {
      cur = cur.right;
    }
  }
  return cur;
};

const l = new BST();
l.insert(5);
l.insert(4);
l.insert(3);
l.insert(1);

console.log(l.find(2));
