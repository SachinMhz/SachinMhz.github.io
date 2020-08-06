var table = document.getElementById("main-table");

class TableData {
  constructor(heading, codeLink, demoLink) {
    self = this;
    this.heading = heading;
    this.codeLink = codeLink;
    this.demoLink = demoLink;
    this.element = this.createElement();
    this.parentElement = table;
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
    codeColLink.setAttribute("href", this.codeLink);
    demoColLink.innerHTML = this.heading + " - Demo";
    demoColLink.setAttribute("href", this.demoLink);

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

var tr2 = new TableData(
  "Git Assignment 1",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/",
  "https://sachinmhz.github.io/Leapfrog/"
);

var tr3 = new TableData(
  "Design Assignment 1 A-home-search.jpg",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/TuTriangle/",
  "https://sachinmhz.github.io/Leapfrog/TuTriangle/"
);

var tr4 = new TableData(
  "Design Assignment 2 A-home-search-responsive.jpg",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/TuTriangleResponsive/",
  "https://sachinmhz.github.io/Leapfrog/TuTriangleResponsive/"
);

var tr5 = new TableData(
  "Design Final Project: Responsive",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/design_final_project/",
  "https://sachinmhz.github.io/Leapfrog/design_final_project/"
);

var tr6 = new TableData(
  "JS-Exercises: 2-7",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/JS_assignment/JS_Exercises_2-7/",
  "https://sachinmhz.github.io/Leapfrog/JS_assignment/JS_Exercises_2-7/"
);

var tr7 = new TableData(
  "JS-Exercise: 8",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/JS_assignment/JS_Exercise_8/",
  "https://sachinmhz.github.io/Leapfrog/JS_assignment/JS_Exercise_8/"
);

var tr7 = new TableData(
  "JS-Exercise: 9",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/JS_assignment/JS_Exercise_9/",
  "https://sachinmhz.github.io/Leapfrog/JS_assignment/JS_Exercise_9/"
);

var tr8 = new TableData(
  "JS-Exercise: 8 - using OOP",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/JS_assignment/JS_Exercise_using_OOP/JS_Exercise_8/",
  "https://sachinmhz.github.io/Leapfrog/JS_assignment/JS_Exercise_using_OOP/JS_Exercise_8/"
);

var tr9 = new TableData(
  "JS-Exercise: 9 - using OOP",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/JS_assignment/JS_Exercise_using_OOP/JS_Exercise_9/",
  "https://sachinmhz.github.io/Leapfrog/JS_assignment/JS_Exercise_using_OOP/JS_Exercise_9/"
);

var tr10 = new TableData(
  "JS Assignment 1:  Image Slider",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-image-slider/",
  "https://sachinmhz.github.io/Leapfrog/js-image-slider/"
);

var tr11 = new TableData(
  "JS Assignment 2:  Image Slider with Hold Times",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-image-slider-hold/",
  "https://sachinmhz.github.io/Leapfrog/js-image-slider-hold/"
);

var tr12 = new TableData(
  "JS Assignment 3:  Ball Collision and Ant Smasher",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-box-collision-and-ant-smasher/",
  "https://sachinmhz.github.io/Leapfrog/js-box-collision-and-ant-smasher/"
);

var tr13 = new TableData(
  "JS Assignment 4:  Car Lane Game with Bullets",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-car-lane-with-bullets/",
  "https://sachinmhz.github.io/Leapfrog/js-car-lane-with-bullets/"
);

var tr14 = new TableData(
  "JS Assignment 5:  Flappy Bird",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-flappy-bird/",
  "https://sachinmhz.github.io/Leapfrog/js-flappy-bird/"
);

var tr15 = new TableData(
  "JS Assignment 6: Helix Animation",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-helix/",
  "https://sachinmhz.github.io/Leapfrog/js-helix/"
);

var tr16 = new TableData(
  "JS Final Project: Candy Crush Clone",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/js-final-project-candy-crush-clone/",
  "https://sachinmhz.github.io/Leapfrog/js-final-project-candy-crush-clone/"
);

var tr17 = new TableData(
  "Advance Design: BEM",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/dvance-design/BEM-assignment",
  "https://sachinmhz.github.io/Leapfrog/advance-design/BEM-assignment"
);

var tr18 = new TableData(
  "Advance Design: SASS",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/advance-design/SAAS-assignment/dist",
  "https://sachinmhz.github.io/Leapfrog/advance-design/SAAS-assignment/dist"
);

var tr19 = new TableData(
  "React",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/react/Todo",
  "https://sachinmhz.github.io/Leapfrog/react/Todo"
);

var tr20 = new TableData(
  "HackerNews",
  "https://github.com/SachinMhz/SachinMhz.github.io/tree/master/Leapfrog/react/hacker-news",
  "https://sachinmhz.github.io/hacker-news/"
);


var tr21 = new TableData(
  "GitHub-Repo-Clone",
  "https://github.com/SachinMhz/github-repo/tree/master",
  "https://sachinmhz.github.io/github-repo/"
);
