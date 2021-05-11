var assert = require('assert')
var its = require('../src/intersect')

let p = new its.Point(1, 1)
let s = new its.Point(0, 0)
let e = new its.Point(5, 5)
let line = new its.Line(s, e)

let ss = new its.Point(0, 12)
let ee = new its.Point (4, 0)
let line2 = new its.Line(ss, ee)

describe('相交测试', ()=> {
  it('', () => {
    let r = its.pointLineLocation(p, line)
    console.log(r)
    assert.ok(r === 0, '值异常')
  })
})

// console.log(r)

// r = its.intersection(line, line2)
// console.log(r)

// r = its.intersect(line, line2)
// console.log(r)

// r = its.SegmentIntersection(line, line2)
// console.log(r)