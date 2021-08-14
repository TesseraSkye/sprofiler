import * as _deviceConfig from './deviceConfig.json'

const deviceConfig = _deviceConfig.default

// this will be updated with more methods in the scales update

function decodeData (val, name) { // this is still super janky
  // console.error('vals: ' + val + ' ' + name)
  const cfg = deviceConfig[name]
  let data = null
  if (cfg.decodeFamily === 'uint32') {
    data = val.getUint32(cfg.byteOffset || 0, cfg.littleEndian || false)
    data = (cfg.coefficient * data) + cfg.offset
  }
  if (cfg.decodeFamily === 'int16') {
    data = val.getInt16(cfg.byteOffset || 0, cfg.litleEndian || false)
    data = (cfg.coefficient * data) + cfg.offset
  } else { data = val }
  // console.error('data: ' + data)
  const out = (name ? [data, name] : [data, 'default'])
  console.error('decoded data bundle is: ' + out)
  return out
}

export { decodeData }
