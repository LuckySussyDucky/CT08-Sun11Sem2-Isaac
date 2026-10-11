let handPose;
let hands = [];
let video;

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
    fingerTip.diameter = 20;
    fingerTip.collider = "kinematic";
    fingerTip.color = "rgba(0, 255, 0, 0.05)";

    balloon = new Sprite();
    balloon.diameter = 60;
    balloon.collider = "none";
    balloon.color = "red";
    balloon.x = width / 2;
    balloon.y = 100;

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
    
}









// 67