// Binary  Search Tree Implementation
// Left Child Node is always - Lesser in Value than the Root Node
// Right Child Node is always - Greater in value than the Root Node

/*

// We can try assigning different values to the Tree and check the Output in Online Editor - https://playcode.io/
// https://playcode.io/   - Online JavaScript Playgroung 


=========================

Time Complexity - O(h) - h- Height of the  Tree -> so O(n) (For both Balanced and Un-balanced Tree -you have to visit the Nodes atleast once)
Space Complexity :
  Worst Case - Left / Right Skewed Tree - O(n)
  Average Case - Balanced Tree - Height - Log(n) - so complexity -> O(log n)

*/


class Node { //Node Class 

  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
    
  };
};



class BST { // Binary  Search Tree Class

  constructor() {
    this.root = null;
  }


  create(val) { // Function to create a New Node

    const newNode = new Node(val); // Creates a new Node

    if (!this.root) { // If the Root Node is null - assign the New Node as Root Node of BST
      this.root = newNode;
      return this;
    };


    let current = this.root; // Root node - assigned as Current Node


    const addSide =(side) =>{ //Function to add a Side node to the Current Node

      if (!current[side]) { // If a current node is not available on the passed Side - assign the New Node to the side passed 
        current[side] = newNode;
        return this;
      };
      current = current[side]; // If a current side is already present - assign it as the Current node
    };  



    while (true) {
      if (val === current.val) { // If the New passed in value is already present in the Tree, return without adding it to the Tree - avoid duplicate
         return this;
      };
      if (val < current.val) addSide('left'); // If the New value - less than the current node - store it in Left child node
      else addSide('right'); // If the New value - greater than the Current node- store it in Right Child Node
    };
  };

  // Function - returns root of the tree 
  getRootNode() 
  { 
      return this.root; 
  } 

  //Inorder Traversal of the BST and prints the Node value to the Console
  // Left -> Root -> Right
  inOrder(node){ 

    if(node !== null) 
    { 
        this.inOrder(node.left); //Recursively call the Function until the Left Node is Null
        console.log(node.val);  // Prints the value of the Root node 
        this.inOrder(node.right); //Recursively call the Function until the Right Node is Null
    } 
  };

 

};



let tree = new BST(); // Create a New Binary Search Tree

tree.create(10); // Root Node (10)
tree.create(4); // Pass a value to the Tree - a new Node  shall be created after comparing with the Root Node (10)
tree.create(4); // 
tree.create(12);
tree.create(2);
tree.create(20);
tree.create(1);

console.log(tree);

// Gets the Root Node of the Current Tree
var root = tree.getRootNode(); 

// Inorder Traversal of the Root Node
tree.inOrder(root);