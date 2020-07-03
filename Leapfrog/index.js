var table = document.getElementById("main-table");

class TableRow {
  constructor(heading, path, parentElement) {
    self = this;
    this.heading = heading;
    this.path = path;
    this.element = this.createElement();
    this.parentElement = parentElement;
    this.render(this.parentElement);
  }

  createElement() {
    let row = document.createElement("tr");
    let titleCol = document.createElement("td");
    row.appendChild(titleCol);
    let codeCol = document.createElement("td");
    row.appendChild(codeCol);
    let demoCol = document.createElement("td");
    row.appendChild(demoCol);
    let codeColLink = document.createElement("a");
    codeCol.appendChild(codeColLink);
    let demoColLink = document.createElement("a");
    demoCol.appendChild(demoColLink);
    titleCol.innerHTML = this.heading;
    codeColLink.innerHTML = this.heading + " - Code";
    codeColLink.setAttribute(
      "href",
      "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/" +
        this.path
    );
    demoColLink.innerHTML = this.heading + " - Demo";
    demoColLink.setAttribute(
      "href",
      "https://sachinmhz.github.io/Leapfrog/" + this.path
    );

    row.classList += "table-row";
    return row;
  }

  addClass(className) {
    this.element.classList += className;
  }

  render() {
    this.parentElement.appendChild(this.element);
  }
}

var tr2 = new TableRow("Git Assignment 1", "", table);

var tr3 = new TableRow(
  "Design Assignment 1 A-home-search.jpg",
  "TuTriangle/",
  table
);

var tr4 = new TableRow(
  "Design Assignment 2 A-home-search-responsive.jpg",
  "TuTriangleResponsive/",
  table
);

var tr5 = new TableRow(
  "Design Final Project: Responsive",
  "design_final_project/",
  table
);

var tr6 = new TableRow(
  "JS-Exercises: 2-7",
  "JS_assignment/JS_Exercises_2-7/",
  table
);

var tr7 = new TableRow("JS-Exercise: 8", "JS_assignment/JS_Exercise_8/", table);

var tr7 = new TableRow("JS-Exercise: 9", "JS_assignment/JS_Exercise_9/", table);

var tr8 = new TableRow(
  "JS-Exercise: 8 - using OOP",
  "JS_assignment/JS_Exercise_using_OOP/JS_Exercise_8/",
  table
);

var tr9 = new TableRow(
  "JS-Exercise: 9 - using OOP",
  "JS_assignment/JS_Exercise_using_OOP/JS_Exercise_9/",
  table
);

var tr10 = new TableRow(
  "JS Assignment 1:  Image Slider",
  "js-image-slider/",
  table
);

var tr11 = new TableRow(
  "JS Assignment 2:  Image Slider with Hold Times",
  "js-image-slider-hold/",
  table
);

var tr12 = new TableRow(
  "JS Assignment 3:  Ball Collision and Ant Smasher",
  "js-box-collision-and-ant-smasher/",
  table
);

var tr13 = new TableRow(
  "JS Assignment 4:  Car Lane Game with Bullets",
  "js-car-lane-with-bullets/",
  table
);

var tr14 = new TableRow(
  "JS Assignment 5:  Flappy Bird",
  "js-flappy-bird/",
  table
);

var tr15 = new TableRow("JS Assignment 6: Helix Animation", "js-helix/", table);
