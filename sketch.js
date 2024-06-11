var x = 0;
var serial = new Serial();

function setup() {
    let canvas = createCanvas(200, 100);
    canvas.parent("canvasplaceholder");

    serial.gotSerialValue = function (value) {
        x = value;
    }
}

function draw() {
    background(150);
    rectMode(CENTER);
    rect(x, height / 2, 20, 20);
}

function keyPressed() {
    if (key == '1') {
        serial.write(1);
    }
    else if (key == '2') {
        serial.write(2);
    }
}