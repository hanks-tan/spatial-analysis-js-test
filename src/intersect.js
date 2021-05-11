// 参考：https://blog.csdn.net/summer_dew/article/details/82284311
// 判断线段是否相交算法

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

class Line{
  /**
   * 线段构造函数
   * @param {Point} p1 
   * @param {Point} p2 
   */
  constructor(p1, p2) {
    this.a = p1
    this.b = p1
  }
}

/**
 * 判断线和点的位置关系
 * @param {Point} point 
 * @param {Line} line 
 * @returns {Number} > 0 即point在line的顺时针方向下方；< 0 则point在line的逆时针方向上方；= 0则在线上
 */
function pointLineLocation (point, line) {
  let ab_x = line.a.x - line.b.x
  let ab_y = line.a.y - line.b.y
  let ac_x = line.a.x - point.x
  let ac_y = line.a.x - point.y
  return ab_x * ac_y - ab_y * ac_x
}

// ---------------------------------------算法1 快速排斥 + 跨立实现-------------------

/**
 * 
 * @param {Line} line1 
 * @param {Line} line2 
 * @returns {0 | 1} 返回值 0 不相交；1 相交
 */
function intersection (line1, line2) {
  if (Math.max(line1.a.x, line1.b.x) < Math.min(line2.a.x, line2.b.x)) return 0;
  if (Math.max(line1.a.y, line1.b.y) < Math.min(line2.a.y, line2.b.y)) return 0;
  if (Math.max(line2.a.x, line1.b.x) < Math.min(line1.a.x, line1.b.x)) return 0;
  if (Math.max(line2.a.y, line1.b.y) < Math.min(line1.a.y, line1.b.y)) return 0;

  // line1的两个端点都再line1同侧
  if (pointLineLocation(line1.a, line2) * pointLineLocation(line1.b, line2) > 0) {
    return 0
  }
  // line2的两个端点都在line1同侧
  if (pointLineLocation(line2.a, line1) * pointLineLocation(line2.b, line1) > 0) {
    return 0
  }
  return 1

}

// ---------------------------------------算法2 参数方程求解-------------------
/**
 * 判断两个线段是否相交
 * @param {Line} line1 
 * @param {Line} line2 
 * @returns true 相交；false 不相交
 */
function intersect(line1, line2) {
  let deno = (line1.b.x - line1.a.x) * (line2.b.y - line2.a.y) - (line1.b.y - line1.a.y) * (line2.b.x - line2.a.x)
  let mem1 = (line1.a.y - line2.a.y) * (line2.b.x - line2.a.x) - (line1.a.x - line2.a.x) * (line2.b.y - line2.a.y)
  let mem2 = (line1.a.y - line2.a.y) * (line1.b.x - line1.a.x) - (line1.a.x - line2.a.x) * (line1.b.y - line1.a.y)
  let r = mem1 / deno
  let s = mem2 / deno
  if (r > 1 || r < 0) return false
  if (s > 1 || s < 0) return false
  return true
}

// ---------------------------------------算法3 凸多边形-------------------
class Vector{
  /**
   * 向量构造函数
   * @param {Number} x 
   * @param {Number} y 
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

/**
 * 两点构造一个向量
 * @param {Point} point1 
 * @param {Point} point2 
 * @returns {Vector}
 */
function VectorConstruct(point1, point2) {
  let x = point2.x - point1.x
  let y = point2.y - point1.y
  return new Vector({
    x,
    y
  })
}

/**
 * 向量的叉积
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * @returns 
 */
function CrossProduct (vector1, vector2) {
  return vector1.x * vector2.y - vector2.x * vector1.y
}

/**
 * 判断两线段(线段AB和CD)是否相交，是返回1，否0
 * 判断四边形ACBD是否是一个凸四边形
 * @param {Line} line1 
 * @param {Line} line2 
 * @returns 
 */
function SegmentIntersection (line1, line2) {
  let ac = VectorConstruct(line1.a, line2.a)
  let cb = VectorConstruct(line2.a, line1.b)
  let bd = VectorConstruct(line1.b, line2.b)
  let da = VectorConstruct(line2.b, line1.a)

  let c = new Array(4)
  c[1] = CrossProduct(ac, cb)
  c[2] = CrossProduct(cb, bd)
  c[3] = CrossProduct(bd, da)
  c[4] = CrossProduct(da, ac)

  let f1 = 0, f2 = 0
  // 计算正负数的个数
  for(let i = 0; i < 4; i++) {
    if (c[i] > 0) f1++
    if (c[i] < 0) f2++
  }

  if (f1 >0 && f2 > 0) { // 有正有负，则无交集
    return 0
  } else {
    return 1
  }
}

module.exports = {
  Point,
  Line,
  Vector,
  pointLineLocation,
  intersect,
  intersection,
  SegmentIntersection
}