/**
    * @file arduino.ino
    * @brief This is the sample file for the Arduino code and p5.serial.js
    * @author  Tetsuaki BABA
    * @date 2024/06/11
    
    * The Arduino will send a number from 0 to 100 to your PC
    * The Arduino will also receive a number from your PC. If the number is 1, the Arduino will turn on the LED. If the number is 2, the Arduino will turn off the LED.
 */
void setup() {    
  Serial.begin(9600);
  pinMode(4, OUTPUT);
}
int count = 0;
void loop() {
  Serial.write(count);
  delay(100);
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