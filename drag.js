

function initItemsDragEvent(doms) {
  let that = this
  this.dragDom = null

  doms.forEach((dom) => {

    dom.onmousedown = function (e) {
      that.dragDom = dom
      let positionData = dom.style.transform.match(/\-*\d+/g)
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
      dragDom.style.transform = `translate(${dragDom.positionLeft + disX}px,${dragDom.positionTop + disY}px) rotate(${dragDom.rotate}deg)`
    }
  }
  document.onmousewheel = function (e) {
    if (that.dragDom) {
      let dragDom = that.dragDom
      let dir = e.wheelDelta > 0 ? 1 : -1
      let positionData = dragDom.style.transform.match(/\-*\d+/g)

      dragDom.rotate = dragDom.rotate + dir*45

      dragDom.style.transform = `translate(${ positionData ? Number(positionData[0]) : 0}px,${ positionData ? Number(positionData[1]) : 0}px) rotate(${dragDom.rotate }deg)`
    }
  }
  document.onmouseup = function () {
    that.dragDom = null
  }
}
