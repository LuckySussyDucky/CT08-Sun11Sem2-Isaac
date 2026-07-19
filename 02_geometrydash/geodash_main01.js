//player box
let box;
let cube;
let background;

// game variables


// world building groups


// image sprites


// menu


// sound assets


function preload() {
  cube = loadImage("assets/cube.png")
  background = loadImage("assets/geobg.png")
}

function setup() {
  new Canvas(700, 600);
  world.gravity.y = 32;

  box = new Sprite(50, height, 50, 50);
  box.img = cube;
  box.friction = 0;
  box.bounciness = 0;
  box.collider = "none"

  startCoordinates
}

function draw() {
  
}











