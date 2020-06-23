/*
Write a program to sort an array of object by a target key. The original array should remain unchanged.
var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];
function sortBy(array, key) {
    ...
}
var sorted = sortBy(arr, 'name');
*/
console.log("\n-----------------Exercise 6-----------------")
var arr = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Mary",
  },
  {
    id: 3,
    name: "Andrew",
  },
];

function sortBy(array, key) {
  var result = array.sort(function (a, b) {
    var nameA = a[key];
    var nameB = b[key];
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return result;
}

var sorted = sortBy(arr, "name");

console.log(sorted);
