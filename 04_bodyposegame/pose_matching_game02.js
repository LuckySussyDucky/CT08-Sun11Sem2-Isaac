// ====================================================
// Canvas and layout variables
// ====================================================

// Width of the webcam/game area.
let cameraWidth = 800;

// Height of the webcam/game area.
let cameraHeight = 450;

// Width of each side panel.
let sidePanelWidth = 220;

// Total canvas width = left panel + webcam area + right panel.
let totalCanvasWidth = cameraWidth + sidePanelWidth * 2;

// x-position where the webcam area starts.
let cameraX = sidePanelWidth;

// x-position of the left panel.
let leftPanelX = 0;

// x-position of the right panel.
let rightPanelX = sidePanelWidth + cameraWidth;

// ====================================================
// Variables
// ====================================================

let video; // Variable to hold the webcam video feed.

let bodyPose; // Variable to hold the body pose model.

let detectedPeople = []; // Array to hold detected people.
let poseList = [];

let currentPose = null;

let bothHandsUpImg;
let leftHandUpImg;
let rightHandUpImg;
let bothHandsOnHeadImg;
let tPoseImg;

let player1Color;
let player2Color;

let player1Person = null;
let player2Person = null;

let player1Score = 0;
let player2Score = 0;
let pointsForFirstMatch = 100;

let leftPanelCenterX = sidePanelWidth / 2;
let rightPanelCenterX = rightPanelX + sidePanelWidth / 2;

// ====================================================
// Preload
// ====================================================

function preload(){
    bodyPose = ml5.bodyPose("MoveNet", { flipped: true });

    bothHandsUpImg = loadImage("assets/poseBattle_bothHandsUp.png");
    leftHandUpImg = loadImage("assets/poseBattle_leftHandUp.png");
    rightHandUpImg = loadImage("assets/poseBattle_rightHandUp.png");
    bothHandsOnHeadImg = loadImage("assets/poseBattle_handsOnHead.png");
    tPoseImg = loadImage("assets/poseBattle_tpose.png");
}

// ====================================================
// Setup
// ====================================================

// setup() runs once at the start.
function setup() {

    // Set up text.
    textAlign(CENTER, CENTER);

    let canvas = createCanvas(totalCanvasWidth, cameraHeight);

    let constraints = {
        video: {
            width: cameraWidth,
            height: cameraHeight,
            aspectRatio: cameraWidth / cameraHeight
        },
        audio: false,
        flipped: true // Flip the webcam feed horizontally for a mirror effect.
    };

    video = createCapture(constraints);
    video.hide();

    bodyPose.detectStart(video, gotPoses);

    player1Color = color(80, 180, 255);
    player2Color = color(255, 120, 120);

    setupPoseList();
    currentPose = poseList[0];
}


// ====================================================
// Main draw loop
// ====================================================

// draw() runs again and again.
function draw() {
    // Clear the canvas with a dark background.
    background(30);
    // Display the webcam video feed.
    image(video, cameraX, 0, cameraWidth, cameraHeight);  
    
    findPlayers();
    drawPlayersSkeletons();

    // Draw the side panels.
    drawUIPanel();
    // Draw the middle line that separates Player 1 and Player 2 areas.
    drawMiddleLine();
    // Draw detection status.
    // drawDetectionStatus();

    drawPlayerStatus();

    drawSharedGameUI();
}

// ====================================================
// Draw side UI panels
// ====================================================

// Draws the left and right UI panels.
function drawUIPanel() {
    // Remove outlines.
    noStroke();
    // Set panel colour.
    fill(20);
    // Draw left panel.
    rect(leftPanelX, 0, sidePanelWidth, cameraHeight);
    // Draw right panel.
    rect(rightPanelX, 0, sidePanelWidth, cameraHeight);
    // Set divider line colour.
    stroke(255, 180);
    // Set divider line thickness.
    strokeWeight(2);
    // Draw line between left panel and webcam.
    line(sidePanelWidth, 0, sidePanelWidth, cameraHeight);
    // Draw line between webcam and right panel.
    line(rightPanelX, 0, rightPanelX, cameraHeight);
}


// ====================================================
// Draw middle divider line
// ====================================================

// Draws the vertical line that separates Player 1 and Player 2.
function drawMiddleLine() {
    // Set line colour to white with transparency.
    stroke(255, 180);
    // Set line thickness.
    strokeWeight(2);
    // Draw the middle line inside the webcam area.
    line(width / 2, 0, width / 2, cameraHeight);
}

function gotPoses(results) {
    detectedPeople = results;
}

