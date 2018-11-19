function initItemsDragEvent(doms, positionData) {
  let that = this
  let isAlerting = false
  this.dragDom = null

  doms.forEach((dom) => {
    dom.onmousedown = function (e) {
      that.dragDom = dom
      let positionData = dom.style.transform.match(/\-*\d+\.*\d*/g)
      dom.currentX = e.clientX
      dom.currentY = e.clientY
      dom.positionLeft = positionData ? Number(positionData[0]) : 0
      dom.positionTop = positionData ? Number(positionData[1]) : 0
      dom.rotate = positionData ? Number(positionData[2]) : 0
    }
  })

  document.onmousemove = function (e) {
    e.preventDefault()
    if (that.dragDom) {
      let dragDom = that.dragDom
      let disX = e.clientX - that.dragDom.currentX
      let disY = e.clientY - that.dragDom.currentY

      let X = dragDom.positionLeft + disX
      let Y = dragDom.positionTop + disY
      let R = dragDom.rotate
      dragDom.style.transform = `translate(${X}px,${Y}px) rotate(${R}deg)`

      toOrigin(R)
    }
  }
  document.onmousewheel = function (e) {
    if (that.dragDom) {
      let dragDom = that.dragDom
      let dir = e.wheelDelta > 0 ? 1 : -1
      let positionData = dragDom.style.transform.match(/\-*\d+\.*\d*/g)

      let X = positionData ? Number(positionData[0]) : 0
      let Y = positionData ? Number(positionData[1]) : 0
      dragDom.rotate = dragDom.rotate + dir * 45

      dragDom.style.transform = `translate(${X}px,${Y}px) rotate(${dragDom.rotate }deg)`

      toOrigin(dragDom.rotate)
    }
  }
  document.onmouseup = function () {
    that.dragDom = null
  }

  function toOrigin(R) {

    if (R % 180 == 0) {
      let rect = dragDom.getBoundingClientRect()
      let X = rect.left
      let Y = rect.top
      let putIn = positionData.find((data) => (Math.abs(data.X - X) < 30 && Math.abs(data.Y - Y) < 30))
      if (putIn) {
        dragDom.style.transform = `translate(${ putIn.left - dragDom.left}px,${putIn.top - dragDom.top}px) rotate(${R}deg)`

        // 检查当前位置是否已有放置
        checkAlready(putIn, dragDom.id)
        // 检查胜利
        setTimeout(() => {
          checkWin()
        },500)
      }
    }
  }

  function checkAlready(putIn, id) {
    let already = [].filter.call(doms, (dom) => {
      let rect = dom.getBoundingClientRect()
      return rect.left == putIn.X && rect.top == putIn.Y
    })
    if (already.length == 2) {
      let item = already.find((dom) => dom.id != id)
      let positionData = item.style.transform.match(/\-*\d+\.*\d*/g)
      item.style.transform = `translate(${ positionData[0] - 40}px,${positionData[1] - 40}px) rotate(${positionData[2]}deg)`
    }
  }

  function checkWin() {
    let isWin = true
    doms.forEach((dom) => {
      let positionData = dom.style.transform.match(/\-*\d+\.*\d*/g)
      if (positionData[0] != 0 || positionData[1] != 0 || positionData[2] % 360 != 0) {
        isWin = false
      }
    })
    if(isWin && !isAlerting){
        isAlerting = true
        alert('you are win')
    }
  }
}