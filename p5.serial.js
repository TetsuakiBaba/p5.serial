// --------------------------------------------
//  Serial class for Arduino by Tetsuaki Baba (C)2022-2024
// --------------------------------------------

// Arduino CODE ------------------------------------
/*
void setup() {
  Serial.begin(9600);
  pinMode(4, OUTPUT);
}
int count = 0;
void loop() {
  Serial.write(count);
  delay(1000);
  count++;
  if ( count > 100 )count = 0;

  if( Serial.available() > 0 ){
    int value = Serial.read();
    if( value == 1){
       digitalWrite(4, HIGH);
    }
    else if( value == 2){
      digitalWrite(4, LOW);
    }
  }
}
*/


/**
 * web serial class for p5.js
 * 
 * @class Serial
 * @constructor
 * 
 */
class Serial {
    /**
     * Creates an instance of Serial.
     */
    constructor() {
        this.is_opened = false;
    }

    /**
     * Request to open serial port
     * 
     * @async
     * @method begin
     * 
     */
    async begin() {
        const filters = [
            { usbVendorId: 0x10c4 }, // grove beginner kit for Arduino
            { usbVendorId: 0x2341 }, // ArduinoSA
            { usbVendorId: 0x9025 }, // Marduino
        ];

        try {
            this.port = await navigator.serial.requestPort({ filters });
            this.portInfo = this.port.getInfo();
            await this.port.open({ baudRate: 9600 });
            console.log(
                `vendorId: ${this.portInfo.usbVendorId} | productId: ${this.portInfo.usbProductId} `
            );
            this.is_opened = true;

            while (this.port.readable) {
                //console.log(port.readable);
                const reader = this.port.readable.getReader();
                try {
                    while (true) {
                        const { value, done } = await reader.read();
                        // Here we get serial value(value) from your arduino .
                        gotSerialValues(value);
                    }
                } catch (error) {
                    // Handle |error|...
                    this.is_opened = false;
                } finally {
                    reader.releaseLock();
                }
            }
        } catch (ex) {
            if (ex.name === "NotFoundError") {
                console.log("Device NOT found");
                this.is_opended = false;
            } else {
                console.log(ex);
            }
        }
    }

    /**
     * 
     * @param {int} value 
     */
    async write(value) {
        const writer = this.port.writable.getWriter();
        await writer.write(new Int8Array([value]));
        writer.releaseLock();
    }

    /**
     * 
     * @param {string} values 
     */
    async print(values) {
        const encoder = new TextEncoder();
        const writer = this.port.writable.getWriter();
        await writer.write(encoder.encode(values));
        writer.releaseLock();
    }

    /**
     * 
     * @param {string} values 
     */
    async println(values) {
        const encoder = new TextEncoder();
        const writer = this.port.writable.getWriter();
        await writer.write(encoder.encode(values + "\n"));
        writer.releaseLock();
    }
    async read() { } // better to avoid using this method for arduino and p5 bigginers because it is a bit complicated to handle by themselves. Use callback function instead.
}