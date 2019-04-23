const defaultN = 20

let osmonds = []
const urlParams = new URLSearchParams(window.location.search)
let n = urlParams.get('n') || defaultN
let canvas = document.getElementById('pt')
let ctx = canvas.getContext('2d')
let scaleRatio = 0.2

function generateOsmonds() {
  let img = new Image()
  img.onload = function() {
    osmonds = []
    let scaleWidth = img.width * scaleRatio
    let scaleHeight = img.height * scaleRatio
    for (let i = 0; i < n; i++) {
      let osmond = {
        width: scaleWidth,
        height: scaleHeight,
        vx: Math.round(Math.random() * 15) + 1,
        vy: Math.round(Math.random() * 15) + 1,
        x: Math.round(Math.random() * (canvas.width - scaleWidth)),
        y: Math.round(Math.random() * (canvas.height - scaleHeight)),
        img,
      }

      osmond.vx = Math.random() >= 0.5 ? -osmond.vx : osmond.vx
      osmond.vy = Math.random() >= 0.5 ? -osmond.vy : osmond.vy

      osmonds.push(osmond)
    }
  }
  img.src = './cbimage.jpg'
}

function onResize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  generateOsmonds()
}

window.onresize = onResize
onResize()
generateOsmonds()

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  osmonds.forEach(osmond => {
    if (!osmond.img) {
      return
    }

    osmond.x += osmond.vx
    osmond.y += osmond.vy

    if (osmond.y + osmond.height >= canvas.height || osmond.y <= 0) {
      osmond.vy = -1 * osmond.vy
    }

    if (osmond.x + osmond.width >= canvas.width || osmond.x <= 0) {
      osmond.vx = -1 * osmond.vx
    }

    ctx.drawImage(osmond.img, osmond.x, osmond.y, osmond.width, osmond.height)
  })

  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
