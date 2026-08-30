// VARIABLES
let box;

function setup() {
  new Canvas(800, 600);
  background(250);
  displayMode('centered');
}

function preload() {
    box = new Sprite(600, 300, 30, 30);
}

function draw() {
    box = new Sprite(600, 300, 30, 30);
}