function drawDetectionStatus() {
    // Set text colour to white.
    fill(0);
    textSize(24);
    text("Detected People: " + detectedPeople.length, width / 2, 55);
}

function drawAllSkeletons() {
    for (let i = 0; i < detectedPeople.length; i++) {
        let person = detectedPeople[i];

        drawSkeleton(person, player1Color);
    }
}

function drawSkeleton(person, skeletonColor) {
    // Set skeleton line colour.
    stroke(skeletonColor);

    // Set skeleton line thickness.
    strokeWeight(3);

    // Draw shoulder line.
    drawBodyLine(person.left_shoulder, person.right_shoulder);

    // Draw left upper arm.
    drawBodyLine(person.left_shoulder, person.left_elbow);

    // Draw left lower arm.
    drawBodyLine(person.left_elbow, person.left_wrist);

    // Draw right upper arm.
    drawBodyLine(person.right_shoulder, person.right_elbow);

    // Draw right lower arm.
    drawBodyLine(person.right_elbow, person.right_wrist);

    // Draw left body side.
    drawBodyLine(person.left_shoulder, person.left_hip);

    // Draw right body side.
    drawBodyLine(person.right_shoulder, person.right_hip);

    // Draw hip line.
    drawBodyLine(person.left_hip, person.right_hip);

    // Remove outlines for the body point circles.
    noStroke();

    // Set circle colour.
    fill(skeletonColor);

    // Draw important body points.
    drawBodyPoint(person.nose);
    drawBodyPoint(person.left_shoulder);
    drawBodyPoint(person.right_shoulder);
    drawBodyPoint(person.left_elbow);
    drawBodyPoint(person.right_elbow);
    drawBodyPoint(person.left_wrist);
    drawBodyPoint(person.right_wrist);
    drawBodyPoint(person.left_hip);
    drawBodyPoint(person.right_hip);
}

function drawBodyLine(point1, point2) {
    if (pointIsReady(point1) && pointIsReady(point2)) {
        line(point1.x + cameraX, point1.y, point2.x + cameraX, point2.y)
    }
}

function drawBodyPoint(point) {
    if (pointIsReady(point)) {
        circle(point.x + cameraX, point.y, 8);
    }
}

function pointIsReady(point) {
    if (point === null || point === undefined) {
        return false;
    }

    if (point.confidence > 0.25) {
        return true;
    } else {
        return false;
    }
}

function findPlayers() {
    player1Person = null;
    player2Person = null;

    let bestPlayer1Distance = 99999;
    let bestPlayer2Distance = 99999;

    let player1CenterX = cameraX + cameraWidth / 4;
    let player2CenterX = cameraX + cameraWidth * 3 / 4;

    let cameraMiddleX = cameraX + cameraWidth / 2;

    for (let i = 0; i < detectedPeople.length; i++) {
        let person = detectedPeople[i];
        let nose = person.nose;

        if (pointIsReady(nose)) {
            let noseX = cameraX + nose.x;

            if (noseX < cameraMiddleX) {
                let distanceFromPlayer1Area = abs(noseX - player1CenterX);

                if (distanceFromPlayer1Area < bestPlayer1Distance) {
                    player1Person = person;
                    bestPlayer1Distance = distanceFromPlayer1Area;
                }
            } else {
                let distanceFromPlayer2Area = abs(noseX - player2CenterX);

                if (distanceFromPlayer2Area < bestPlayer2Distance) {
                    player2Person = person;
                    bestPlayer2Distance = distanceFromPlayer2Area;
                }
            }
        }
    }
}

function drawPlayersSkeletons() {
    if (player1Person !== null) {
        drawSkeleton(player1Person, player1Color);
    }

    if (player2Person !== null) {
        drawSkeleton(player2Person, player2Color);
    }
}

function drawPlayerStatus() {
    noStroke();
    textSize(24);
    fill(255);

    if (player1Person !== null) {
        text("Detected", leftPanelCenterX, 125);
        if (checkCurrentPose(player1Person) === true) {
            text("Match!", leftPanelCenterX, height * 0.7);
        } else {
            text("Not Matching!", leftPanelCenterX, height * 0.7);
        }
    } else {
        text("Not Detected", leftPanelCenterX, 125);
    }

    

    if (player2Person !== null) {
        text("Detected", rightPanelCenterX, 125);
        if (checkCurrentPose(player2Person) === true) {
            text("Match!", rightPanelCenterX, height * 0.7);
        } else {
            text("Not Matching!", rightPanelCenterX, height * 0.7);
        }
    } else {
        text("Not Detected", rightPanelCenterX, 125);
    }


}

