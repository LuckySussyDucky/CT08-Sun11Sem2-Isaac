// VARIABLES
let box;
let floor;

function setup() {
    new Canvas(800, 600);
    displayMode('centered');
    world.gravity.y = 7;

    box = new Sprite(400, 300, 30, 30);
    box.collider = "dynamic";

    floor = new Sprite(400, 600, 900, 50);
    floor.collider = "static";
}

function preload() {

}

function draw() {
    background(250);

    floor.x = box.x;

    if (box.x >= width / 2){
      camera.x = box.x;
    } else{
      camera.x = width / 2;
    }
    
    if (kb.presses("space") || kb.presses("up")) {
        box.vel.y = -3;
    }

    if (kb.holding("A") || kb.holding("left")) {
        box.x -= 3;
    }

    if (kb.holding("D") || kb.holding("right")) {
        box.x += 3;
    }
}