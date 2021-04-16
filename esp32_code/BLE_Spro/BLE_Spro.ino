#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

BLEServer* pServer = NULL;
BLECharacteristic* pCharacteristic = NULL;
bool deviceConnected = false;
bool oldDeviceConnected = false;
uint32_t pressure = 0;

byte aPin = A0;

#define SERVICE_UUID "d43d1e53-4fb6-4907-9f4e-1237e5a39971"
#define CHAR_UUID "50739418-766d-46f5-9670-f5ef11392f3b"


class SproCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};



void setup() {
  Serial.begin(115200);

  //ble name
  BLEDevice::init("Sprofiler");

  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new SproCallbacks());

  //create service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // create a new characteristic
  pCharacteristic = pService->createCharacteristic(
                      CHAR_UUID,
                      BLECharacteristic::PROPERTY_READ   |
                      BLECharacteristic::PROPERTY_WRITE
                    );

  pCharacteristic->addDescriptor(new BLE2902());

  pService->start();

  // Begin advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(false);
  pAdvertising->setMinPreferred(0x0);
  BLEDevice::startAdvertising();
  Serial.println("waiting for client..");
}

void loop() {
    if (deviceConnected) {
        pressure = analogRead(aPin);
        Serial.println(pressure);
        pCharacteristic->setValue(pressure);
        delay(25);
    }

    // on disconnection
    if (!deviceConnected && oldDeviceConnected) {
        delay(500);
        pServer->startAdvertising(); // restart advertising
        Serial.println("started advertising");
        oldDeviceConnected = deviceConnected;
    }
    // on connection
    if (deviceConnected && !oldDeviceConnected) {
        // do stuff here on connecting
        oldDeviceConnected = deviceConnected;
    }
}
