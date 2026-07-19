//player box
let box;
let cube;

// game variables
let background;
let tileMap1;

let spike;

// world building groups
let ground;
let orb;
let sharp;
let finishline;

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
  box.collider = "none";

  startCoordinates = [50, height - box.height / 2];
  box.x = startCoordinate[0];
  box.y = startCorrdinate[1];

}

function draw() {
  clear()
  image(background, 0, 0, 800, 600)
}


