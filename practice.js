// VARIABLES
let box;
let floor;
let blocks;

function setup() {
    new Canvas(800, 600);
    displayMode('centered');
    world.gravity.y = 7;

    box = new Sprite(400, 300, 30, 30);
    box.collider = "dynamic";
    box.color = "skyblue";

    floor = new Sprite(400, 600, 800, 50);
    floor.collider = "static";
}

function preload() {

}

function draw() {
    background(250);

    if (box.x >= width / 2){
      camera.x = box.x;
      box.rotation = 0;
    } else{
      camera.x = width / 2;
      box.rotation = 0;
    }

    if (box.y >= height / 2){
      camera.y = box.y;
      box.rotation = 0;
    } else{
      camera.y = width / 2;
      box.rotation = 0;
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

    if (mouse.presses("left")) {
        blocks = new Sprite(mouse.x, mouse.y, 30, 30);
        blocks.collider = "static";
    }
}