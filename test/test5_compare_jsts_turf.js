const turf = require('@turf/turf')
const jsts = require('jsts');

function testJsts (count) {
  const reader = new jsts.io.WKTReader()
  const jstsPolygon = reader.read('POLYGON ((1 1, 35 1, 35 84, 1 84, 1 1))')
  let jstsPoints = []
  
  let i = 0
  while (i < count) {
    let x = Math.random() * 100
    let y = Math.random() * 100
    var jstsPoint = reader.read(`POINT (${x} ${y})`)
    jstsPoints.push(jstsPoint)
    i++
  }

  const time1 = new Date().getTime()
  jstsPoints.forEach((p) => {
    var r = jsts.operation.relate.RelateOp.contains(jstsPolygon, p)
  })
  const time2 = new Date().getTime()
  console.log(`jsts test done, ${time2 - time1}ms`)
}

function testTurf (count) {
  const turfPoints = []
  const polygon = turf.polygon([[
    [1, 1],
    [35, 1],
    [35, 84],
    [1, 84],
    [1, 1]
  ]])
  
  let i = 0
  while (i < count) {
    let x = Math.random() * 100
    let y = Math.random() * 100
    turfPoints.push(turf.point([x, y]))
    i++
  }
  const time1 = new Date().getTime()
  turfPoints.forEach((p) => {
    turf.booleanContains(polygon, p)
  })
  const time2 = new Date().getTime()
  console.log(`turf test done, ${time2 - time1}ms`)
}

// const loop = [10000, 1000000, 10000000]
// // test jsts
// loop.forEach((n) => {
//   testJsts(n)
// })

// // test turf
// loop.forEach((n) => {
//   testTurf(n)
// })

testTurf(10000000)
// testJsts(10000000)