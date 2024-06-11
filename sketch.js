var serial_values = [0];
var serial = new Serial();

function setup() {
    let canvas = createCanvas(200, 100);
    canvas.parent("canvasplaceholder");
}

function draw() {
    background(150);

    rectMode(CENTER);
    rect(serial_values[0], height / 2, 20, 20);
}

function gotSerialValues(values) {
    serial_values = values;
}

function keyPressed() {
    if (key == '1') {
        serial.write(1);
    }
    else if (key == '2') {
        serial.write(2);
    }
}