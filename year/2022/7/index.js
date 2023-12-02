class TreeNode {
  name;
  type;
  size;
  parent;
  children = [];

  constructor(name, type, size, parent = null) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.parent = parent;
    this.children = [];
  }

  addTreeNode(treeNode) {
    this.children.push(treeNode);
    if (treeNode.type === 'file') {
      let parent = treeNode.parent;
      while (parent) {
        parent.size += treeNode.size;
        parent = parent.parent || null;
      }
    }
    return treeNode;
  }
}

export class Day {
  constructor(input) {
    this.title = 'Day 7: No Space Left On Device';
    this.solution1 = this.calculateLowDirectorySizes(this.buildTree(input), 0);
    this.solution2 = this.calculateDeleteDirectorySize(this.buildTree(input));
  }

  buildTree(input) {
    let currentDir = new TreeNode('/', 'dir', 0);;
    let tree = currentDir;
    input.split(/\n/).forEach((l) => {
      if (l.includes('dir ') || l === '$ ls' || l === '$ cd /') {
        // Well hello there...
        // General Kenobi!
      } else if (l === '$ cd ..') {
        currentDir = currentDir.parent;
      } else if (l.includes('$ cd')) {
        const [, , dir] = l.split(' ');
        const newDir = currentDir.addTreeNode(new TreeNode(dir, 'dir', 0, currentDir));
        currentDir = newDir;
      } else {
        const [size, file] = l.split(' ');
        currentDir.addTreeNode(new TreeNode(file, 'file', parseInt(size, 10), currentDir));
      }
    });

    return tree;
  }
  
  calculateLowDirectorySizes(tree, totalSize = 0) {
    tree.children.forEach((c) => {
      if (c.type === 'dir' && c.size <= 100000) {
        totalSize += c.size;
      }
      if (c.type === 'dir') {
        totalSize += this.calculateLowDirectorySizes(c);
      }
    }); 

    return totalSize;
  }

  calculateDeleteDirectorySize(tree) {
    const freeSpace = 70000000 - tree.size;
    const needSpace = 30000000 - freeSpace;
    const deletable = [];

    function roam(trees) {
      trees.children.forEach((c) => {
        if (c.type === 'dir' && c.size >= needSpace) {
          deletable.push(c.size);
        }
        if (c.type === 'dir') {
          roam(c);
        }
      }); 
    }

    roam(tree);

    return deletable.sort((a, b) => a - b)[0];
  }
}
