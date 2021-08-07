
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;


// calibration data [coeficient, offset]
//float cal[] = {0.047, 3.0};

byte enablePin = A1;


#define SERVICE_UUID        "0000FAFF-0000-1000-8000-00805F9B34FB"
#define CHARACTERISTIC_UUID "0000FA01-0000-1000-8000-00805F9B34FB"
uint8_t lowLimit = 200;

uint32_t val;
uint8_t avg = 8; //num averages


class bleCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
//      digitalWrite(enablePin, HIGH); // Enables boost converter and pressure transducer
      
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      delay(10000);
//      if (deviceConnected == false) { digitalWrite(enablePin, LOW); }; // dissables boost and sensor if it's been DC'd for over a minute
    }
};




void setup() {
  Serial.begin(115200);

  pinMode(enablePin, OUTPUT);
  BLEDevice::init("Sprofiler");

  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new bleCallbacks());

  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );

  pCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  pService->start();

  // Start advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Awaiting connection...");
  
}

void loop() {
  val = 0;
    if (deviceConnected) {
        for(uint8_t i = 0; i < avg; i++) {
          val += analogRead(A0);
          delay(100 / avg);
        }

        val = val / avg;
//        Serial.println(analogRead(A0));
//        Serial.println(val);
        
        // regression fit, div psi / bar
        val = constrain(val, lowLimit, 4095);
        uint32_t out = ((((val - lowLimit) * 1.3) * 2.44) * 1000) / 14.5;
        Serial.println(val);
        if (out > 1200) {;
          pCharacteristic->setValue(out);
          pCharacteristic->notify();
        }
        
        delay(100); // prevents overload
    }
    // disconnecting
    // disconnecting
    if (!deviceConnected && oldDeviceConnected) {
        delay(500); // give the bluetooth stack the chance to get things ready
        pServer->startAdvertising(); // restart advertising
        Serial.println("start advertising");
        oldDeviceConnected = deviceConnected;
        
    }
    // connecting
    if (deviceConnected && !oldDeviceConnected) {
        // do stuff here on connecting
        oldDeviceConnected = deviceConnected;
    }
    
}
