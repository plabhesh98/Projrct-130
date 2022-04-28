left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x =0;
right_wrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload(){
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(400, 500);
    canvas.position(550, 190);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    song1.setVolume(1);
    song1.rate(1.5);
}

function draw(){
    image(video, 0, 0, 400, 500);

    fill("#FF0000");
    stroke("#FF0000");
    
    song_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    if(scoreleftWrist > 0.2){
        circle(left_wrist_x, left_wrist_y, 20);
        song2.stop();
        if(song_status == "false"){
        song1.play();
        document.getElementById("song").innerHTML = "Song being played is Avengers Theme Song";
        }
        else{
            console.log("left wrist not shown");
        }
    }  
    if(scorerightWrist > 0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        song1.stop();
        if(song2_status == "false"){
        song1.play();
        document.getElementById("song").innerHTML = "Song being played is Avengers Theme Song";
        }
        else{
            console.log("right wrist not shown");
        }
    }  
}

function modelLoaded(){
    console.log("Posenet is Inititalized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist score is " + scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist score is " + scorerightWrist);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("Left wrist x is " + left_wrist_x + " left wrist y is " + left_wrist_y);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Right wrist x is " + right_wrist_x + " right wrist y is " + right_wrist_y);
    }
}

