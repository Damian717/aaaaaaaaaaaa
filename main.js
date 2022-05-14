song = "";
leftWrist = 0;
leftWrist = 0;
rightWrist = 0;
rightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY =" + rightWristY);

        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY =" + leftWristY);
    }
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#00FFFF");
    stroke("#00FFFF");

    if(scoreLeftWrist > 0.2)
    {circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = "+ volume;
    song.setVolume(volume);
    }
}

function play()
{
song.play();
song.setVolume(1);
song.rate(1);
}