function setupPoseList() {
    poseList = [
        {
            name: "Both Hands Up",
            id: "bothHandsUp",
            image: bothHandsUpImg
        },

        {
            name: "Left Hand Up",
            id: "leftHandUp",
            image: leftHandUpImg
        },

        {
            name: "Right Hand Up",
            id: "rightHandUp",
            image: rightHandUpImg
        },

        {
            name: "T Pose",
            id: "tPose",
            image: tPoseImg
        },

        {
            name: "Hands On Head",
            id: "handsOnHead",
            image: bothHandsOnHeadImg
        }
    ]
}

function drawSharedGameUI() {
    if (currentPose === null || currentPose === undefined) {
        return;
    }

    noStroke();

    fill(0,135);
    rect(cameraX + 190, 8 , 420, 90, 12);

    fill(255);
    textSize(24);
    text("Current Pose", width / 2, 30);

    fill(255, 280, 80);
    textSize(28);
    text(currentPose.name, width / 2, 65);

    drawTargetPose(currentPose.image, width / 2, height / 2 + 55, 238);

    fill(255);
    textSize(18);
    text("Press 1 to 5 to test poses", width / 2, height - 30);
}

function drawTargetPose(poseImage, x, y, size) {
    imageMode(CENTER);

    image(poseImage, x, y, size, size);

    imageMode(CORNER);
}

// This function is called when a key is pressed
function keyPressed() {
    // Test other poses
    if (key === "1") {
        currentPose = poseList[0];
    }
    if (key === "2") {
        currentPose = poseList[1];
    }
    if (key === "3") {
        currentPose = poseList[2];
    }
    if (key === "4") {
        currentPose = poseList[3];
    }
    if (key === "5") {
        currentPose = poseList[4];
    }
}

function checkBothHandsUp(person) {
    let leftWrist = person.left_wrist;
    let rightWrist = person.right_wrist;
    let leftShoulder = person.left_shoulder;
    let rightShoulder = person.right_shoulder;
    let nose = person.nose;

    if (pointIsReady(leftWrist) === false) {
        return false;
    }

    if (pointIsReady(rightWrist) === false) {
        return false;
    }

    if (pointIsReady(leftShoulder) === false) {
        return false;
    }

    if (pointIsReady(rightShoulder) === false) {
        return false;
    }

    if (pointIsReady(nose) === false) {
        return false;
    }

    let shoulderWidth = abs(leftShoulder.x - rightShoulder.x);
    let margin = shoulderWidth * 0.25;

    let leftHandHigh = false;
    let rightHandHigh = false;

    if (leftWrist.y < nose.y - margin) {
        leftHandHigh = true;
    }

    if (rightWrist.y < nose.y - margin) {
        rightHandHigh = true;
    }

    if (leftHandHigh === true && rightHandHigh === true) {
        return true;
    } else {
        return false;
    }
}


// Checks whether only the left hand is up.
function checkLeftHandUp(person) {
    let leftWrist = person.left_wrist;
    let rightWrist = person.right_wrist;
    let leftShoulder = person.left_shoulder;
    let rightShoulder = person.right_shoulder;

    if (pointIsReady(leftWrist) === false) {
        return false;
    }

    if (pointIsReady(rightWrist) === false) {
        return false;
    }

    if (pointIsReady(leftShoulder) === false) {
        return false;
    }

    if (pointIsReady(rightShoulder) === false) {
        return false;
    }

    let shoulderWidth = abs(leftShoulder.x - rightShoulder.x);
    let margin = shoulderWidth * 0.25;

    let leftIsUp = false;
    let rightIsDown = false;

    if (leftWrist.y < leftShoulder.y - margin) {
        leftIsUp = true;
    }

    if (rightWrist.y > rightShoulder.y + margin) {
        rightIsDown = true;
    }

    if (leftIsUp === true && rightIsDown === true) {
        return true;
    } else {
        return false;
    }
}


// Checks whether only the right hand is up.
function checkRightHandUp(person) {
    let leftWrist = person.left_wrist;
    let rightWrist = person.right_wrist;
    let leftShoulder = person.left_shoulder;
    let rightShoulder = person.right_shoulder;

    if (pointIsReady(leftWrist) === false) {
        return false;
    }

    if (pointIsReady(rightWrist) === false) {
        return false;
    }

    if (pointIsReady(leftShoulder) === false) {
        return false;
    }

    if (pointIsReady(rightShoulder) === false) {
        return false;
    }

    let shoulderWidth = abs(leftShoulder.x - rightShoulder.x);
    let margin = shoulderWidth * 0.25;

    let rightIsUp = false;
    let leftIsDown = false;

    if (rightWrist.y < rightShoulder.y - margin) {
        rightIsUp = true;
    }

    if (leftWrist.y > leftShoulder.y + margin) {
        leftIsDown = true;
    }

    if (rightIsUp === true && leftIsDown === true) {
        return true;
    } else {
        return false;
    }
}


