let handPose;
let hands = [];
let video;

let gameStarted = false;
let gameEnded = false;
let gameOver = false;

let fingerTip;
let balloon;

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

}

function gotHands(results){
    
    hands = results;

}

function draw () {
    background("black")  

    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i]; 
    }

    image(video, 0, 0, width, height);

    if (mouse.presses("left") && !gameStarted) {
        gameStarted = true;
        console.log("Game Started");
    }
    
    if (gameStarted) {
        
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
        textSize(32);
        fill("white");
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2);
    }
}

