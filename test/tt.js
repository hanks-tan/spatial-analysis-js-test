(async() =>{
  var its = await import('../src/intersect.js')
  let s = new its.Point(0, 0)
  let e = new its.Point(5, 5)
  let line = new its.Line(s, e)
  let p = new its.Point(0, 0)
  let r = its.pointLineLocation(p, line)
  console.log('拓扑结构', r)
})()