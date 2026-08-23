//=========================================
// Variables
//=========================================

let videoW = 640;
let videoH = 480;

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
    create
}

function draw() {}

//=========================================
// Function Created
//=========================================
