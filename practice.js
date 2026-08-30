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

    camera.x = box.x
    
    if (kb.presses("space") || mouse.presses()) {
        box.vel.y = -3;
    }

    if (kb.presses("A")) {
        box.x -= 3;
    }
}