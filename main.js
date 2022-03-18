objects = [];
statuS = "";

function setup()
{
    canvas = createCanvas(480, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
    object = document.getElementById("status_surity").value;
}

function modelLoaded()
{
    console.log("Model Loaded !!!");
    statuS = true;
}

function draw()
{
    image(video, 0, 0, 480, 480);

    if(statuS != "")
    {
        if ("object_name" == objects)
        {
            objectDetector.detect(gotResults);
        }
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}