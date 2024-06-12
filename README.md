# p5.serial
p5.serial is a simple serial communication library for p5.js, which is using web serial on the backend, and designed to be easy to use and to work with the p5.js library. 

> [!CAUTION]
> This repository is currently under construction and may be frequently updated.

## CDN
```
<script src="https://cdn.jsdelivr.net/gh/TetsuakiBaba/p5.serial.js/p5.serial.js" type="text/javascript"></script>
```
## Getting Started from scratch
<div>
    <a href="https://www.loom.com/share/fa1db0134ec54e43a4b32b4eec9a8c86">
      <p>p5.serial Getting Started - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/fa1db0134ec54e43a4b32b4eec9a8c86">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/fa1db0134ec54e43a4b32b4eec9a8c86-with-play.gif">
    </a>
  </div>

## Getting Started with p5.js editor
  * Single Byte receive: https://editor.p5js.org/tetsuakibaba/sketches/EgLpDNrFq
  * Multiple Bytes receive: https://editor.p5js.org/tetsuakibaba/sketches/bMXPV-gvu



## API
### Serial class
> [!TIP]
> We recommend using the `gotCSV()` function when you want to receive multiple values at once.

#### `Serial()`
Create a new Serial object.
```javascript
let serial = new Serial();
```
#### `Serial.begin()`
Open the serial port.
```javascript
serial.begin();
```

#### `Serial.close()`
Close the serial port.
```javascript
serial.close();
```

#### `Serial.gotByte()`
This function is called when a byte is received.
```javascript
serial.gotByte = function(value) {
    console.log(value);
}
```

#### `Serial.gotBytes()`
This function is called when bytes are received.
```javascript
serial.gotBytes = function(values) {
    console.log(values);
}
```

#### `Serial.gotCSV()`
This function is called when a CSV string is received. We recommend using this function when you want to receive multiple values at once.

```javascript
serial.gotCSV = function(values) {
    // if you send println('hello,world') from arduino, values is an array of number. ex) ['hello', 'world']    
    for( v of values){
        console.log(v); // hello, world
    }
}
```

#### `Serial.writeByte()`
Write a byte to the serial port.
```javascript
serial.writeByte(0x01);
```

#### `Serial.writeBytes()`
Write bytes to the serial port.
```javascript
serial.writeBytes([0x01, 0x02, 0x03]);
```

#### `Serial.writeCSV()`
Write a CSV string to the serial port. We recommend using this function when you want to send multiple values at once.
```javascript
serial.writeCSV('hello,world'); // send arduino "hello,world\n"
```

## for Developers

### How to update API documentation
```bash
npm run generate-docs
```

