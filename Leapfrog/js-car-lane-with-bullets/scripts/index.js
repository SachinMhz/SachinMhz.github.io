//creating canvas
const CANVAS = document.getElementById("canvas");
CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;
const CTX = CANVAS.getContext("2d");
const NO_OF_LANES = 3;
const ROAD_WIDTH = CANVAS.width * 0.9;
const SIDE_WIDTH = CANVAS.width * 0.05;
const LANE_WIDTH = ROAD_WIDTH / NO_OF_LANES;
const CAR_WIDTH = CANVAS.width * 0.05;
const CAR_HEIGHT = CAR_WIDTH * 2;
const BOTTOM_OFFSET = CANVAS.height * 0.05;
var player;
var powerUp;

//defining some variables
var bulletList = [];
var obstacleList = [];
var powerUpList = [];
var playerIMG = new Image();
playerIMG.src = "./images/red.png";
var playerDestroyIMG = new Image();
playerDestroyIMG.src = "./images/destroy.png";
var bulletIMG = new Image();
var powerUpIMG = new Image();
powerUpIMG.src = "./images/powerUp.png";
bulletIMG.src = "./images/bullet.png";
imagesArray = [
  "./images/blue.png",
  "./images/darkBlue.png",
  "./images/green.png",
  "./images/orange.png",
  "./images/pink.png",
  "./images/yellow.png",
];
//return value between min and max value
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function checkLeft(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width;
}
function checkRight(obj1, obj2) {
  return obj1.x + obj1.width > obj2.x;
}
function checkTop(obj1, obj2) {
  return obj1.y < obj2.y + obj2.height;
}
function checkBottom(obj1, obj2) {
  return obj1.y + obj1.height > obj2.y;
}

function DrawBackground() {
  //Left-road-side
  CTX.beginPath();
  CTX.rect(0, 0, SIDE_WIDTH, CANVAS.height);
  CTX.fillStyle = "green";
  CTX.fill();
  CTX.closePath();
  //road
  CTX.beginPath();
  CTX.rect(CANVAS.width - SIDE_WIDTH, 0, SIDE_WIDTH, CANVAS.height);
  CTX.fillStyle = "green";
  CTX.fill();
  CTX.closePath();
  //right-road-side
  CTX.beginPath();
  CTX.rect(SIDE_WIDTH, 0, ROAD_WIDTH, CANVAS.height);
  CTX.fillStyle = "gray";
  CTX.fill();
  CTX.closePath();
}

//responsible for drawing, moving and check collision
function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.width = CAR_WIDTH * 0.4;
  this.height = CAR_HEIGHT * 0.4;
  this.speed = 20;

  //draw an ant image to the canvas
  this.draw = () => {
    CTX.beginPath();
    //CTX.rect(SIDE_WIDTH, 0, ROAD_WIDTH, CANVAS.height);
    CTX.drawImage(
      bulletIMG,
      this.x - this.width / 2 + CAR_WIDTH / 2,
      this.y,
      this.width,
      this.height
    );
    CTX.stroke();
    CTX.closePath();
  };

  //moves ant with respect to the direction changed
  this.moveUp = () => {
    this.y -= this.speed;
  };

  //check boundary collision
  this.checkCollision = () => {
    obstacleList.forEach((obstacle) => {
      if (
        checkTop(this, obstacle) &&
        checkRight(this, obstacle) &&
        checkLeft(this, obstacle) &&
        checkBottom(this, obstacle)
      ) {
        let newObstacle = new Obstacle();
        obstacleList.push(newObstacle);
        obstacleList = obstacleList.filter((unwantedObstacle) => {
          return obstacle != unwantedObstacle;
        });
        bulletList = bulletList.filter((unwantedBullet) => {
          return this != unwantedBullet;
        });
      }
    });
  };
}

function Obstacle() {
  this.width = CAR_WIDTH;
  this.height = CAR_HEIGHT;
  this.x =
    SIDE_WIDTH + randomInt(-1, 2) * LANE_WIDTH + ROAD_WIDTH / 2 - CAR_WIDTH / 2;
  this.y = (randomInt(-3, 0) * CANVAS.height) / 3;
  this.speed = 3;
  this.image = new Image();
  this.image.src = imagesArray[randomInt(0, imagesArray.length)];
  //draw an ant image to the canvas
  this.draw = () => {
    CTX.beginPath();
    CTX.drawImage(this.image, this.x, this.y, CAR_WIDTH, CAR_HEIGHT);
    CTX.stroke();
    CTX.closePath();
  };

  //moves ant with respect to the direction changed
  this.moveDown = () => {
    this.y += this.speed;
  };

  this.checkBoundary = () => {
    if (this.y > CANVAS.height) {
      let obstacle = new Obstacle();
      obstacleList.push(obstacle);
      obstacleList = obstacleList.filter((obstacle) => {
        return this != obstacle;
      });
    }
  };

  this.validateObstacle = () => {
    var isValid = true; //only two of the cars at a time can be within heightLimit not all three so only one chance of valid
    obstacleList.forEach((obstacle) => {
      if (
        this !== obstacle &&
        Math.abs(this.y + this.height - obstacle.y) < CAR_HEIGHT * 2
      ) {
        if (!isValid) {
          this.y -= CAR_HEIGHT * 2;
        }
        isValid = false;
      }
    });
  };
}

