var table = document.getElementById("main-table");

class TableRow {
  constructor(heading, path, parentElement) {
    self = this;
    this.heading = heading;
    this.path = path;
    this.element = this.createElement();
    this.parentElement = parentElement;
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

var tr1 = new TableRow(
  "JS-Exercise: 9 - using OOP",
  "JS_assignment/JS_Exercise_using_OOP/JS_Exercise_9/",
  table
);
tr1.render();

var tr2 = new TableRow("Git Assignment 1", "", table);
tr2.render();

var tr3 = new TableRow(
  "Design Assignment 1 A-home-search.jpg",
  "TuTriangle/",
  table
);
tr3.render();

var tr4 = new TableRow(
  "Design Assignment 2 A-home-search-responsive.jpg",
  "TuTriangleResponsive/",
  table
);
tr4.render();

var tr5 = new TableRow(
  "Design Final Project: Responsive",
  "design_final_project/",
  table
);
tr5.render();

var tr6 = new TableRow(
  "JS-Exercises: 2-7",
  "JS_assignment/JS_Exercises_2-7/",
  table
);
tr6.render();

var tr7 = new TableRow("JS-Exercise: 8", "JS_assignment/JS_Exercise_8/", table);
tr7.render();

var tr7 = new TableRow("JS-Exercise: 9", "JS_assignment/JS_Exercise_9/", table);
tr7.render();

var tr8 = new TableRow(
  "JS-Exercise: 8 - using OOP",
  "JS_assignment/JS_Exercise_using_OOP/JS_Exercise_8/",
  table
);
tr8.render();

var tr9 = new TableRow(
  "JS-Exercise: 9 - using OOP",
  "JS_assignment/JS_Exercise_using_OOP/JS_Exercise_9/",
  table
);
tr9.render();
