let worker = new Worker('worker.js')
let drop = document.querySelector('.drop')
let canvas = document.querySelector('#canvas')
let screen = canvas.getContext('2d')
let range = document.querySelectorAll('.range')
let save = document.querySelector('.save')
let imagedata
let changedata

range.forEach(r => {
  r.onchange = e => {
    worker.postMessage({
      data: imagedata,
      value: [range[0].value, range[1].value, range[2].value, range[3].value]
    })
  }
})

drop.ondragover = e => {
  e.preventDefault()
  drop.classList.add('dragged')
}
drop.ondragleave = e => {
  e.preventDefault()
  drop.classList.remove('dragged')
}
drop.ondrop = e => {
  e.preventDefault()
  drop.classList.remove('dragged')
  document.querySelector('.menu').style.display = 'block'
  let fr = new FileReader()
  fr.readAsDataURL(e.dataTransfer.files[0])
  let type = e.dataTransfer.files[0].type
  console.log(type)
  if (type == 'image/jpeg' || type == 'image/png' || type == 'image/jpg') {
    fr.onload = () => {
      let url = fr.result
      let i = new Image()
      i.src = url
      i.onload = () => {
        canvas.height = i.height
        canvas.width = i.width
        screen.drawImage(i, 0, 0)
        let data = screen.getImageData(0, 0, i.width, i.height)
        imagedata = data
      }
    }
  }
}
canvas.ondragover = e => {
  e.preventDefault()
  drop.classList.add('dragged')
}
canvas.ondragleave = e => {
  e.preventDefault()
  drop.classList.remove('dragged')
}
canvas.ondrop = e => {
  e.preventDefault()
  drop.classList.remove('dragged')
  document.querySelector('.menu').style.display = 'block'
  canvas.style.position = 'relative'
  let fr = new FileReader()
  console.log(e.dataTransfer.files[0].type)
  fr.readAsDataURL(e.dataTransfer.files[0])
  if (e.dataTransfer.files[0].type == 'image/png') {
    fr.onload = () => {
      let url = fr.result
      let i = new Image()
      i.src = url
      i.onload = () => {
        canvas.height = i.height
        canvas.width = i.width
        screen.drawImage(i, 0, 0)
        let data = screen.getImageData(0, 0, i.width, i.height)
        imagedata = data
      }
    }
  }
}
worker.onmessage = e => {
  let data = e.data
  changedata = data
  screen.putImageData(data, 0, 0)
}

save.onclick = () => {
  imagedata = changedata
}
let download = document.querySelector('.download')
download.onclick = () => {
  let a = document.createElement('a')
  a.href = canvas.toDataURL()
  a.download = 'image'
  document.body.append(a)
  a.click()
}

let crop = document.querySelector('.crop')
let x, y
let tf = false
canvas.onmousedown = e => {
  x = e.x
  y = e.y
  crop.style.top = `${y}px`
  crop.style.left = `${x}px`
}

canvas.onmousemove = e => {
  let width = e.x - x
  let height = e.y - y
  console.log('okay')
  crop.style.width = `${width}px`
  crop.style.height = `${height}px`
}
crop.onmousemove = e => {
  let width = e.x - x
  let height = e.y - y
  console.log('okay')
  crop.style.width = `${width}px`
  crop.style.height = `${height}px`
}