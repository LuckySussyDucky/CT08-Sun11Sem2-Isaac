//=========================================
// Variables
//=========================================

let videoW = 640;
let videoH = 480;

let hands = [];

let fingerTip;

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
    fingerTip.diameyet = 60;
    fingerTip.collider = ""
}

function draw() {
    image(video, 0, 0, videoW, videoH);

    if (hands.length > 0){
        let hand = hands[0];
        let keypoint = hand.keypoints[8];

        circle(keypoint.x, keypoint.y, 30)
    }
}

//=========================================
// Function Created
//=========================================

function gotHands(results) {
    hands = results;
}