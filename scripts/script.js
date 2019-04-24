const defaultN = 20

let faces = []
const urlParams = new URLSearchParams(window.location.search)
const n = urlParams.get('n') || defaultN
const canvas = document.getElementById('pt')
const ctx = canvas.getContext('2d')
const scaleRatio = 1

const randomConfig = {
  IMAGES_PREFIX: './images/',
  IMAGES_SUFFIX: '.png',
  MIN: 1,
  MAX: 3,
}

function getRandomFaces() {
  const number = Math.floor(Math.random() * randomConfig.MAX + randomConfig.MIN)

  return randomConfig.IMAGES_PREFIX + number + randomConfig.IMAGES_SUFFIX
}

function generateFaces() {
  faces = []
  for (i = 0; i < n; i++) {
    const img = new Image()
    img.onload = function() {
      const scaleWidth = img.width * scaleRatio
      const scaleHeight = img.height * scaleRatio
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
      faces.push(osmond)
    }
    img.src = getRandomFaces()
  }
}

function onResize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  generateFaces()
}

window.onresize = onResize
onResize()

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  faces.forEach(osmond => {
    if (!osmond.img) {
      return
    }

    osmond.x += osmond.vx
    osmond.y += osmond.vy

    if (osmond.y + osmond.height >= canvas.height) {
      osmond.vy = -1 * osmond.vy
      osmond.y = canvas.height - osmond.height
    }

    if (osmond.y <= 0) {
      osmond.vy = -1 * osmond.vy
      osmond.y = 0
    }

    if (osmond.x + osmond.width >= canvas.width) {
      osmond.vx = -1 * osmond.vx
      osmond.x = canvas.width - osmond.width
    }

    if (osmond.x <= 0) {
      osmond.vx = -1 * osmond.vx
      osmond.x = 0
    }

    ctx.drawImage(osmond.img, osmond.x, osmond.y, osmond.width, osmond.height)
  })

  requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
