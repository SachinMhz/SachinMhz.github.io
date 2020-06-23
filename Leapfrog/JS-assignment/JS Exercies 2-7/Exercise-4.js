/*
Write a function that searches for an object by a specific key value in an array of objects:
var fruits = [
  {id: 1, name: 'Banana', color: 'Yellow'},
  {id: 2, name: 'Apple', color: 'Red'}
]
searchByName(fruits, 'apple');
Should return: {id: 2, name: 'Apple', color: 'Red'}
*/
console.log("\n-----------------Exercise 4-----------------")
var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

function searchByName(arr, value) {
  console.log('\n----searching by Name----')
  arr.forEach(function(obj){
    if (obj.name.toLowerCase() === value.toLowerCase()) {
      console.log(obj);
    }
  });
}

function searchByKey(arr, key, value) {
  console.log('\n----searching by key----')
  arr.forEach((obj) => {
    if (obj[key].toLowerCase() === value.toLowerCase()) {
      console.log(obj);
    }
  });
}

searchByName(fruits, "apple");
searchByKey(fruits, "name", "apple");
