const CANVAS = document.getElementById("canvas");
CANVAS.height = window.innerHeight - 20;
CANVAS.width = window.innerWidth - 20;
const CTX = CANVAS.getContext("2d");

const ballsArray = [];
const BALL_COUNT = 10;

function getRandomColor() {
  let red = randomInt(0, 240);
  let green = randomInt(0, 240);
  let blue = randomInt(0, 240);
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Ball(x, y, radius, speed, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
  this.xDirection = 1;
  this.yDirection = 1;
  this.color = color;
  this.dx = 1;
  this.dy = 1;

  this.draw = () => {
    //console.log("drawing");
    CTX.beginPath();
    CTX.arc(this.x, this.y, this.radius, 0, 360);
    CTX.fillStyle = this.color;
    CTX.fill();
    CTX.closePath();
  };

  this.move = () => {
    //console.log("moving");
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  };

  this.checkWallCollision = () => {
    if (this.x + this.radius > CANVAS.width || this.x < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > CANVAS.height || this.y < this.radius) {
      this.dy = -this.dy;
    }
  };

  this.checkBallCollision = () => {
    ballsArray.forEach((ball) => {
      if (this !== ball) {
        let xCord = this.x - ball.x;
        let yCord = this.y - ball.y;
        distance = Math.sqrt(xCord * xCord + yCord * yCord);
        if (distance < this.radius + ball.radius) {
          this.dx = -this.dx;
          this.dy = -this.dy;
          ball.dx = -ball.dx;
          ball.dy = -ball.dy;
        }
      }
    });
  };
}

function init() {
  for (let i = 0; i < BALL_COUNT; i++) {
    let radius = randomInt(5, 20);
    let x = randomInt(radius, CANVAS.width);
    let y = randomInt(radius, CANVAS.height);
    let speed = randomInt(2, 10);
    let color = getRandomColor();
    var ball = new Ball(x, y, radius, speed, color);
    ballsArray.push(ball);
  }
}

init();

function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ballsArray.forEach((ball) => {
    ball.move();
    ball.draw();
    ball.checkWallCollision();
    ball.checkBallCollision();
  });
  requestAnimationFrame(draw);
}

draw();
