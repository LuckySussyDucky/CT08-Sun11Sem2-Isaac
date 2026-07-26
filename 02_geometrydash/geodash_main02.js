//player box
let box;
let cube;

// game variables
let tileMap1;
let startCoordinates;

const MAX_JUMPS = 1;
let jumpChance = MAX_JUMPS;

// world building groups
let background;
let spike;
let ground;
let orb;
let sharp;
let finishline;
let clear;

// image sprites


// menu


// sound assets
let stereoMadness
let deathSound
let startSound


function preload() {
  cube = loadImage("assets/cube.png");
  background = loadImage("assets/geobg.png");
  spike = loadImage("assets/spike.png"); 
  clear = loadImage("assets/clear.png");

  tileMap1 = loadStrings("stages/tiles1.txt");

  // stereoMadness = loadSound("assests/stereo-madness.mp3")
  // deathSound = loadSound("assests/geometry-dash-death-sound.mp3")
  // startSound = loadSound("assests/game-start.mp3")

  
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
  image(background, 0, 0, 800, 600);

  box.collider = "dynamic";
  box.vel.x = 8;


  
  if (box.x >= width / 2){
    camera.x = box. x;
  } else{
    camera.x = width / 2;
  }

  if (kb.presses("space") || mouse.presses("left") && jumpChance > 0){
    box.vel.y = -10;
    box.rotateTo(box.rotation + 90, 15);
    jumpChance -= 1;
  }

  // if (kb.presses("space") || mouse.presses("left")){
  //   box.vel.y = -10;
  //   box.rotateTo(box.rotation + 90, 15);
  // }

  if (box.collides(ground) && jumpChance < MAX_JUMPS){
    jumpChance = MAX_JUMPS;
  }

  if (box.collides(sharp)){
    resetGame();
  }

  for (let tile of ground){
    if (box.colliding(tile)){
      let leftEdge = tile.x - tile.w / 2;
      let leftEdgeHeight = tile.y - tile.h / 2;

      if (box.x < leftEdge && box.y > leftEdgeHeight){
        resetGame();
        break;
      }
    }
  }

  for (let orb of orbs){
    if (box.colliding(orb)){
      orb.visible = false;
      orb.collider = "none";
      box.vel.y = -10;
      jumpChance = MAX_JUMPS;
    }
  }

  if (box.collides(finishline)){
    clearLabel = new Sprite(); // x, y, width, height
    clearLabel.x = width / 2;
    clearLabel.y = height / 2;
    clearLabel.width = 384;
    clearLabel.height = 84;
    clearLabel.img = clear;
    clearLabel.layer = 100;
    clearLabel.x = camera.x;
    clearLabel.collider = "static";
  }
}

function resetGame(){
  box.rotation = 0;

  box.x = startCoordinates[0];
  box.y = startCoordinates[1];

  jumpChance = MAX_JUMPS;

  camera.x = width / 2;

  for (let orb of orbs){
    orb.visible = true;
    orb.collider = "static";
  }
}
