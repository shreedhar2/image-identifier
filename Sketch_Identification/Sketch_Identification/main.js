function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(400, 400);
    //canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

function draw() {
    strokeWeight(10);
    stroke('#ff99ff')
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}