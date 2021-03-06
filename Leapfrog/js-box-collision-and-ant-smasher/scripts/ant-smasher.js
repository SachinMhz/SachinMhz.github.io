//creating canvas
const CANVAS = document.getElementById("canvas");
CANVAS.height = window.innerHeight - 20;
CANVAS.width = window.innerWidth - 20;
const CTX = CANVAS.getContext("2d");

//defining some variables
var antsArray = [];
const ANT_COUNT = 8;
antImage = new Image();
antImage.src = "../images/ant-gif.gif";

//return value between min and max value
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//responsible for drawing, moving and check collision
function Ant(x, y, size, speed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.speed = speed;
  this.dx = 1;
  this.dy = 1;

  //draw an ant image to the canvas
  this.draw = () => {
    CTX.beginPath();
    CTX.drawImage(
      antImage,
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );
    CTX.stroke();
    CTX.closePath();
  };

  //moves ant with respect to the direction changed
  this.move = () => {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  };

  //check boundary collision
  this.checkWallCollision = () => {
    if (this.x - this.size <= 0) {
      this.x = this.size;
      this.dx = -this.dx;
    }
    if (this.x + this.size >= CANVAS.width) {
      this.x = CANVAS.width - this.size;
      this.dx = -this.dx;
    }
    if (this.y - this.size <= 0) {
      this.y = this.size;
      this.dy = -this.dy;
    }
    if (this.y + this.size >= CANVAS.height) {
      this.y = CANVAS.height - this.size;
      this.dy = -this.dy;
    }
  };

  //check collision between other ants
  this.checkAntCollision = () => {
    antsArray.forEach((ant) => {
      if (this !== ant) {
        let xCord = this.x - ant.x;
        let yCord = this.y - ant.y;
        let distance = Math.sqrt(xCord * xCord + yCord * yCord);
        let totalRadius = this.size + ant.size;

        if (distance <= totalRadius) {
          //collision exists - also overlap may exists
          //eliminating overlaps
          xOverlap = totalRadius - Math.abs(xCord);
          yOverlap = totalRadius - Math.abs(yCord);
          if (xOverlap > yOverlap) {
            this.y += yCord > 0 ? yOverlap : -yOverlap;
          } else {
            this.x += xCord > 0 ? xOverlap : -xOverlap;
          }
          //changing direction after collision
          this.dx = -this.dx;
          this.dy = -this.dy;
          ant.dx = -this.dx;
          ant.dy = -this.dy;
        }
      }
    });
  };
}

//creating new ant objects
function init() {
  for (let i = 0; i < ANT_COUNT; i++) {
    let size = randomInt(30, 50);
    let x = randomInt(size, CANVAS.width);
    let y = randomInt(size, CANVAS.height);
    let speed = randomInt(2, 5);
    var ant = new Ant(x, y, size, speed);
    antsArray.push(ant);
  }
}

//responsible for drawing and moving ants frame by frame
function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  antsArray.forEach((ant) => {
    ant.draw();
    ant.move();
    ant.checkWallCollision();
    ant.checkAntCollision();
  });
  requestAnimationFrame(draw);
}

init();
draw();


CANVAS.addEventListener("click", function (event) {
  let x = event.offsetX;
  let y = event.offsetY;
  antsArray.forEach((ant) => {
    //responsible for adding onclick listener to each ant objects
    if (
      x < ant.x + ant.size &&
      x > ant.x - ant.size &&
      y < ant.y + ant.size &&
      y > ant.y - ant.size
    ) {
      antsArray = antsArray.filter((val) => {
        //remove the ant object after clicked
        return val != ant;
      });
    }
  });
});
