//Write a program to normalize a given input to get the expected output.
console.log("\n-----------------Exercise 7-----------------")
var input = {
  "1": {
    id: 1,
    name: "John",
    children: [
      { id: 2, name: "Sally" },
      { id: 3, name: "Mark", children: [{ id: 4, name: "Harry" }] },
    ],
  },
  "5": {
    id: 5,
    name: "Mike",
    children: [{ id: 6, name: "Peter" }],
  },
};

// var output = {
//   "1": { id: 1, name: "John", children: [2, 3] },
//   "2": { id: 2, name: "Sally" },
//   "3": { id: 3, name: "Mark", children: [4] },
//   "4": { id: 4, name: "Harry" },
//   "5": { id: 5, name: "Mike", children: [6] },
//   "6": { id: 6, name: "Peter" },
// };

function normalize(inputObject) {
  //create array using given object
  array = Object.values(inputObject);

  //find all the children of each object and add to the main array
  for (let i = 0; i < array.length; i++) {
    tempArray = [];
    if (array[i].children) {
      for (let j = 0; j < array[i].children.length; j++) {
        array.push(array[i].children[j]);
        tempArray.push(array[i].children[j].id);
      }
      array[i].children = tempArray;
    }
  }

  //returning object from array with normalization
  var result = array.reduce(function (acc, val, idx) {
    key = val.id;
    acc[key] = val;
    return acc;
  }, {});

  return result;
}

var output = normalize(input);

console.log(output);
