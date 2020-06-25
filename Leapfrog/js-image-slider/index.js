/*
Render a circle that moves vertically and bounces back into another direction
*/

class Boundary {
  constructor(width, height, parentElement = document.body) {
    var self = this;
    this.width = width;
    this.height = height;
    this.parentElement = parentElement;
    this.element = this.createElement();
  }

  createElement() {
    let element = document.createElement("div");
    element.style.position = "relative";
    element.style.margin = "50px";
    element.style.float = "left";
    element.style.height = this.height + "px";
    element.style.width = this.width + "px";
    element.style.border = "1px solid black";
    return element;
  }

  render() {
    this.parentElement.appendChild(this.element);
  }
}

class Ball {
  constructor(width, height, color, speed, parentElement = document.body) {
    console.log(parentElement.style);
    console.log("ball class");
    var self = this;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.parentElement = parentElement;
    this.element = this.createElement();
    this.bounceLimit = parseInt(this.parentElement.style.height) - this.height;
    this.direction = 1;
    this.y = 0;
    this.bounce = this.bounce.bind(this);
    this.bounce();
  }
  createElement() {
    let element = document.createElement("div");
    element.style.position = "absolute";
    element.style.margin = "auto";
    element.style.height = this.height + "px";
    element.style.width = this.width + "px";
    element.style.borderRadius = Math.max(this.width, this.height) / 2 + "px";
    element.style.left = "50%";
    element.style.transform = "translateX(-50%)";
    element.style.backgroundColor = this.color;
    return element;
  }

  bounce() {
    if (parseInt(this.y) < 0 || parseInt(this.y) >= this.bounceLimit) {
      this.direction *= -1;
    }
    this.y += this.speed * this.direction;
    this.element.style.top = this.y + "px";
    window.requestAnimationFrame(this.bounce);
  }
  
  render() {
    this.parentElement.appendChild(this.element);
  }
}

var main_wrapper = document.getElementById("main-wrapper");

var first_boundary = new Boundary(500, 500, main_wrapper);
first_boundary.render();
var first_ball = new Ball(50, 50, "red", 5, first_boundary.element);
first_ball.render();

var second_boundary = new Boundary(550, 550, main_wrapper);
second_boundary.render();
var second_ball = new Ball(80, 80, "green", 15, second_boundary.element);
second_ball.render();

var third_boundary = new Boundary(300, 1000, main_wrapper);
third_boundary.render();
var third_ball = new Ball(80, 80, "blue", 20, third_boundary.element);
third_ball.render();

var fourth_boundary = new Boundary(400, 250, main_wrapper);
fourth_boundary.render();
var fourth_ball = new Ball(50, 50, "black", 2, fourth_boundary.element);
fourth_ball.render();

var fifth_boundary = new Boundary(100, 100, main_wrapper);
fifth_boundary.render();
var fifth_ball = new Ball(15, 15, "green", 15, fifth_boundary.element);
fifth_ball.render();
