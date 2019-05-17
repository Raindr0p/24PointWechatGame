var binding = require("./libs/Binding.js")
var Point24 = require("./libs/24.js")
let ctx = canvas.getContext('2d')
var screenWidth = window.innerWidth
var screenHeight = window.innerHeight
canvas.width = canvas.width * window.devicePixelRatio
canvas.height = canvas.height * window.devicePixelRatio
ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
if (canvas.width / canvas.height > 0.58 || canvas.width / canvas.height < 0.54) {
  screenHeight -= 140
}

let touchStartEvent = false


/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.aniId = 0
    this.draw()
  }
  draw() {
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    const bg = wx.createImage()
    bg.src = "bg.png"
    bg.onload = function () {
      ctx.drawImage(
        bg,
        0,
        0,
        screenWidth,
        screenHeight
      )

      roundRect(ctx, screenWidth / 3, screenWidth / 3, screenWidth / 3, screenWidth / 3, 10, '#FFF386')
      roundRect(ctx, 0.3 * screenWidth, screenHeight / 1.7, screenWidth / 2.5, screenWidth / 8, 20, '#FFFFFF')
      ctx.fillStyle = "#ffffff"
      ctx.font = "70px Arial"
      ctx.fillText(
        '24',
        screenWidth / 2 - 40,
        screenHeight / 3.1
      )
      ctx.fillStyle = "#000000"
      ctx.font = "20px YaHei"
      ctx.fillText(
        '开始游戏',
        screenWidth / 2 - 40,
        screenHeight / 1.58
      )
      ctx.font = "14px Arial"
      // ctx.fillText(
      //   '排行榜 >',
      //   screenWidth / 2 - 40,
      //   screenHeight / 1.7 + 80
      // )
      // ctx.fillText(
      //   '消息 >',
      //   screenWidth / 2 - 40,
      //   screenHeight / 1.7 + 110
      // )
    }
    this.touchHandler = this.touchListenStart.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)
  }
  touchListenStart(e) {
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let startBtnArea = {
      startX: screenWidth / 2 - 70,
      startY: screenHeight / 1.7,
      endX: screenWidth / 2 + 70,
      endY: screenHeight / 1.7 + 50
    }

    if (x >= startBtnArea.startX &&
      x <= startBtnArea.endX &&
      y >= startBtnArea.startY &&
      y <= startBtnArea.endY) {
      this.game()
    }
  }
  game() {
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    this.num = this.refresh()
    this.count = 0
    this.expr = ''
    this.time = 300
    this.score = 0
    this.hintChance = 3
    this.charLength = []
    this.lengthI = []
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    this.int = setInterval(() => { this.render() }, 100)
  }
  touchListenEvent(e) {
    console.log(e.changedTouches);
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let startBtnArea = {
      startX: 0.4 * screenWidth,
      startY: screenWidth / 0.72,
      endX: 0.6 * screenWidth,
      endY: screenWidth / 0.72 + screenWidth / 6.8
    }
    let hintBtnArea = {
      startX: 0.1 * screenWidth,
      startY: screenWidth / 0.72,
      endX: 0.3 * screenWidth,
      endY: screenWidth / 0.72 + screenWidth / 6.8
    }
    let clearBtnArea = {
      startX: 0.7 * screenWidth,
      startY: screenWidth / 0.72,
      endX: 0.9 * screenWidth,
      endY: screenWidth / 0.72 + screenWidth / 6.8
    }
    let blockA = {
      startX: screenWidth / 6,
      startY: screenWidth / 1.95,
      endX: screenWidth / 6 + 7 * screenWidth / 24,
      endY: screenWidth / 1.95 + 11 * screenWidth / 36
    }
    let blockB = {
      startX: 19 * screenWidth / 36,
      startY: screenWidth / 1.95,
      endX: 19 * screenWidth / 36 + 7 * screenWidth / 24,
      endY: screenWidth / 1.95 + 11 * screenWidth / 36
    }
    let blockC = {
      startX: screenWidth / 6,
      startY: screenWidth / 1.17,
      endX: screenWidth / 6 + 7 * screenWidth / 24,
      endY: screenWidth / 1.17 + 11 * screenWidth / 36
    }
    let blockD = {
      startX: 19 * screenWidth / 36,
      startY: screenWidth / 1.17,
      endX: 19 * screenWidth / 36 + 7 * screenWidth / 24,
      endY: screenWidth / 1.17 + 11 * screenWidth / 36
    }
    let plus = {
      startX: screenWidth / 2 - 110,
      startY: screenHeight / 1.35 - screenWidth / 14,
      endX: screenWidth / 2 - 110 + screenWidth / 14,
      endY: screenHeight / 1.35
    }
    let sub = {
      startX: screenWidth / 2 - 80,
      startY: screenHeight / 1.35 - screenWidth / 14,
      endX: screenWidth / 2 - 80 + screenWidth / 14,
      endY: screenHeight / 1.35
    }
    let mul = {
      startX: screenWidth / 2 - 30,
      startY: screenHeight / 1.35 - screenWidth / 14,
      endX: screenWidth / 2 - 30 + screenWidth / 14,
      endY: screenHeight / 1.35
    }
    let div = {
      startX: screenWidth / 2 + 15,
      startY: screenHeight / 1.35 - screenWidth / 14,
      endX: screenWidth / 2 + 15 + screenWidth / 14,
      endY: screenHeight / 1.35
    }
    let lp = {
      startX: screenWidth / 2 + 50,
      startY: screenHeight / 1.35 - screenWidth / 14,
      endX: screenWidth / 2 + 50 + screenWidth / 14,
      endY: screenHeight / 1.35
    }
    let rp = {
      startX: screenWidth / 2 + 90,
      startY: screenHeight / 1.35 - screenWidth / 14,
      endX: screenWidth / 2 + 90 + screenWidth / 14,
      endY: screenHeight / 1.35
    }
    if (x >= hintBtnArea.startX &&
      x <= hintBtnArea.endX &&
      y >= hintBtnArea.startY &&
      y <= hintBtnArea.endY && this.hintChance > 0) {
      this.hintChance -= 1
      this.expr = Point24.D24(this.num[0], this.num[1], this.num[2], this.num[3])[1]
      this.expr = this.expr.substring(0, this.expr.length - 2)
    }
    if (x >= startBtnArea.startX &&
      x <= startBtnArea.endX &&
      y >= startBtnArea.startY &&
      y <= startBtnArea.endY) {
      clearInterval(this.int)
      this.draw()
    }
    if (x >= clearBtnArea.startX &&
      x <= clearBtnArea.endX &&
      y >= clearBtnArea.startY &&
      y <= clearBtnArea.endY) {
      this.expr = this.expr.substring(0, this.expr.length - this.charLength[this.lengthI])//确保退格时长度正确
      console.log(this.charLength[this.lengthI])
      this.lengthI -= 1

    }
    if (x >= blockA.startX &&
      x <= blockA.endX &&
      y >= blockA.startY &&
      y <= blockA.endY) {
      this.addChar(this.num[0].toString())
    }
    if (x >= blockB.startX &&
      x <= blockB.endX &&
      y >= blockB.startY &&
      y <= blockB.endY) {
      this.addChar(this.num[1].toString())
    }
    if (x >= blockC.startX &&
      x <= blockC.endX &&
      y >= blockC.startY &&
      y <= blockC.endY) {
      this.addChar(this.num[2].toString())
    }
    if (x >= blockD.startX &&
      x <= blockD.endX &&
      y >= blockD.startY &&
      y <= blockD.endY) {
      this.addChar(this.num[3].toString())
    }
    if (x >= plus.startX &&
      x <= plus.endX &&
      y >= plus.startY &&
      y <= plus.endY) {
      this.addChar("+")
    }
    if (x >= sub.startX &&
      x <= sub.endX &&
      y >= sub.startY &&
      y <= sub.endY) {
      this.addChar("-")
    }
    if (x >= mul.startX &&
      x <= mul.endX &&
      y >= mul.startY &&
      y <= mul.endY) {
      this.addChar("*")
    }
    if (x >= div.startX &&
      x <= div.endX &&
      y >= div.startY &&
      y <= div.endY) {
      this.addChar("/")
    }
    if (x >= lp.startX &&
      x <= lp.endX &&
      y >= lp.startY &&
      y <= lp.endY) {
      this.addChar("\(")
    }
    if (x >= rp.startX &&
      x <= rp.endX &&
      y >= rp.startY &&
      y <= rp.endY) {
      this.addChar("\)")
    }
  }
  addChar(char) {
    this.charLength.push(char.length)
    console.log(this.charLength)
    this.lengthI = this.charLength.length - 1
    this.expr += char
  }
  refresh() {
    var num1 = []
    num1.push(Math.floor(Math.random() * 10000 % 14))
    num1.push(Math.floor(Math.random() * 10000 % 14))
    num1.push(Math.floor(Math.random() * 10000 % 14))
    num1.push(Math.floor(Math.random() * 10000 % 14))
    while (Point24.D24(num1[0], num1[1], num1[2], num1[3])[0] == false && wx.binding.eval(Point24.D24(num1[0], num1[1], num1[2], num1[3])[1]) != 24 && num1[0] * num1[1] * num1[2] * num1[3] == 0) {
      num1 = []
      num1.push(Math.floor(Math.random() * 10000 % 14))
      num1.push(Math.floor(Math.random() * 10000 % 14))
      num1.push(Math.floor(Math.random() * 10000 % 14))
      num1.push(Math.floor(Math.random() * 10000 % 14))

    }
    return num1
  }
  render() {

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    if (wx.binding.eval(this.expr) == 24 && Point24.isLegal(this.num[0], this.num[1], this.num[2], this.num[3], this.expr)) {
      this.count = 0
      this.score += 1
      this.expr = ''
      this.num = this.refresh()
      this.charLength = []
      if (this.time > 60)
        this.time -= 30
    }
    this.count++;
    this.nowTime = Math.floor(this.time - this.count * 0.1)
    if (this.nowTime == 0) {
      clearInterval(this.int)
    }
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    const bg = wx.createImage()
    bg.src = "bg.png"
    bg.onload = () => {
      ctx.drawImage(
        bg,
        0,
        0,
        screenWidth,
        screenHeight
      )
      roundRect(ctx, screenWidth / 10, screenWidth / 15, 0.2 * screenWidth, screenWidth / 6.8, 28, '#FFFfff')//时间
      roundRect(ctx, 1.7 * screenWidth / 5, screenWidth / 15, 0.558 * screenWidth, screenWidth / 6.8, 28, '#FFFfff')//闯关
      roundRect(ctx, screenWidth / 10, screenWidth / 4, 0.8 * screenWidth, screenWidth / 4.8, 40, '#FFFfff') //最上面横条
      roundRect(ctx, screenWidth / 6, screenWidth / 1.95, 11 * screenWidth / 36, 7 * screenWidth / 24, 10, '#FFF386')//左上黄方
      roundRect(ctx, 19 * screenWidth / 36, screenWidth / 1.95, 11 * screenWidth / 36, 7 * screenWidth / 24, 10, '#FFF386')//右上黄方
      roundRect(ctx, screenWidth / 6, screenWidth / 1.17, 11 * screenWidth / 36, 7 * screenWidth / 24, 10, '#FFF386')//左下黄方
      roundRect(ctx, 19 * screenWidth / 36, screenWidth / 1.17, 11 * screenWidth / 36, 7 * screenWidth / 24, 10, '#FFF386')//右下黄方
      roundRect(ctx, screenWidth / 10, screenWidth / 0.83, 0.8 * screenWidth, screenWidth / 6.8, 30, '#FFFfff')//放符号的条
      roundRect(ctx, screenWidth / 10, screenWidth / 0.72, 0.2 * screenWidth, screenWidth / 6.8, 28, '#FFFfff')
      roundRect(ctx, 0.4 * screenWidth, screenWidth / 0.72, 0.2 * screenWidth, screenWidth / 6.8, 28, '#FFFfff')
      roundRect(ctx, 0.7 * screenWidth, screenWidth / 0.72, 0.2 * screenWidth, screenWidth / 6.8, 28, '#FFFfff')
      ctx.fillStyle = "#000000"
      ctx.font = "30px Monaco"
      ctx.fillText(
        this.nowTime,
        screenWidth / 2 - 139,
        screenHeight / 10.3
      )
      ctx.font = "36px Monaco"
      if (this.nowTime == 0) {
        ctx.fillText(
          '时间到',
          2.2 * screenWidth / 5,
          screenHeight / 10
        )
      }
      else {
        ctx.fillText(
          '得分:' + this.score,
          2.2 * screenWidth / 5,
          screenHeight / 10
        )
      }
      ctx.fillStyle = "#000000"
      ctx.font = "30px Monaco"
      ctx.fillText(
        this.expr,
        screenWidth / 2 - 120,
        screenHeight / 4.65
      )
      ctx.fillStyle = "#ffffff"
      ctx.font = "70px Monaco"
      ctx.fillText(
        this.num[0],
        screenWidth / 2 - 100,
        screenHeight / 2.45
      )
      ctx.textAlign = "left"
      ctx.fillText(
        this.num[1],
        screenWidth / 2 + 35,
        screenHeight / 2.45
      )
      ctx.fillText(
        this.num[2],
        screenWidth / 2 - 100,
        screenHeight / 1.67
      )
      ctx.fillText(
        this.num[3],
        screenWidth / 2 + 35,
        screenHeight / 1.67
      )
      ctx.fillStyle = "#000000"
      ctx.font = "40px Monaco"
      ctx.fillText(
        '+',
        screenWidth / 2 - 110,
        screenHeight / 1.355
      )
      ctx.fillText(
        '－',
        screenWidth / 2 - 80,
        screenHeight / 1.355
      )
      ctx.fillText(
        '×',
        screenWidth / 2 - 30,
        screenHeight / 1.355
      )
      ctx.fillText(
        '÷',
        screenWidth / 2 + 15,
        screenHeight / 1.355
      )
      ctx.fillText(
        '(',
        screenWidth / 2 + 50,
        screenHeight / 1.355
      )
      ctx.fillText(
        ')',
        screenWidth / 2 + 90,
        screenHeight / 1.355
      )
      ctx.font = "16px Monaco"
      ctx.fillText(
        '重新开始',
        screenWidth / 2 - 30,
        screenHeight / 1.205
      )
      ctx.fillText(
        '提示×' + this.hintChance,
        screenWidth / 2 - 137,
        screenHeight / 1.205
      )
      ctx.font = "26px Monaco"
      ctx.fillText(
        '<=',
        screenWidth / 2 + 95,
        screenHeight / 1.205
      )

    }
    this.touchHandler = this.touchListenEvent.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)

  }
}

function roundRect(ctx, x, y, w, h, r, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  // ctx.setStrokeStyle('transparent')
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)
  ctx.fill()
  // ctx.stroke()
  ctx.closePath()

}