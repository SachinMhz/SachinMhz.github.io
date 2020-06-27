class Carousel {
  constructor(carouselClass) {
    self = this;
    this.IMAGE_WIDTH = 600;
    this.carouselContainer = document.querySelector("." + carouselClass);
    this.carouselContainer.classList.add("carousel-container");
    this.carouselImageContainer = this.carouselContainer.getElementsByTagName(
      "div"
    )[0];
    this.carouselImageContainer.classList.add("carousel-image-wrapper");
    this.carouselImageContainer.classList.add("clearfix");
    this.carouselImageContainer.style.left = "0px";
    this.imageArray = this.carouselImageContainer.getElementsByTagName("img");
    this.carouselContainer.style.width = this.IMAGE_WIDTH + "px";
    this.carouselImageContainer.style.width =
      this.IMAGE_WIDTH * this.imageArray.length + "px";
    this.carouselImageContainer.style.left = 0 + "px";
    this.maxIndex = this.imageArray.length - 1;
    this.currentIndex = 0;
    this.timer = 0;
    this.leftArrow = this.createLeftArrow();
    this.rightArrow = this.createRightArrow();
    this.dotIndicatorList = this.createDotIndicator();
    setInterval(function () {
      console.log("interval");
      self.currentIndex += 1;
      if (self.currentIndex < 0) self.currentIndex = self.maxIndex;
      if (self.currentIndex > self.maxIndex) self.currentIndex = 0;
      self.startAnimation(self.currentIndex);
      self.changeActiveDotIndicator()
    }, 2000);
  }

  slideImage(dir) {
    this.currentIndex = this.currentIndex + dir * 1;
    if (this.currentIndex < 0) this.currentIndex = this.maxIndex;
    if (this.currentIndex > this.maxIndex) this.currentIndex = 0;
    this.startAnimation(this.currentIndex);
    this.changeActiveDotIndicator();
  }
  startAnimation(index) {
    var targetPosition = index * -this.IMAGE_WIDTH;
    var currentPosition = parseInt(this.carouselImageContainer.style.left);
    var framesPerIteration = (targetPosition - currentPosition) / 10;
    this.animationID = setInterval(function () {
      self.timer++;
      if (self.timer >= 10) {
        clearInterval(self.animationID);
        self.timer = 0;
      }
      self.carouselImageContainer.style.left =
        parseInt(self.carouselImageContainer.style.left) +
        framesPerIteration +
        "px";
    }, 1000 / 60);
  }
  changeActiveDotIndicator() {
    this.dotIndicatorListItems.forEach(function (value, index) {
      index === self.currentIndex
        ? value.classList.add("active")
        : value.classList.remove("active");
    });
  }

  createLeftArrow() {
    var leftArrow = document.createElement("div");
    leftArrow.innerHTML = " < ";
    leftArrow.className += "side-arrow left-arrow";
    this.carouselContainer.appendChild(leftArrow);
    leftArrow.onclick = function () {
      self.slideImage(-1);
      leftArrow.style.pointerEvents = "none";
      setTimeout(function () {
        leftArrow.style.pointerEvents = "auto";
      }, 500);
    };
    return leftArrow;
  }

  createRightArrow() {
    var rightArrow = document.createElement("div");
    rightArrow.innerHTML = " > ";
    rightArrow.className += "side-arrow right-arrow";
    this.carouselContainer.appendChild(rightArrow);
    rightArrow.onclick = function () {
      self.slideImage(1);
      rightArrow.style.pointerEvents = "none";
      setTimeout(function () {
        rightArrow.style.pointerEvents = "auto";
      }, 500);
    };
    return rightArrow;
  }

  createDotIndicator() {
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
        self.startAnimation(self.currentIndex);
        self.changeActiveDotIndicator();
      };
      this.dotIndicatorListItems.push(dotIndicatorListItem);
    }
    this.dotIndicatorListItems[0].classList.add("active");
  }
}

var obj1 = new Carousel("carousel-container1");
