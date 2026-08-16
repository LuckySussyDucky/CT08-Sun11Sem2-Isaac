//player box
let box;

// game variables
let tileMap1;
let tileMap2;
let tileMap3;
let startCoordinates;

const MAX_JUMPS = 1;
let jumpChance = MAX_JUMPS;

let start = false;
let gameOver = false;
let endTimer = 0;

let startSprite;
let endSprite;

let level = 1;
let lastLevel;

let mapUsed;

let particles;

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
let stereoMadness;
let deathSound;
let startSound;

let lost = false;


function preload() {
  cube = loadImage("assets/cube.png");
  background = loadImage("assets/geobg.png");
  spike = loadImage("assets/spike.png"); 
  endGame = loadImage("assets/clear.png");
  startGame = loadImage("assets/startgame.png");

  tileMap1 = loadStrings("stages/tiles1.txt");
  tileMap2 = loadStrings("stages/tiles2.txt");
  tileMap3 = loadStrings("stages/tiles3.txt");


  stereoMadness = createAudio("assets/stereo-madness.mp3");
  deathSound = createAudio("assets/geometry-dash-death-sound.mp3");
  startSound = createAudio("assets/gamestart.mp3");

  
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
  mapUsed = tileMap1;

  startSprite = new Sprite(width / 2, height / 2, 190, 90);
  startSprite.img = startGame;
  startSprite.collider = "none";

  particles = new Group();
}

function draw() {
  
  clear()
  image(background, 0, 0, 800, 600);
  drawBackground();

  if (!start && (mouse.presses() || kb.presses("space"))){
    start = true;
    startSprite.visible = false;
  } else if (!start){
    if (frameCount % 60 < 30){
      startSprite.visible = true;   
    } else{
      startSprite.visible = false;
    }
  }

  if (start){
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
      lost = true;
    }

    for (let tile of ground){
      if (box.colliding(tile)){
        let leftEdge = tile.x - tile.w / 2;
        let leftEdgeHeight = tile.y - tile.h / 2;

        if (box.x < leftEdge && box.y > leftEdgeHeight){
          resetGame();
          lost = true;
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
      finishGame();
      lost = false;
    }

    if (gameOver){
      if (frameCount - endTimer > 120){
        if (endSprite){
          endSprite.remove();
        }

        start = false;
        gameOver = false;
        resetGame();

        level += 1;
        loadLevel();
      }
    }

    if (frameCount % 3 === 0 && box.colliding(ground) && box.vel.x > 0.5){
      let particle = new Sprite(box.x, box.y + box.h / 2, 8, 8, "none");
      particle.vel.x = -box.vel.x / 2;
      particle.vel.y = random(-2, 0);
      particle.color = "white";
      particle.strokeWeight = 0;
      particle.life = 30;

      particles.add(particle);
    }
} 

function finishGame(){
 if (!gameOver){
    gameOver = true;
    box.vel.x = 0;
    jumpChance = 0;
    endTimer = frameCount;

    if (endSprite){
      endSprite.remove()
    }

    endSprite = new Sprite(box.x, height / 2, 126, 24);
    endSprite.collider = "none";
    endSprite.img = endGame;

    startSound.play();
    stereoMadness.stop();
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

  particles.removeAll();

  if (lost){
    deathSound.play();
    stereoMadness.stop();
  }
}

function loadLevel(){
  ground.removeAll();
  sharp.removeAll();
  orbs.removeAll();
  finishline.removeAll();

  if (lastLevel < level){
    level = 1;
  }

  if (level === 1){
    new Tiles(tileMap1, 0, 0, 50, 50);
    mapUsed = tileMap1;
  } else if (level === 2){
    new Tiles(tileMap2, 0, 0, 50, 50);
    mapUsed = tileMap2;
  } else if (level === 3){
    new Tiles(tileMap3, 0, 0, 50, 50);
    mapUsed = tileMap3;
  }
}

function drawBackground() {

  let lastRow = mapUsed[mapUsed.length - 1]; //Get the final row of the current tile map.
  let numCols = lastRow.length; //Count how many tiles are in the row.
  let totalJourney = numCols * 50; //each tile is around 50px. this gives the total length

  let progress = map(box.x, 0, totalJourney, -100, 0);

  let c1 = color("#3f67e1"); //colours for lerping
  let c2 = color("#6b89e4");

  let amt = (sin(frameCount * 0.5) + 1) / 2; //Create a value that repeatedly changes between 0 and 1.
  let blend = lerpColor(c1, c2, amt); //lerp between two colours

  tint(blend); //turn on the tint
  image(background, progress, 0, 900, 700); //draw and move background 
  noTint(); //remove tint on all other objects
}