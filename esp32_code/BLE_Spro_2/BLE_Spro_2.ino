#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer* sproServer = NULL;
BLECharacteristic* sproCharacteristic = NULL;
bool isConnected = false;


// calibration data [coeficient, offset]
float cal[] = {0.156,3.04};


#define SERVICE_UUID        "d43d1e53-4fb6-4907-9f4e-1237e5a39971"
#define CHARACTERISTIC_UUID "50739418-766d-46f5-9670-f5ef11392f3b"

uint16_t val;
uint8_t avg = 4; //num averages


class bleCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      isConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      isConnected = false;
    }
};



void setup() {
  Serial.begin(115200);

  BLEDevice::init("ESP32");

  sproServer = BLEDevice::createServer();
  sproServer->setCallbacks(new bleCallbacks());

  // Create the BLE Service
  BLEService *sproService = sproServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  sproCharacteristic = sproService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE  |
                      BLECharacteristic::PROPERTY_NOTIFY |
                      BLECharacteristic::PROPERTY_INDICATE
                    );

  sproCharacteristic->addDescriptor(new BLE2902());

  // Start the service
  sproService->start();

  // Start advertising
  BLEAdvertising *sproAdvertising = BLEDevice::getAdvertising();
  sproAdvertising->addServiceUUID(SERVICE_UUID);
  sproAdvertising->setScanResponse(false);
  sproAdvertising->setMinPreferred(0x0);
  BLEDevice::startAdvertising();
  Serial.println("Awaiting connection...");
}

void loop() {
    val = 0;
    if (isConnected) {
        for(uint8_t i = 0; i < avg; i++) {
          val =+ analogRead(A0);
          delay(100 / avg);
        }
        val = val / avg;
        // regression fit, div psi / bar
        float out = ((val * cal[0]) + cal[1]) / 14.5;
        if (out > 0.96) {
          uint16_t outTC = out * 100;
          Serial.println(outTC);
          sproCharacteristic->setValue(outTC);
          sproCharacteristic->notify();
        }
        
        delay(20); // prevents overload
    }
    // disconnecting
    if (!isConnected) {
        delay(500);
        sproServer->startAdvertising();
        Serial.println("start advertising");
    }
}
