# p5.serial
p5.serial is a simple serial communication library for p5.js, which is using web serial on the backend, and designed to be easy to use and to work with the p5.js library. 

## CDN
```
<script src="https://cdn.jsdelivr.net/gh/TetsuakiBaba/p5.serial/p5.serial.js" type="text/javascript"></script>
```

## Getting Started
## from scratch
https://github.com/TetsuakiBaba/p5.serial/assets/1846131/cf85b8d7-cef6-401d-8b90-3185b5cf8df5

## p5.js editor
  * Single Byte receive(gotByte): https://editor.p5js.org/tetsuakibaba/sketches/EgLpDNrFq
  * Multiple Bytes receive(gotCSV): https://editor.p5js.org/tetsuakibaba/sketches/bMXPV-gvu

## Examples
<!-- getting_started.md へのリンク -->
Please check [ README on getting_started ](./getting_started/README.md) for more example codes.

## DEMO
  * [introduction](https://tetsuakibaba.github.io/p5.serial/)
  * [monitor](https://tetsuakibaba.github.io/p5.serial/monitor.html)
  * [minimal](https://tetsuakibaba.github.io/p5.serial/minimal.html)

## API
### Serial class
> [!TIP]
> Please check <a href="https://tetsuakibaba.github.io/p5.serial/api/Serial.html" target="_blank">API document page</a> for more detailed. 

#### `Serial()`
Create a new Serial object.
```javascript
let serial = new Serial();
```
#### `Serial.begin(baudrate=9600)`
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

