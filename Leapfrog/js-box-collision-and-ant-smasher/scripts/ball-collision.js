//creating canvas
const CANVAS = document.getElementById("canvas");
CANVAS.height = window.innerHeight - 20;
CANVAS.width = window.innerWidth - 20;
const CTX = CANVAS.getContext("2d");

//defining some variables
var ballsArray = [];
const BALL_COUNT = 50;

//return random color value 
function getRandomColor() {
  let red = randomInt(0, 240);
  let green = randomInt(0, 240);
  let blue = randomInt(0, 240);
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

//return value between min and max value
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//responsible for drawing, moving and check collision
function Ball(x, y, radius, speed, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
  this.color = color;
  this.dx = 1;
  this.dy = 1;

  //draw an ball image to the canvas
  this.draw = () => {
    CTX.beginPath();
    CTX.arc(this.x, this.y, this.radius, 0, 360);
    CTX.fillStyle = this.color;
    CTX.fill();
    CTX.closePath();
  };

  //moves ball with respect to the direction changed
  this.move = () => {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  };

  //check boundary collision
  this.checkWallCollision = () => {
    if (this.x - this.radius <= 0) {
      this.x = this.radius;
      this.dx = -this.dx;
    }
    if (this.x + this.radius >= CANVAS.width) {
      this.x = CANVAS.width - this.radius;
      this.dx = -this.dx;
    }
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.dy = -this.dy;
    }
    if (this.y + this.radius >= CANVAS.height) {
      this.y = CANVAS.height - this.radius;
      this.dy = -this.dy;
    }
  };

  //check collision between other balls
  this.checkBallCollision = () => {
    ballsArray.forEach((ball) => {
      if (this !== ball) {
        let xCord = this.x - ball.x;
        let yCord = this.y - ball.y;
        let distance = Math.sqrt(xCord * xCord + yCord * yCord);
        let totalRadius = this.radius + ball.radius;

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
          ball.dx = -this.dx;
          ball.dy = -this.dy;
        }
      }
    });
  };
}

//creating new ball objects
function init() {
  for (let i = 0; i < BALL_COUNT; i++) {
    let radius = randomInt(5, 20);
    let x = randomInt(radius, CANVAS.width);
    let y = randomInt(radius, CANVAS.height);
    let speed = randomInt(2, 6);
    let color = getRandomColor();
    var ball = new Ball(x, y, radius, speed, color);
    ballsArray.push(ball);
  }
}

//responsible for drawing and moving balls frame by frame
function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ballsArray.forEach((ball) => {
    ball.draw();
    ball.move();
    ball.checkWallCollision();
    ball.checkBallCollision();
  });
  requestAnimationFrame(draw);
}

init();
draw();

