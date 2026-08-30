// VARIABLES
let box;

function setup() {
  new Canvas(800, 600);
  background(250);
  displayMode('centered');
}

function preload() {

}

function draw() {
    box = new Sprite(0, 0, 30, 30)
}