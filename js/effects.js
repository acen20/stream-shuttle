// FILM GRAIN
var viewWidth,
  viewHeight,
  canvas = document.getElementById("canvas"),
  ctx;

// change these settings
var patternSize = 64,
  patternScaleX = 3,
  patternScaleY = 1,
  patternRefreshInterval = 4,
  patternAlpha = 25; // int between 0 and 255,

var patternPixelDataLength = patternSize * patternSize * 4,
  patternCanvas,
  patternCtx,
  patternData,
  frame = 0;

window.onload = function () {
  initCanvas();
  initGrain();
  requestAnimationFrame(loop);
};

// create a canvas which will render the grain
function initCanvas() {
  viewWidth = canvas.width = canvas.clientWidth;
  viewHeight = canvas.height = canvas.clientHeight;
  ctx = canvas.getContext("2d");

  ctx.scale(patternScaleX, patternScaleY);
}

// create a canvas which will be used as a pattern
function initGrain() {
  patternCanvas = document.createElement("canvas");
  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;
  patternCtx = patternCanvas.getContext("2d");
  patternData = patternCtx.createImageData(patternSize, patternSize);
}

// put a random shade of gray into every pixel of the pattern
function update() {
  patternCtx.drawImage(patternCtx.canvas, 0, 0);
  var value;

  for (var i = 0; i < patternPixelDataLength; i += 4) {
    value = (Math.random() * 255) | 0;

    patternData.data[i] = value;
    patternData.data[i + 1] = value;
    patternData.data[i + 2] = value;
    patternData.data[i + 3] = patternAlpha;
  }

  patternCtx.putImageData(patternData, 0, 0);
}

// fill the canvas using the pattern
function draw() {
  ctx.clearRect(0, 0, viewWidth, viewHeight);

  ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
  ctx.fillRect(0, 0, viewWidth, viewHeight);
}

function loop() {
  if (++frame % patternRefreshInterval === 0) {
    update();
    draw();
  }

  requestAnimationFrame(loop);
}

// TYPEWRITER LOUNGE

var app = document.getElementById("lounge");
var typewriter = new Typewriter(app, {
  loop: false,
  delay: 60,
});
typewriter
  .pauseFor(1200)
  .typeString("Lift off ")
  .pauseFor(500)
  .typeString("your Spotify game ")
  .pauseFor(100)
  .typeString("by running social media ad campaigns ")
  .pauseFor(600)
  .typeString("and making data driven promotion decisions.")
  .pauseFor(900)
  .start();

// TYPEWRITER BAR

var app = document.getElementById("bar");

var typewriter = new Typewriter(app, {
  loop: false,
  delay: 60,
});

typewriter
  .pauseFor(200)
  .typeString("Chat with other streamonauts<br>")
  .pauseFor(500)
  .typeString("and listen to our playlist!")
  .start();

// TYPEWRITER CONTROL ROOM

var app = document.getElementById("controlroom");

var typewriter = new Typewriter(app, {
  loop: false,
  delay: 60,
});

typewriter
  .pauseFor(200)
  .typeString("Hi")
  .pauseFor(500)
  .typeString("<br>My name is Yan ")
  .pauseFor(200)
  .typeString("aka Elektrotechnika. ")
  .pauseFor(800)
  .typeString("I like to share my learnings ")
  .typeString("about growing as an artist ")
  .pauseFor(500)
  .typeString("so I created this place for people ")
  .pauseFor(500)
  .typeString("who want to <u>make data-driven promotion decisions</u>.")
  .pauseFor(300)
  .start();
