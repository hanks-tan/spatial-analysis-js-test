var assert = require('assert')
var its = require('../src/intersect')

let s = new its.Point(0, 0)
let e = new its.Point(5, 5)
let line = new its.Line(s, e)

describe('相交测试', ()=> {
  describe('点在线上', function ()  {
    it('点在线的端点上', function() {
      let p = new its.Point(0, 0)
      let r = its.pointLineLocation(p, line)
      assert.ok(r === 0, '')
    })

    it('点在线段内', function() {
      let p = new its.Point(1, 1)
      let r = its.pointLineLocation(p, line)
      assert.ok(r === 0, '')
    })

    it('点在线段延长线上', function() {
      let p = new its.Point(6, 6)
      let r = its.pointLineLocation(p, line)
      assert.ok(r === 0, '')
    })

    it('点不在线段上', function() {
      let p = new its.Point(7, 8)
      let r = its.pointLineLocation(p, line)
      assert.ok(r > 0 || r < 0, '')
    })
  })

  describe('线相交测试', function () {
    describe('线与线相交', function () {
      let ss = new its.Point(0, 12)
      let ee = new its.Point (4, 0)
      let testLine = new its.Line(ss, ee)
      it('快速排斥、跨立算法', function () {
        r = its.intersect(line, testLine)
        assert.ok(r === true, '')
      })
      it('参数方程算法', function () {
        r = its.intersection(line, testLine)
        assert.ok(r === true, '')
      })
      it('凸多边形算法', function () {
        r = its.segmentIntersection(line, testLine)
        assert.ok(r === true, '')
      })
    })
  
    describe('线与线平行', function () {
      let ss = new its.Point(1, 0)
      let ee = new its.Point (6, 5)
      let testLine = new its.Line(ss, ee)
      it('快速排斥、跨立算法', function () {
        r = its.intersect(line, testLine)
        assert.ok(r === false, '')
      })
      it('参数方程算法', function () {
        r = its.intersection(line, testLine)
        assert.ok(r === false, '')
      })
      it('凸多边形算法', function () {
        r = its.segmentIntersection(line, testLine)
        assert.ok(r === false, '')
      })
    })

    describe('线线首尾相连', function () {
      let ss = new its.Point(5, 5)
      let ee = new its.Point (6, 5)
      let testLine = new its.Line(ss, ee)
      it('快速排斥、跨立算法', function () {
        r = its.intersect(line, testLine)
        assert.ok(r === true, '')
      })
      it('参数方程算法', function () {
        r = its.intersection(line, testLine)
        assert.ok(r === true, '')
      })
      it('凸多边形算法', function () {
        r = its.segmentIntersection(line, testLine)
        assert.ok(r === true, '')
      })
    })

    describe('线线断开直线延申', function () {
      let ss = new its.Point(7, 7)
      let ee = new its.Point (10, 10)
      let testLine = new its.Line(ss, ee)
      it('快速排斥、跨立算法', function () {
        r = its.intersect(line, testLine)
        assert.ok(r === false, '')
      })
      it('参数方程算法', function () {
        r = its.intersection(line, testLine)
        assert.ok(r === false, '')
      })
      it('凸多边形算法', function () {
        r = its.segmentIntersection(line, testLine)
        assert.ok(r === false, '')
      })
    })

    describe('线线不相交', function () {
      let ss = new its.Point(7, 7)
      let ee = new its.Point (7, 10)
      let testLine = new its.Line(ss, ee)
      it('快速排斥、跨立算法', function () {
        r = its.intersect(line, testLine)
        assert.ok(r === false, '')
      })
      it('参数方程算法', function () {
        r = its.intersection(line, testLine)
        assert.ok(r === false, '')
      })
      it('凸多边形算法', function () {
        r = its.segmentIntersection(line, testLine)
        assert.ok(r === false, '')
      })
    })
  })
})