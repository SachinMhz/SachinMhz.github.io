/*
Render a scatter plot based on an array of coordinates. Create the container for the plot and create each point using javascript.
var points = [
        {x: 10, y: 20},
        {x: 40, y, 40},
        {x: 60, y, 20},
        ];
*/
var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 100, y: 100 },
  { x: 160, y: 20 },
  { x: 140, y: 140 },
  { x: 460, y: 20 },
  { x: 160, y: 320 },
  { x: 140, y: 440 },
  { x: 260, y: 320 },
];

boundaries = document.createElement("div");
document.body.appendChild(boundaries);
boundaries.style.position = "relative";
boundaries.style.margin = "auto";
boundaries.style.width = "500px";
boundaries.style.height = "500px";
boundaries.style.border = "1px solid black";

points.forEach(function (coordinates) {
  point = document.createElement("span");
  boundaries.appendChild(point);
  point.style.position = "absolute";
  point.style.top = coordinates.x + "px";
  point.style.left = coordinates.y + "px";
  point.style.width = "10px";
  point.style.height = "10px";
  point.style.borderRadius = 5 + "px";
  point.style.backgroundColor = "#34deeb";
});
