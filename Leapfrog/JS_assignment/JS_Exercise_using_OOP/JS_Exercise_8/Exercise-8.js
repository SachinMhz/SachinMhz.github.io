/*
Render a scatter plot based on an array of coordinates. Create the container for the plot and create each point using javascript.
var points = [
        {x: 10, y: 20},
        {x: 40, y, 40},
        {x: 60, y, 20},
        ];
*/



function createPointsAndBoundaries(size, initialColor, touchColor) {
  self = this;
  this.size = size;
  this.initialColor = initialColor;
  this.touchColor = touchColor;
  this.boundaries = (size) => {
    let boundaries = document.createElement("div");
    document.body.appendChild(boundaries);
    boundaries.style.position = "relative";
    boundaries.style.margin = "auto";
    boundaries.style.width = size + "px";
    boundaries.style.height = size + "px";
    boundaries.style.margin = "50px";
    boundaries.style.float = "left";
    boundaries.style.border = "1px solid black";
    return boundaries;
  };

  this.points = (size) => {
    let pointSize = 30;
    let max = size - pointSize;
    let min = pointSize;
    return Array(15)
      .fill()
      .map((_) => {
        return {
          x: Math.floor(Math.random() * (max - min)) + min,
          y: Math.floor(Math.random() * (max - min)) + min,
        };
      });
  };

  this.addPointsToBoundary = () => {
    let boundaries = this.boundaries(this.size);
    let points = this.points(this.size);
    let backgroundColor = this.initialColor;
    let touchColor = this.touchColor;
    points.forEach(function (coordinates) {
      let point = document.createElement("span");
      boundaries.appendChild(point);
      point.style.position = "absolute";
      point.style.top = coordinates.x + "px";
      point.style.left = coordinates.y + "px";
      point.style.width = "30px";
      point.style.height = "30px";
      point.style.borderRadius = 15 + "px";
      point.style.backgroundColor = backgroundColor;
      point.addEventListener("mousedown", () => {
        point.style.backgroundColor = touchColor;
      });
    });
  };
}

//parameter 1 - boundarySize, 2-initialColorOfPoint, 3-colorOnMouseClick
var box1 = new createPointsAndBoundaries(500, "red", "black");
box1.addPointsToBoundary();

var box2 = new createPointsAndBoundaries(550, "blue", "green");
box2.addPointsToBoundary();

var box3 = new createPointsAndBoundaries(400, "green", "blue");
box3.addPointsToBoundary();

var box4 = new createPointsAndBoundaries(600, "black", "red");
box4.addPointsToBoundary();

var box5 = new createPointsAndBoundaries(300, "pink", "crimson");
box5.addPointsToBoundary();
