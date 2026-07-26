//player box
let box;
let cube;

// game variables
let background;
let tileMap1;
let startCoordinates;

let spike;

let startGame;

// world building groups
let ground;
let orb;
let sharp;
let finishline;

// image sprites


// menu


// sound assets


function preload() {
  cube = loadImage("assets/cube.png");
  background = loadImage("assets/geobg.png");

  spike = loadImage("assets/spike.png"); 

  tileMap1 = loadStrings("stages/tiles1.txt");
}

function setup() {
  new Canvas(700, 600);
  world.gravity.y = 32;
  displayMode('centered');

  box = new Sprite(50, height, 50, 50);
  box.img = cube;
  box.friction = 0;
  box.bounciness = 0;
  box.collider = "none";

  startCoordinates = [50, (height - box.height / 2) - 25];
  box.x = startCoordinates[0];
  box.y = startCoordinates[1];

  ground = new Group();
  ground.tile = "g";

  ground.w = 50;
  ground.h = 50;
  ground.collider = "static";
  ground.color = "black";
  ground.stroke = "rgba(0, 0, 0, 0)";

  orbs = new Group();
  orbs.tile = "o";

  orbs.d = 24;
  orbs.collider = "static";
  orbs.color = "white";
  orbs.strokeWeight = 0;

  sharp = new Group();
  sharp.tile = "s";

  sharp.w = 25;
  sharp.h = 25;
  sharp.img = spike;
  sharp.collider = "static";

  finishline = new Group();
  finishline.tile = "f";

  finishline.w = 50;
  finishline.h = 1200;
  finishline.collider = "static";
  finishline.visible = false;

  particles = new Group();

  new Tiles(tileMap1, 0, 0, 50, 50);
}

function draw() {
  clear();
  image(background, 0, 0, 800, 600);

  box.collider = "dynamic";
  box.vel.x = 8;

  startGame = false;

  if(kb.presses("space") || mouse.presses("left")){
      startGame = true;
      box.visible = true;
  }

  if(startGame){
    box.x += 1
      camera.x = box.x;
      floor.x = camera.x;

      if(kb.presses("space") || mouse.presses("left")){
        box.vel.y = -5;
        box.sleeping = false;
      }
    }
}


