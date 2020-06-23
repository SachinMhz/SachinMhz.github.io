/*
Write a function to render the following pattern in the console:
* * * * *
* * * *
* * *
* * 
*
The function needs to take a number as a parameter which represents how many asterisks are rendered on the first row.
*/
console.log("\n-----------------Exercise 2-----------------")
function makePattern(num) {
  for (let i = num; i > 0; i--) {
    console.log("*".repeat(i))
  }
}

makePattern(5);
