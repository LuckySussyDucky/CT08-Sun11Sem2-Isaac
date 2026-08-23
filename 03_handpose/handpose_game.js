//=========================================
// Variables
//=========================================

let videoW = 640;
let videoH = 480;

let hands = [];

let fingerTip;
let balloon;

//=========================================
// Code
//=========================================

function preload() {
    let options = {
        flipped: true,
        runtime: "tfjs",
        modelType: "full",
        detectorModelUrl: undefined,
        landmarkModelUrl: undefined,
    }

    handpose = ml5.handPose(options);
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
    balloon.collider = "dynamic";
    balloon.color = "red";
    balloon.x = width / 2;
    balloon.y = 100;
    balloon.bounce
}

function draw() {
    image(video, 0, 0, videoW, videoH);

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

//=========================================
// Function Created
//=========================================

function gotHands(results) {
    hands = results;
}