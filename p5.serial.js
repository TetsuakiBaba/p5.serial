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
        this.defaultGotCSV = this.gotCSV;
        this.defaultGotByte = this.gotByte;
        this.defaultGotBytes = this.gotBytes;
        this.buffer = "";
    }

    isGotCSVOverridden() {
        return this.gotCSV != this.defaultGotCSV;
    }
    isGotByteOverridden() {
        return this.gotByte != this.defaultGotByte;
    }
    isGotBytesOverridden() {
        return this.gotBytes != this.defaultGotBytes;
    }

    /**
     * Request to open serial port
     * 
     * @async
     * @param {int}[br=9600] br - baud rate
     * 
     */
    async begin(br = 9600) {
        const filters = [
            { usbVendorId: 0x10c4 }, // grove beginner kit for Arduino
            { usbVendorId: 0x2341 }, // ArduinoSA
            { usbVendorId: 0x9025 }, // Marduino
        ];
        console.log("baudrate", br);
        try {
            this.port = await navigator.serial.requestPort({ filters });
            this.portInfo = this.port.getInfo();
            console.log(
                `vendorId: ${this.portInfo.usbVendorId} | productId: ${this.portInfo.usbProductId} `
            );
            await this.port.open({ baudRate: br });


            this.is_opened = true;
            this.buffer = "";
            while (this.port.readable && this.is_opened) {
                const reader = this.port.readable.getReader();
                try {
                    while (true) {
                        const { value, done } = await reader.read();
                        // gotCSVがオーバーライドされている場合は、改行が来るまでバッファにためる
                        // If gotCSV is overridden, buffer the data until a line feed comes.
                        if (this.isGotCSVOverridden()) {
                            // 新しいデータをデコードしてバッファに追加
                            this.buffer += new TextDecoder().decode(value);

                            // バッファ内に改行が含まれているか確認
                            if (this.buffer.includes("\n")) {

                                // '\r'を削除
                                this.buffer = this.buffer.replace("\r", "");
                                // 改行でバッファを分割
                                const lines = this.buffer.split("\n");

                                // 最後の要素をバッファに保持（不完全な行の可能性があるため）
                                this.buffer = lines.pop();

                                // 各行を処理
                                // 各行を処理
                                for (let line of lines) {
                                    // カンマ区切りの文字列を配列に変換して渡す
                                    const csvArray = line.split(",");
                                    this.gotCSV(csvArray);
                                }
                            }
                        }


                        if (this.isGotByteOverridden()) {
                            for (let v of value) {
                                this.gotByte(v);
                            }
                        }


                        if (this.isGotBytesOverridden()) {
                            this.gotBytes(value);
                        }


                        if (this.is_opened == false) break;
                    }
                } catch (error) {
                    // Handle |error|...
                    console.log(error);
                    this.is_opened = false;
                } finally {
                    reader.releaseLock();
                }

            }
            this.port.close();
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
        if (this.is_opened == false) return;
        const writer = this.port.writable.getWriter();
        await writer.write(new Int8Array([value]));
        writer.releaseLock();
    }

    /**
     * 
     * @param {int} value 
     */
    async writeByte(value) {
        if (this.is_opened == false) return;
        const writer = this.port.writable.getWriter();
        await writer.write(new Int8Array([value]));
        writer.releaseLock();
    }

    async writeBytes(values) {
        if (this.is_opened == false) return;
        const writer = this.port.writable.getWriter();
        await writer.write(new Int8Array(values));
        writer.releaseLock();
    }


    async writeCSV(string) {
        if (this.is_opened == false) return;

        // もし文字列が空であれば何もしない
        if (string === "") {
            return;
        }
        // もし最後が改行でない場合は改行を追加する
        if (string.charAt(string.length - 1) !== "\n") {
            string += "\n";
            console.warn("added '\n'. because the last character is not '\n'.");
        }

        const writer = this.port.writable.getWriter();
        await writer.write(new TextEncoder().encode(string));
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

    /**
     * Close serial port
     * 
     * @async
     */
    async close() {
        this.is_opened = false;
    }
    async read() { } // better to avoid using this method for arduino and p5 bigginers because it is a bit complicated to handle by themselves. Use callback function instead.

    /**
     * This method is called when a single value is received.
     * @param {int} value 
     */
    gotByte(value) {
    }

    /**
     * This method is called when multiple values are received.
     * @param {array} values 
     */
    gotBytes(values) {
    }

    /**
     * This method is called when a CSV string is received.
     * @param {array} array 
     */
    gotCSV(array) {
    }
}
