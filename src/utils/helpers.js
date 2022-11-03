class TrieNode {
  constructor(char, id) {
    this.children = [];
    this.ids = [id];
    for (let i = 0; i < 26; i++) {
      this.children[i] = null;
    }
    this.isEndWord = false;
    this.char = char;
  }

  addId(id) {
    this.ids = [...this.ids, id];
  }

  markAsLeaf() {
    this.isEndWord = true;
  }

  unMarkAsLeaf() {
    this.isEndWord = false;
  }

  isLeaf() {
    return this.isEndWord;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  getIndex(t) {
    return t.charCodeAt(0) - "a".charCodeAt(0);
  }

  insert(key, id) {
    if (key === "" || key === null) {
      return;
    }

    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;

    for (let level = 0; level < key.length; level++) {
      index = this.getIndex(key[level]);

      if (currentNode.children[index] == null) {
        currentNode.children[index] = new TrieNode(key[level], id);
      } else {
        currentNode.children[index].addId(id);
      }
      currentNode = currentNode.children[index];
    }

    currentNode.markAsLeaf();
  }

  search(key, partial = false) {
    if (key === "" || key === null) {
      return [];
    }

    key = key.toLowerCase();
    let currentNode = this.root;
    let index = 0;

    for (let level = 0; level < key.length; level++) {
      index = this.getIndex(key[level]);

      if (currentNode.children[index] == null) {
        return [];
      }

      currentNode = currentNode.children[index];
    }

    if (!partial && !currentNode.isLeaf()) {
      return [];
    }

    return currentNode.ids ? currentNode.ids : [];
  }
}

export const sendRes = (data) => ({
  total: data.length,
  data,
});
