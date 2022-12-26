// GRAPH IMPLEMENTATION APPROACHES

/* 
VISUALIZATION

     2 ------- 0
   /  \
  /    \
1 ----- 3 

*/

// 1st approach - Edge list
// the elements of the array represent connections between graph nodes
const graph = [
  [0, 2],
  [2, 3],
  [2, 1],
  [1, 3],
];

// 2nd approach - Adjacancy list
// the index of the array is the value of the actual graph node
// this is more commonly done by using objects
const graph = [[2], [2, 3], [0, 1, 3], [1, 2]];

// 3rd approach - Adjacent matrix
// values can be edge weights if we are working with a weighted graph
const graph = [
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 0],
];
