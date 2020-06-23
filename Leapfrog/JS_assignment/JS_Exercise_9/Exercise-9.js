/*
Render a circle that moves vertically and bounces back into another direction
*/

boundaries = document.createElement("div");
document.body.appendChild(boundaries);
boundaries.style.position = "relative";
boundaries.style.margin = "auto";
boundaries.style.width = "500px";
boundaries.style.height = "500px";
boundaries.style.border = "1px solid black";

ball = document.createElement("span");
boundaries.appendChild(ball);
ball.style.position = "absolute";
ball.style.top = 0 + "px";
ball.style.left = 500 / 2 - 50 / 2 + "px";
ball.style.width = "50px";
ball.style.height = "50px";
ball.style.borderRadius = "25px";
ball.style.backgroundColor = "#34deeb";

var newTop = 0;
var limit = parseInt(boundaries.style.height) - parseInt(ball.style.height);
var direction = 1; //(-1)=upward (1)=downward
var speed = 5;

function bounce() {
  if (parseInt(ball.style.top) < 0 || parseInt(ball.style.top) >= limit) {
    direction *= -1;
  }
  newTop += speed * direction;
  ball.style.top = newTop + "px";
  window.requestAnimationFrame(bounce);
}
bounce();
