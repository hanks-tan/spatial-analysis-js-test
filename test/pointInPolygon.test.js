var assert = require('assert')
var pip = require('../src/pointInPolygon')
describe('构造多边形', function () {
  let p1 = new pip.Point(1, 1)
  let p2 = new pip.Point(1, 2)
  let p3 = new pip.Point(2, 2)

  it('两个点构造多边形', function() {
    let poly = new pip.Polygon(p1, p2)
    assert.ok(poly.coordinates === undefined, '构造成功')
  })

  it('三点构造多边形', function() {
    let poly = new pip.Polygon(p1, p2, p3)
    let coords = poly.coordinates
    assert.ok(coords !==undefined && coords.length === 4, '构造失败')
  })
})

describe('点与多边形关系', function () {
  let p1 = new pip.Point(0, 0)
  let p2 = new pip.Point(10, 0)
  let p3 = new pip.Point(10, 10)

  it('点在多边形内', function() {
    let p = new pip.Point(5, 4) // 已知内部的点
    let poly = new pip.Polygon(p1, p2, p3)
    let r = pip.pointInPolygon(p, poly)
    assert.ok(r === true, '类型错误')
  })

  it('点在多边形边界上', function() {
    let p = new pip.Point(10, 8) // 已知内部的点
    let poly = new pip.Polygon(p1, p2, p3)
    let r = pip.pointInPolygon(p, poly)
    assert.ok(r === true, '类型错误')
  })

  it('点是多边形的顶点', function() {
    let p = new pip.Point(10, 10) // 已知内部的点
    let poly = new pip.Polygon(p1, p2, p3)
    let r = pip.pointInPolygon(p, poly)
    assert.ok(r === true, '类型错误')
  })

  it('点在多边形外', function() {
    let p = new pip.Point(0, 10) // 已知内部的点
    let poly = new pip.Polygon(p1, p2, p3)
    let r = pip.pointInPolygon(p, poly)
    assert.ok(r === false, '类型错误')
  })
})