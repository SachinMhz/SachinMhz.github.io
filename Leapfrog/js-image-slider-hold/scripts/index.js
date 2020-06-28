class Carousel {
  constructor(carouselClass, holdTime, animationTime) {
    var self = this;
    this.IMAGE_WIDTH = 600;
    this.carouselContainer = document.querySelector("." + carouselClass);
    if (!this.carouselContainer)
      return console.log(carouselClass + " not found");
    this.carouselContainer.classList.add("carousel-container");
    this.carouselImageContainer = this.carouselContainer.getElementsByTagName(
      "div"
    )[0];
    this.carouselImageContainer.classList.add("carousel-image-wrapper");
    this.carouselImageContainer.classList.add("clearfix");
    this.carouselImageContainer.style.left = "0px";
    this.imageArray = this.carouselImageContainer.getElementsByTagName("img");
    if (this.imageArray.length === 0)
      return console.log("No images found in " + carouselClass);
    this.carouselContainer.style.width = this.IMAGE_WIDTH + "px";
    this.carouselImageContainer.style.width =
      this.IMAGE_WIDTH * this.imageArray.length + "px";
    this.carouselImageContainer.style.left = 0 + "px";
    this.maxIndex = this.imageArray.length - 1;
    this.currentIndex = 0;
    this.timer = 0;
    this.holdTime = holdTime * 1000;
    this.animationTime = animationTime * 1000;
    this.isAnimationComplete = true;
    this.leftArrow = this.createLeftArrow();
    this.rightArrow = this.createRightArrow();
    this.dotIndicatorList = this.createDotIndicator();
    this.autoAnimationID = setTimeout(function () {
      self.currentIndex += 1;
      self.startAnimation(self.currentIndex);
    }, self.holdTime);
  }

  slideImage(dir) {
    this.currentIndex = this.currentIndex + dir * 1;
    if (this.currentIndex < 0) this.currentIndex = this.maxIndex;
    if (this.currentIndex > this.maxIndex) this.currentIndex = 0;
    this.startAnimation(this.currentIndex);
  }

  startAnimation(index) {
    var self = this;
    clearTimeout(this.autoAnimationID);
    this.isAnimationComplete = false;
    this.leftArrow.style.pointerEvents = "none";
    this.rightArrow.style.pointerEvents = "none";
    this.dotIndicatorListItems.forEach(function (item) {
      item.style.pointerEvents = "none";
    });
    var targetPosition = index * -this.IMAGE_WIDTH;
    var currentPosition = parseInt(this.carouselImageContainer.style.left);
    var framesPerIteration = (targetPosition - currentPosition) / 50;
    this.animationID = setInterval(function () {
      self.timer++;
      if (self.timer >= 50) {
        clearInterval(self.animationID);
        self.timer = 0;
        self.isAnimationComplete = true;
        self.leftArrow.style.pointerEvents = "auto";
        self.rightArrow.style.pointerEvents = "auto";
        self.dotIndicatorListItems.forEach(function (item) {
          item.style.pointerEvents = "auto";
        });
        self.autoAnimationID = setTimeout(function () {
          self.currentIndex += 1;
          if (self.currentIndex > self.maxIndex) self.currentIndex = 0;
          self.startAnimation(self.currentIndex);
        }, self.holdTime);
      }
      self.carouselImageContainer.style.left =
        parseInt(self.carouselImageContainer.style.left) +
        framesPerIteration +
        "px";
    }, self.animationTime / 60);

    self.changeActiveDotIndicator();
  }

  changeActiveDotIndicator() {
    var self = this;
    this.dotIndicatorListItems.forEach(function (value, index) {
      index === self.currentIndex
        ? value.classList.add("active")
        : value.classList.remove("active");
    });
  }

  createLeftArrow() {
    var self = this;
    var leftArrow = document.createElement("div");
    leftArrow.innerHTML = " < ";
    leftArrow.className += "side-arrow left-arrow";
    this.carouselContainer.appendChild(leftArrow);
    leftArrow.onclick = function () {
      if (self.isAnimationComplete) self.slideImage(-1);
    };
    return leftArrow;
  }

  createRightArrow() {
    var self = this;
    var rightArrow = document.createElement("div");
    rightArrow.innerHTML = " > ";
    rightArrow.className += "side-arrow right-arrow";
    this.carouselContainer.appendChild(rightArrow);
    rightArrow.onclick = function () {
      if (self.isAnimationComplete) self.slideImage(1);
    };
    return rightArrow;
  }

  createDotIndicator() {
    var self = this;
    var dotIndicatorList = document.createElement("ul");
    dotIndicatorList.className += "dot-indicator-list";
    this.carouselContainer.appendChild(dotIndicatorList);
    //create list-item element and set onClick on every items to change current index to target index and show respective animation
    this.dotIndicatorListItems = [];
    for (let i = 0; i < this.imageArray.length; i++) {
      let dotIndicatorListItem = document.createElement("li");
      dotIndicatorListItem.className += "dot-indicator-list-item";
      dotIndicatorList.appendChild(dotIndicatorListItem);
      dotIndicatorListItem.onclick = function () {
        self.timer = 0;
        self.currentIndex = i;
        if (self.isAnimationComplete) self.startAnimation(self.currentIndex);
        //self.changeActiveDotIndicator();
      };
      this.dotIndicatorListItems.push(dotIndicatorListItem);
    }
    this.dotIndicatorListItems[0].classList.add("active");
  }
}

var obj1 = new Carousel("carousel-container1", 2, 1);

var obj2 = new Carousel("carousel-container2", 4, 1.5);

var obj2 = new Carousel("carousel-container3", 2, 1);

var obj2 = new Carousel("carousel-container4", 2, 1);
