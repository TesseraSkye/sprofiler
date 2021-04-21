import { BleClient } from '@capacitor-community/bluetooth-le'

const sproService = 'd43d1e53-4fb6-4907-9f4e-1237e5a39971'
const pressureChar = '50739418-766d-46f5-9670-f5ef11392f3b'

export async function main (): Promise<void> {
  try {
    await BleClient.initialize()

    const device = await BleClient.requestDevice({
      services: [sproService],
      optionalServices: [pressureChar]
    })

    await BleClient.connect(device.deviceId)
    console.log('connected to device', device)

    const result = await BleClient.read(
      device.deviceId,
      sproService,
      pressureChar
    )

    console.log(result)

    await BleClient.startNotifications(
      device.deviceId,
      sproService,
      pressureChar,
      value => {
        console.log('current pressure', console.log(value))
      }
    )

    setTimeout(async () => {
      await BleClient.stopNotifications(
        device.deviceId,
        sproService,
        pressureChar
      )
      await BleClient.disconnect(device.deviceId)
      console.log('disconnected from device', device)
    }, 10000)
  } catch (error) {
    console.error(error)
  }
}
