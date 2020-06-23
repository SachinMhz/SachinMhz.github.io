/*
Define an object containing information about yourself. 
The object needs to include 'name', 'address', 'emails', 'interests' and 'education'.
The 'education' key needs to be an array of objects containing keys 'name' and 'enrolledDate'.
*/
console.log("\n-----------------Exercise 3-----------------")
var information = {
  name: "Sachin Maharjan",
  address: "Lainchour, Kathmandu",
  emails: ["sachin.mhz.sm@gmail.com", "sachinmhz97@gmail.com"],
  interests: ["playing games", "coding"],
  education: [
    {
      name: "National School of Sciences",
      enrolledDate: "2014",
    },
    {
      name: "Kathmandu University",
      enrolledDate: "2016",
    },
  ],
};

/*
Using the object defined previously iterate over the 'education' key and print a list of output in the console as follows:
Name: ABC School of Schoolery, Date: 2000
Name: BCD School of Trickery, Date: 2006
*/
var educationList = information.education;
/*------using 'for'-loop-----*/
console.log("------using 'for' loop-----");
for (let i = 0; i < educationList.length; i++) {
  console.log(
    "Name: " +
      educationList[i].name +
      ", Date: " +
      educationList[i].enrolledDate
  );
}

/*------using 'foreach'-iterator-----*/
console.log("\n------using 'foreach'-----");
educationList.forEach(function (value) {
  console.log("Name: " + value.name + ", Date: " + value.enrolledDate);
});
