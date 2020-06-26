const IMAGE_WIDTH = 600;

//initialize variable using DOM element
var carouselContainer = document.querySelector(".carousel-container");
var carouselImageContainer = document.querySelector(".carousel-image-wrapper");
var imageArray = carouselImageContainer.getElementsByTagName("img");

//setting styles to DOM element
carouselContainer.style.width = IMAGE_WIDTH + "px";
carouselImageContainer.style.width = IMAGE_WIDTH * imageArray.length + "px";
carouselImageContainer.style.left = 0 + "px";

//defining variables
var maxIndex = imageArray.length - 1;
var currentIndex = 0;

//changes current index based on the arrow-button clicked and update the current index for animation
function slideImage(dir) {
  timer = 0;
  currentIndex = currentIndex + dir * 1;
  if (currentIndex < 0) currentIndex = maxIndex;
  if (currentIndex > maxIndex) currentIndex = 0;
  startAnimation(currentIndex);
  changeActiveDotIndicator();
}

//change "left-position" of current-index-position to targeted-index-position frame by frame
function startAnimation(index) {
  var targetPosition = index * -IMAGE_WIDTH;
  var currentPosition = parseInt(carouselImageContainer.style.left);
  var framesPerIteration = (targetPosition - currentPosition) / 10;
  var animationID = setInterval(function () {
    timer++;
    if (timer >= 10) clearInterval(animationID);
    carouselImageContainer.style.left =
      parseInt(carouselImageContainer.style.left) + framesPerIteration + "px";
  }, 1000 / 60);
}

//add or remove "active" from class of dot-indicator-item
function changeActiveDotIndicator() {
  dotIndicatorListItems.forEach(function (value, index) {
    index === currentIndex
      ? value.classList.add("active")
      : value.classList.remove("active");
  });
}

//decrease current index by 1 and show respective animation when left-arrow-button is pressed
var leftArrow = document.createElement("div");
leftArrow.innerHTML = " < ";
leftArrow.className += "side-arrow left-arrow";
carouselContainer.appendChild(leftArrow);
leftArrow.onclick = function () {
  slideImage(-1);
};

//increases current index by 1 and show respective animation when right-arrow-button is pressed
var rightArrow = document.createElement("div");
rightArrow.innerHTML = " > ";
rightArrow.className += "side-arrow right-arrow";
carouselContainer.appendChild(rightArrow);
rightArrow.onclick = function () {
  slideImage(1);
};

//create list element for dot-indicators
var dotIndicatorList = document.createElement("ul");
dotIndicatorList.className += "dot-indicator-list";
carouselContainer.appendChild(dotIndicatorList);
//create list-item element and set onClick on every items to change current index to target index and show respective animation
var dotIndicatorListItems = [];
for (let i = 0; i < imageArray.length; i++) {
  let dotIndicatorListItem = document.createElement("li");
  dotIndicatorListItem.className += "dot-indicator-list-item";
  dotIndicatorList.appendChild(dotIndicatorListItem);
  dotIndicatorListItem.onclick = function () {
    timer = 0;
    currentIndex = i;
    startAnimation(currentIndex);
    changeActiveDotIndicator();
  };
  dotIndicatorListItems.push(dotIndicatorListItem);
}
//initialize first item with active class
dotIndicatorListItems[0].classList.add("active");
