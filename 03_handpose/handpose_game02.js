//=========================================
// Variables
//=========================================

let videoW = 640;
let videoH = 480;

let hands = [];

let fingerTip;
let balloon;
let score = 0;

let bounceCooldown = 0;
let bounceDelay = 200;

let rightWall, leftWall, bottomWall, topWall, boundaryGroup;

let gameStarted = false;
let gameOver = false;

let bounceSound;
let gameoverSound;

//=========================================
// Code
//=========================================

function preload() {
    let options = {
        flipped: true,
        runtime: "tfjs",
        modelType: "lite",
        detectorModelUrl: undefined,
        landmarkModelUrl: undefined,
    }

    handpose = ml5.handPose(options);
    bounceSound = createAudio("assets/LowBoing.mp3");
    gameoverSound = createAudio("assets/DunDunn.mp3");
}

function setup() {
    world.gravity.y = 6
    createCanvas(videoW, videoH);

    let constraints = {
        video: {
            mandatory: {
                minWidth: videoW,
                minHeight: videoH
            },

            optional: [{ minFrameRate: 60 }]
        },

        audio: false,
        flipped: true,
    };

    video = createCapture(constraints);
    video.size(640, 480);
    video.hide();

    handpose.detectStart(video, gotHands)

    fingerTip = new Sprite();
    fingerTip.diameter = 60;
    fingerTip.collider = "kinematic";
    fingerTip.color = "rgba(0, 255, 0, 0.05)";

    balloon = new Sprite();
    balloon.diameter = 60;
    balloon.collider = "none";
    balloon.color = "red";
    balloon.x = width / 2;
    balloon.y = 100;

    topWall = new Sprite(width / 2, 0, width, 10, "static");
    bottomWall = new Sprite(width / 2, height, width, 10, "static");
    leftWall = new Sprite(0, height / 2, 10, height, "static");
    rightWall = new Sprite(width, height / 2, 10, height, "static");

    boundaryGroup = new Group();
    boundaryGroup.add(topWall);
    boundaryGroup.add(bottomWall);
    boundaryGroup.add(leftWall);
    boundaryGroup.add(rightWall);
    boundaryGroup.visible = false;
}

function draw() {
    image(video, 0, 0, videoW, videoH);

    if (bounceCooldown > 0) {
        bounceCooldown = bounceCooldown - deltaTime;
    }

    if (bounceCooldown <= 0 && balloon.collides(fingerTip)) {
        bounceSound.play();
        score++;
        bounceCooldown = bounceDelay;
    }

    if (gameStarted === false && kb.pressed("space")) {
        keyPressed();
    }

    if (balloon.collides(bottomWall)) {
        gameOver = true;
        gameoverSound.play();
        balloon.vel.x = 0;
        balloon.vel.y = 0;
        balloon.collider = "none";
    }

    fill(0);
    textSize(24);
    textAlign(LEFT, TOP);
    text("SCORE: " + score, 10, 10);

    if (gameOver === true) {
        textSize(36);
        textAlign(CENTER, CENTER);
        fill("magenta");
        text("Game Over", width / 2, height/ 2);
        textSize(18);
        text("Press SPACE to restart.", width / 2, height / 2 + 40);
    }

    if (gameOver === false) {

        if (hands.length > 0){
            let hand = hands[0];
            let keypoint = hand.keypoints[8];

            fingerTip.x = keypoint.x
            fingerTip.y = keypoint.y
            fingerTip.visible = true

            circle(keypoint.x, keypoint.y, 30);
        }
        else{
            fingerTip.visible = false;
        }
    }

    if (gameStarted === false) {
        textSize(28);
        textAlign(CENTER, CENTER);
        fill("limegreen");
        textSize(20);
        text("Use Index Finger to bounce the ball.", width / 2, height/ 2 - 40);
        textSize(28);
        text("Press SPACE to start the game.", width / 2, height / 2);
    }
}

//=========================================
// Function Created
//=========================================

function gotHands(results) {
    hands = results;
}

function keyPressed() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    
    balloon.collider = "dynamic";
    balloon.bounciness = 1.25;
    balloon.mass = 1;
    balloon.drag = 0.2;
    balloon.x = width / 2;
    balloon.y = 100;
}