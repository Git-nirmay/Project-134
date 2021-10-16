img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('pinky.jpg');
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detcting Objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;

    }
}
 

function draw() {
    image(video, 0, 0, 400, 400);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:ObjectDetected";
            document.getElementById("Number_Of_Objects").innerHTML = "NUMBER OF OBJECTS ARE:  " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}