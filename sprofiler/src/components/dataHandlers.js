// data parsing stuffs
// this contains a lut with coeficients and config data

const config = {
  profiler: {
    sprofiler: {
      family: 'profiler',
      coefficient: 0.001, // div 1000
      offset: 0,
      decodeFamily: 'uint32',
      littleEndian: true // default false / big endian
    }
  }
}

// uses a friendly name to lookup the family and name
function getCfg (name) {
  let cfg
  for (const family in config) {
    if (config[family][name]) { cfg = config[family][name]; break }
  }
  if (cfg) { return cfg } else { console.error('Error getting decode config data! (or it"s a bug...)\nCfg val: ' + cfg); return {} }
}

function decodeData (val, name) {
  const cfg = getCfg(name)
  const data = (cfg.decodeFamily === 'uint32' ? val.getUint32(0, cfg.littleEndian) : val) // should prob do this as a switch case ....
  return [(cfg.coefficient * data) + cfg.offset, cfg.family, name]
}

export { decodeData }
