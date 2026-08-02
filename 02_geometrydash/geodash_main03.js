//player box
let box;

// game variables
let tileMap1;
let startCoordinates;

const MAX_JUMPS = 1;
let jumpChance = MAX_JUMPS;

let start = false;
let gameOver = false;
let endTimer = 0;

let startSprite;
let endSprite

// world building groups
let ground;
let orb;
let sharp;
let finishline;

// image sprites
let cube;
let background;
let spike;
let endGame;
let startGame;

// menu


// sound assets
let stereoMadness
let deathSound
let startSound


function preload() {
  cube = loadImage("assets/cube.png");
  background = loadImage("assets/geobg.png");
  spike = loadImage("assets/spike.png"); 
  endGame = loadImage("assets/clear.png");
  startGame = loadImage("assets/startgame.png");

  tileMap1 = loadStrings("stages/tiles1.txt");

  stereoMadness = loadSound("assets/stereo-madness.mp3");
  deathSound = loadSound("assets/geometry-dash-death-sound.mp3");
  startSound = loadSound("assets/game-start.mp3");

  
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

  startSprite = new Sprite(width / 2, height / 2, 190, 90);
  startSprite.img = startGame;
  startSprite.collider = "none";
}

function draw() {
  image(background, 0, 0, 800, 600);

  if (!start && (mouse.presses() || kb.presses("space"))){
    start = true;
    startSprite.Visible = true;
  } else if (!start){
    if (frameCount % 60 < 30){
      startSprite.Visible = true;   
    } else{
      startSprite.Visible - false;
    }
  }
}

function finishGame(){
  clearLabel = new Sprite(); // x, y, width, height
  clearLabel.x = width / 2;
  clearLabel.y = height / 2;
  clearLabel.img = endGame;
  clearLabel.layer = 100;
  clearLabel.x = camera.x;
  clearLabel.collider = "static";
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