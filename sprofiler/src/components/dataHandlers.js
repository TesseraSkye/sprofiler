import * as deviceConfig from './deviceConfig.json'

// this will be updated with more methods in the scales update

function decodeData (val, name) { // this is still super janky
  const cfg = deviceConfig[name] || {}
  const data = (cfg.decodeFamily === 'uint32' ? val.getUint32(0, cfg.littleEndian) : val) // should prob do this as a switch case ....
  return cfg ? [(cfg.coefficient * data) + cfg.offset, name] : [data, 'default']
}

export { decodeData }