// Checks whether both arms are stretched sideways like a T.
function checkTPose(person) {
    let leftWrist = person.left_wrist;
    let rightWrist = person.right_wrist;
    let leftShoulder = person.left_shoulder;
    let rightShoulder = person.right_shoulder;

    if (pointIsReady(leftWrist) === false) {
        return false;
    }

    if (pointIsReady(rightWrist) === false) {
        return false;
    }

    if (pointIsReady(leftShoulder) === false) {
        return false;
    }

    if (pointIsReady(rightShoulder) === false) {
        return false;
    }

    let shoulderWidth = abs(leftShoulder.x - rightShoulder.x);
    let levelMargin = shoulderWidth * 0.5;

    let leftWristLevel = false;
    let rightWristLevel = false;
    let armsAreWide = false;

    if (abs(leftWrist.y - leftShoulder.y) < levelMargin) {
        leftWristLevel = true;
    }

    if (abs(rightWrist.y - rightShoulder.y) < levelMargin) {
        rightWristLevel = true;
    }

    let wristDistance = abs(leftWrist.x - rightWrist.x);

    if (wristDistance > shoulderWidth * 2) {
        armsAreWide = true;
    }

    if (leftWristLevel === true && rightWristLevel === true && armsAreWide === true) {
        return true;
    } else {
        return false;
    }
}


// Checks whether both hands are near the head.
function checkHandsOnHead(person) {
    let leftWrist = person.left_wrist;
    let rightWrist = person.right_wrist;
    let leftShoulder = person.left_shoulder;
    let rightShoulder = person.right_shoulder;
    let nose = person.nose;

    if (pointIsReady(leftWrist) === false) {
        return false;
    }

    if (pointIsReady(rightWrist) === false) {
        return false;
    }

    if (pointIsReady(leftShoulder) === false) {
        return false;
    }

    if (pointIsReady(rightShoulder) === false) {
        return false;
    }

    if (pointIsReady(nose) === false) {
        return false;
    }

    let shoulderWidth = abs(leftShoulder.x - rightShoulder.x);

    let closeToHeadDistance = shoulderWidth * 0.8;
    let headHeightMargin = shoulderWidth * 0.45;
    let aboveShoulderMargin = shoulderWidth * 0.3;

    let leftHandNearHead = false;
    let rightHandNearHead = false;

    let leftDistanceFromHead = dist(leftWrist.x, leftWrist.y, nose.x, nose.y);
    let rightDistanceFromHead = dist(rightWrist.x, rightWrist.y, nose.x, nose.y);

    if (
        leftDistanceFromHead < closeToHeadDistance &&
        abs(leftWrist.y - nose.y) < headHeightMargin &&
        leftWrist.y < leftShoulder.y - aboveShoulderMargin
    ) {
        leftHandNearHead = true;
    }

    if (
        rightDistanceFromHead < closeToHeadDistance &&
        abs(rightWrist.y - nose.y) < headHeightMargin &&
        rightWrist.y < rightShoulder.y - aboveShoulderMargin
    ) {
        rightHandNearHead = true;
    }

    if (leftHandNearHead === true && rightHandNearHead === true) {
        return true;
    } else {
        return false;
    }
}

// Function to check player pose
function checkCurrentPose(person) {
    // Check if there is a current pose
    if (currentPose === null || currentPose === undefined) {
        // Stop function
        console.log("No Current Pose");
        return;
    }

    // Check current pose id then call check function
    if (currentPose.id === "bothHandsUp") {
        return checkBothHandsUp(person);
    } else if (currentPose.id === "leftHandUp") {
        return checkLeftHandUp(person);
    } else if (currentPose.id === "rightHandUp") {
        return checkRightHandUp(person);
    } else if (currentPose.id === "handsOnHead") {
        return checkHandsOnHead(person);
    } else if (currentPose.id === "tPose") {
        return checkTPose(person);
    } else {
        return false;
    }
}

// Display player score
function drawPlayerPanel(player, panelCenterX, score, playerColour) {
    noStroke();
    fill(playerColour)
}