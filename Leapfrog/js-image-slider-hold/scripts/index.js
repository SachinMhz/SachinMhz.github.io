class Carousel {
  constructor(carouselClass, holdTime, animationTime) {
    var self = this;
    //initialing class variable
    this.IMAGE_WIDTH = 600;
    this.holdTime = holdTime * 1000;
    this.animationTime = animationTime * 1000;
    this.timer = 0;
    this.isAnimationComplete = true;
    this.currentIndex = 0;

    this.init(carouselClass);
  }

  init(carouselClass) {
    var self = this;
    //creating DOM elements
    //
    this.carouselContainer = document.querySelector("." + carouselClass);
    //handling incase given className doesn't exits
    if (!this.carouselContainer)
      return console.log(carouselClass + " not found");

    this.carouselContainer.classList.add("carousel-container");
    this.carouselImageContainer = this.carouselContainer.getElementsByTagName(
      "div"
    )[0];
    this.carouselImageContainer.classList.add("carousel-image-wrapper");
    this.carouselImageContainer.classList.add("clearfix");
    this.carouselContainer.style.width = this.IMAGE_WIDTH + "px";
    this.carouselImageContainer.style.left = "0px";

    this.imageArray = this.carouselImageContainer.getElementsByTagName("img");
    //handling incase there is no image provided in image container
    if (this.imageArray.length === 0) {
      this.carouselImageContainer.innerHTML = "Add an Image to this section";
      return console.log("No images found in " + carouselClass);
    }

    this.carouselImageContainer.style.width =
      this.IMAGE_WIDTH * this.imageArray.length + "px";

    for (let i = 0; i < this.imageArray.length; i++) {
      this.imageArray[i].classList.add("carousel-img");
    }

    this.maxIndex = this.imageArray.length - 1;

    this.leftArrow = this.createLeftArrow();
    this.rightArrow = this.createRightArrow();
    this.dotIndicatorList = this.createDotIndicator();

    //starting initial auto-slider animation
    this.autoAnimationID = setTimeout(function () {
      self.startAnimation(1);
    }, self.holdTime);

    //checking media query for tab responsiveness
    var tabMedia = window.matchMedia("(min-width: 778px)");
    this.tabResponsive(tabMedia); // Call listener function at run time
    tabMedia.addListener(
      function () {
        this.tabResponsive(tabMedia);
      }.bind(this)
    ); // Attach listener function on state changes
  }


  tabResponsive(tabMedia) {
    if (this.imageArray && this.carouselContainer) {
      if (tabMedia.matches) {
        this.IMAGE_WIDTH = "600";
      } else {
        this.IMAGE_WIDTH = "350";
      }
      //re-initializing the variables for changing width in DOM
      this.carouselContainer.style.width = this.IMAGE_WIDTH + "px";
      this.carouselImageContainer.style.width =
        this.IMAGE_WIDTH * this.imageArray.length + "px";
      for (let i = 0; i < this.imageArray.length; i++) {
        this.imageArray[i].style.width = this.IMAGE_WIDTH + "px";
      }
    }
  }
  //changes current index based on the arrow-button clicked and update the current index for animation
  slideImage(dir) {
    this.currentIndex = this.currentIndex + dir * 1;
    if (this.currentIndex < 0) this.currentIndex = this.maxIndex;
    if (this.currentIndex > this.maxIndex) this.currentIndex = 0;
    this.startAnimation(this.currentIndex);
  }

  //clear some variables, animation and disables button actions
  clearValue() {
    clearTimeout(this.autoAnimationID);
    this.isAnimationComplete = false;
    this.leftArrow.style.pointerEvents = "none";
    this.rightArrow.style.pointerEvents = "none";
    this.dotIndicatorListItems.forEach(function (item) {
      item.style.pointerEvents = "none";
    });
  }

  //resets some variables, starts animation and enables button actions
  resetValue() {
    var self = this;
    clearInterval(self.animationID);
    self.timer = 0;
    self.isAnimationComplete = true;
    self.leftArrow.style.pointerEvents = "auto";
    self.rightArrow.style.pointerEvents = "auto";
    self.dotIndicatorListItems.forEach(function (item) {
      item.style.pointerEvents = "auto";
    });

    //starts slider animation again
    self.autoAnimationID = setTimeout(function () {
      self.currentIndex += 1;
      if (self.currentIndex > self.maxIndex) self.currentIndex = 0;
      self.startAnimation(self.currentIndex);
    }, self.holdTime);
  }

  //stops slider animations and starts transition animation based on the index value provided
  //and again start slider animationF
  startAnimation(index) {
    var self = this;
    this.clearValue();
    var targetPosition = index * -this.IMAGE_WIDTH;
    var currentPosition = parseInt(this.carouselImageContainer.style.left);
    var framesPerIteration = (targetPosition - currentPosition) / 50;

    this.animationID = setInterval(function () {
      self.timer++;
      if (self.timer >= 50) {
        self.resetValue();
      }
      self.carouselImageContainer.style.left =
        parseInt(self.carouselImageContainer.style.left) +
        framesPerIteration +
        "px";
    }, self.animationTime / 60);

    self.changeActiveDotIndicator();
  }

  //add or remove "active" from class of dot-indicator-item
  changeActiveDotIndicator() {
    var self = this;
    this.dotIndicatorListItems.forEach(function (value, index) {
      index === self.currentIndex
        ? value.classList.add("active")
        : value.classList.remove("active");
    });
  }

  //create leftArrow button on DOM
  //and decrease current index by 1 and show respective animation when left-arrow-button is pressed
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

  //create rightArrow button on DOM
  //and increase current index by 1 and show respective animation when right-arrow-button is pressed
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

  //create list element with items for dot-indicators on DOM
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
