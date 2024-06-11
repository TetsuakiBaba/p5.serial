# p5.serial
p5.serial is a simple serial communication library for p5.js, which is using web serial on the backend, and designed to be easy to use and to work with the p5.js library. 

> [!CAUTION]
> This repository is currently under construction and may be frequently updated.

## CDN
```
<script src="https://cdn.jsdelivr.net/gh/TetsuakiBaba/p5.serial.js/p5.serial.js" type="text/javascript"></script>
```

## Getting started with p5.js editor
  * https://editor.p5js.org/tetsuakibaba/sketches/EgLpDNrFq

## Getting Started

### minimal style
[DEMO page](https://tetsuakibaba.github.io/p5.serial/samples/minimal.html)

`index.html`
```html:index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
</head>
<body>
    <main>
        <button onclick="mystart()">connect</button><br>
        <p>
            Serial value:
            <span id="serial_value"></span>
        </p>
    </main>
    <script src="../p5.serial.js" type="text/javascript"></script>
    <script>
        let serial = new Serial();
        function mystart() {
            serial.begin();
            serial.gotByte = function (value) {
                document.querySelector('#serial_value').textContent = value;
            }
        }
    </script>
</body>
</html>
```

### p5.js style
`sketch.js`
```javascript:sketch.js
let serial = Serial();
let val = 0;
function setup() {
  createCanvas(400, 400);
  document.querySelector('#button_connect").addEventListener('click', () => {
    serial.begin();
  });
}
function draw(){
    background(220);
    text(`Hello, p5.serial: ${val}`, 100, 100);
    serial.gotByte = function (value) {
        val = value;
    }
}
```

`index.html`
```html:index.html
<!DOCTYPE html>
<html lang="en">
  <head>    
    <link rel="stylesheet" type="text/css" href="style.css" />
    <meta charset="utf-8" />
  </head>
  <body>
    <main>
      <button onclick="serial.begin();">connect</button>
    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/TetsuakiBaba/p5.serial.js/p5.serial.js" type="text/javascript"></script>
    <script src="sketch.js"></script>
  </body>
</html>
```



## for Developers

### How to update API documentation
```bash
npm run generate-docs
```

