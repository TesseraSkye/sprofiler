#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;


// calibration data [coeficient, offset]
float cal[] = {0.047, 3.0};


#define SERVICE_UUID        "d43d1e53-4fb6-4907-9f4e-1237e5a39971"
#define CHARACTERISTIC_UUID "50739418-766d-46f5-9670-f5ef11392f3b"

uint32_t val;
uint8_t avg = 8; //num averages


class bleCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};



void setup() {
  Serial.begin(115200);

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
  pAdvertising->setMinPreferred(0x0);
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
        uint32_t out = (((val * cal[0]) + cal[1]) /14.5)*1000;
        if (out > 1200) {;
          Serial.println(out);
          pCharacteristic->setValue(out);
          pCharacteristic->notify();
        }
        
        delay(50); // prevents overload
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
