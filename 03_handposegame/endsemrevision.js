let handPose;
let hands = [];
let video;

let gameStarted = false;
let gameOver = false;

let fingerTip;
let balloon;
let rightWall, leftWall, bottomWall, topWall, boundaryGroup;

function preload(){

    let options = {
        flipped: true,
        runtime: "tfjs",
        modelType: "lite",
        detectorModelUrl: undefined,
        landmarkModeUrl: undefined,
    }

    handPose = ml5.handPose(options);
}

function setup () {
    world.gravity.y = 6
    new Canvas(640, 480);

    let constraints = {
        video:{
            mandatory:{
                midWidth: width,
                minHeight: height
            },
            optional: [{minFrameRate: 60}]
        },
        audio: false,
        flipped: true,
        };  

    video = createCapture(constraints);
    video.size(width, height);
    video.hide();

    handPose.detectStart(video, gotHands);

    fingerTip = new Sprite();
    fingerTip.width = 100;
    fingerTip.height = 20;
    fingerTip.collider = "kinematic";
    fingerTip.color = "rgba(0, 255, 0, 0.05)";
    fingerTip.visible = false;

    balloon = new Sprite();
    balloon.diameter = 25;
    balloon.collider = "none";
    balloon.color = "red";
    balloon.x = width / 2;
    balloon.y = 100;
    balloon.visible = false;

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

function gotHands(results){
    
    hands = results;

}

function draw () {
    background("black")  

    let keypoint

    image(video, 0, 0, width, height);

    // for (let i = 0; i < hands.length; i++) {
    //     let hand = hands[i];

    //     for (let j = 0; j < hand.keypoints.length; j++) {
    //         let keypoint = hand.keypoints[j];
    //         circle(keypoint.x, keypoint.y, 10);
    //     }
    // }

    if ((mouse.presses("left") && !gameStarted) || (kb.presses("space") && !gameStarted)) {
        gameOver = false;
        gameStarted = true;
        console.log("Game Started");
    }

    if (balloon.collides(bottomWall)) {
        gameOver = true;
        gameStarted = false;
        console.log("Game Over");
        balloon.vel.x = 0;
        balloon.vel.y = 0;
        balloon.collider = "none";
    }

    if (gameStarted) {
        fingerTip.visible = true;
        balloon.visible = true;
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

    if (gameOver) {
        textSize(36);
        textAlign(CENTER, CENTER);
        fill("magenta");
        text("Game Over", width / 2, height/ 2);
        textSize(18);
        text("Press SPACE to restart.", width / 2, height / 2 + 40);
    }
}