function PowerUp() {
  this.width = CAR_WIDTH * 0.4;
  this.height = CAR_HEIGHT * 0.4;
  this.x =
    SIDE_WIDTH +
    randomInt(-1, 2) * LANE_WIDTH +
    ROAD_WIDTH / 2 -
    this.width / 2;
  this.y = 200; //randomInt(-4, -2) * CANVAS.height;
  this.speed = 3;
  //draw an ant image to the canvas
  this.draw = () => {
    CTX.beginPath();
    CTX.drawImage(powerUpIMG, this.x, this.y, this.width, this.height);
    CTX.stroke();
    CTX.closePath();
  };

  //moves ant with respect to the direction changed
  this.moveDown = () => {
    this.y += this.speed;
  };

  this.checkBoundary = () => {
    if (this.y > CANVAS.height) {
      let newPowerUp = new PowerUp();
      powerUpList.push(newPowerUp);
      powerUpList = powerUpList.filter((unwantedPowerUp) => {
        return this != unwantedPowerUp;
      });
    }
  };
}

//responsible for drawing, moving and check collision
function Player() {
  this.width = CAR_WIDTH;
  this.height = CAR_HEIGHT;
  this.x = SIDE_WIDTH + ROAD_WIDTH / 2 - CAR_WIDTH / 2;
  this.y = CANVAS.height - CAR_HEIGHT - BOTTOM_OFFSET;
  this.lanePos = 2;
  this.bulletCount = 5;
  this.isCharged = true;
  this.chargeTime = 2000;
  this.score = 0;
  this.image = playerIMG;

  //draw an ant image to the canvas
  this.draw = () => {
    CTX.beginPath();
    // CTX.rect(this.x, this.y, this.width, this.height);
    // CTX.fillStyle = "black";
    // CTX.fill();
    CTX.drawImage(this.image, this.x, this.y, this.width, this.height);
    CTX.stroke();
    CTX.closePath();
  };

  //moves ant with respect to the direction changed
  this.moveLeft = () => {
    this.x -= LANE_WIDTH;
    this.lanePos -= 1;
  };
  this.moveRight = () => {
    this.x += LANE_WIDTH;
    this.lanePos += 1;
  };

  this.shootBullet = () => {
    if (this.bulletCount >= 1 && this.isCharged) {
      this.isCharged = false;
      setTimeout(() => {
        this.isCharged = true;
      }, this.chargeTime);
      let bullet = new Bullet(this.x, this.y);
      bulletList.push(bullet);
      this.bulletCount -= 1;
    }
  };
  //check boundary collision
  this.checkCollision = () => {
    obstacleList.forEach((obstacle) => {
      if (this.y + this.height > obstacle.y) {
        this.score += 1;
        console.log("score---------", this.score);
      }
      if (
        checkTop(this, obstacle) &&
        checkRight(this, obstacle) &&
        checkLeft(this, obstacle) &&
        checkBottom(this, obstacle)
      ) {
        this.image = playerDestroyIMG;
      }
    });
  };
  //check boundary collision
  this.checkPowerUpCollision = () => {
    powerUpList.forEach((powerUp) => {
      if (
        checkTop(this, powerUp) &&
        checkRight(this, powerUp) &&
        checkLeft(this, powerUp) &&
        checkBottom(this, powerUp)
      ) {
        powerUpList = powerUpList.filter((unwantedPowerUp) => {
          return powerUp != unwantedPowerUp;
        });
        let newPowerUp = new PowerUp();
        powerUpList.push(newPowerUp);
        this.bulletCount += 1;
        console.log(this.bulletCount);
      }
    });
  };

  this.showScore = () => {
    CTX.font = "60px Arial";
    CTX.fillStyle = "black";
    CTX.fillText("Score: " + this.score, CANVAS.width / 2, 50);
  };
}

//creating new ant objects
function init() {
  player = new Player();
  powerUpList.push(new PowerUp());
  for (let i = 0; i < 3; i++) {
    let obstacle = new Obstacle();
    obstacleList.push(obstacle);
  }
}

//responsible for drawing and moving ants frame by frame
function draw() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  DrawBackground();
  player.draw();
  player.checkCollision();
  player.checkPowerUpCollision();
  player.showScore();
  bulletList.forEach((bullet) => {
    bullet.draw();
    bullet.moveUp();
    bullet.checkCollision();
  });
  powerUpList.forEach((powerUp) => {
    powerUp.draw();
    powerUp.moveDown();
    powerUp.checkBoundary();
  });
  obstacleList.forEach((obstacle) => {
    obstacle.draw();
    obstacle.moveDown();
    obstacle.checkBoundary();
    obstacle.validateObstacle();
  });
  //DrawObstacle();
  requestAnimationFrame(draw);
}

init();
draw();

document.addEventListener("keydown", function (event) {
  //console.log(event.key);
  if (event.key === "a") {
    if (player.lanePos > 1) player.moveLeft();
  }
  if (event.key === "d") {
    if (player.lanePos < 3) player.moveRight();
  }
  if (event.key === " ") {
    player.shootBullet();
  }
});
