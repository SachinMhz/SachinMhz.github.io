function Helix(canvasID, numStrands) {
  this.canvas = document.getElementById(canvasID);
  //handle if canvas id doesn't exits
  if (!this.canvas) return console.log("cannot find canvas ID :", canvasID);
  //give style to canvas
  this.canvas.classList.add("helixCanvas");
  this.canvas.width = 500;
  this.canvas.height = 500;
  this.ctx = this.canvas.getContext("2d");
  //initialize class variables
  this.numStrands = numStrands;
  this.phase = 0;
  this.speed = 0.02;
  this.maxRadius = 8;
  this.frameCount = 0;
  this.numRows = 10;
  this.numCols = 15;
  this.rowGap = 15;
  this.colGap = 20;
  //draws to the canvas
  this.draw = () => {
    this.frameCount++;
    this.phase = this.frameCount * this.speed;
    var rowOffset = 0;
    for (var count = 0; count < 2; count++) {
      var wavePhase = this.phase + count * Math.PI;
      for (var col = 0; col < this.numCols; col++) {
        //circle x-position
        xPos = 100 + col * this.colGap;
        //change row position of circle
        rowOffset = (col * 2 * Math.PI) / this.numStrands;
        for (var row = 0; row < this.numRows; row++) {
          //circle y-position
          var yPos =
            200 + row * this.rowGap + Math.sin(wavePhase + rowOffset) * 25;
          //
          //sizeOffset is responsible to change the radius of circle using cos function
          var sizeOffset =
            (Math.cos(wavePhase - row * 0.1 + rowOffset) + 1) * 0.5;
          var circleRadius = sizeOffset * this.maxRadius;

          //draw circle on context
          this.ctx.beginPath();
          this.ctx.arc(xPos, yPos, circleRadius, 0, 360);
          this.ctx.fillStyle = "rgba(254,165,124)";
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  };

  (this.animate = () => {
    //clears the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //draws to the canvas
    this.draw();
    //repeat the clearing and drawing per each frame
    requestAnimationFrame(this.animate);
  })();
}

var helix1 = new Helix("canvas-1", 25);
var helix2 = new Helix("canvas-2", 10);
var helix3 = new Helix("canvas-22", 10);
