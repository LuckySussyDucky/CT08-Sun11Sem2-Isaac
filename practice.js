// VARIABLES
let box;
let floor;

function setup() {
  new Canvas(800, 600);
  background(250);
  displayMode('centered');
  world.gravity.y = 7
}

function preload() {
    box = new Sprite(600, 300, 30, 30);
    box.collider = "dynamic";

    floor = new Sprite(400, 600, 900, 50);
    box.collider = "static";
}

function draw() {
    
}