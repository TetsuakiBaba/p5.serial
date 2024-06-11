# p5.serial
p5.serial is a simple serial communication library for p5.js, which is using web serial on the backend, and designed to be easy to use and to work with the p5.js library. 

## CDN
```
<script src="https://cdn.jsdelivr.net/gh/TetsuakiBaba/p5.serial.js/p5.serial.js" type="text/javascript"></script>
```

## Usage
```javascript sketch.js
let serial = Serial();
let val = 0;
function setup() {
  createCanvas(400, 400);
  document.querySelector('#button_connect").addEventListener('click', () => {
    serial.connect();
  });
}
function draw(){
    background(220);
    text(`Hello, p5.serial: ${val}`, 100, 100);
    serial.gotSerialValue = function (value) {
        val = value;
    }
}

```html index.html
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

