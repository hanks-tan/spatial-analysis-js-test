const its = require('./intersect')

class Point{
  /**
   * 点构造函数
   * @param {Number} x 
   * @param {Number} y 
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Polygon {
  constructor() {
    if (arguments.length < 3) {
      // throw('参数个数必须大于2')
      return
    }
    const polygon = []
    let len = arguments.length
    for(let i = 0; i < len; i++) {
      if (arguments[i] instanceof Point) {
        polygon.push(arguments[i])
      }
    }
    if (polygon.length < 3) {
      // throw('构造多边形失败')
      return
    }
    // 强制闭合
    if (polygon[len-1] !== polygon[0]) {
      polygon.push(polygon[0])
    }
    this.coordinates = polygon
  }
}

/**
 * 点在线上 （射线法）
 * @param {Point} point 
 * @param {Polygon} polygon 
 * @returns {Boolean} 真,在多边形内；否则多边形外
 */
function pointInPolygon (point, polygon) {
  let cross = 0
  let coordinates = polygon.coordinates
  let pointCount = coordinates.length - 1
  for (let i = 0; i < pointCount; i++) {
    let p1 = coordinates[i]
    let p2 = coordinates[(i + 1) % pointCount]

    if (p1.y === p2.y) continue // p1p2与 y=point.y平行
    if (point.y < Math.min(p1.y, p2.y)) { // 交点在p1p2延长线上
      continue
    }
    let line = new its.Line(p1, p2)
    // 点在多边形的边上
    if (its.pointInLine(point, line)) {
      return true
    }
    if (p1.y >= Math.max(p1.y, p2.y)) { // 交点在p1p2延长线上
      continue
    }
    let x = (point.y - p1.y) * (p2.x - p2.x) / (p2.y - p1.y) + p1.x

    if (x > point.x) {
      cross++
    }
  }
  // 交点数为奇数则点在多边形内
  return cross % 2 === 1
}

module.exports = {
  Point,
  Polygon,
  pointInPolygon
}