const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const canva_size = 400
const square_size = canva_size/4

canvas.width = canva_size
canvas.height = canva_size

let change = false

let oldState

let gameState = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

function start() {
  drawNumber()
  drawNumber()
  drawNumber()

}
start()

document.onkeydown = function(key){
  let code = key.code
  switch(code) {
    case "ArrowUp":
      join('up')

      break
    case "ArrowDown":
      join('down')

      break
    case "ArrowRight":
      join('right')

      break
    case "ArrowLeft":
      join('left')

      break
  }
}

function join(dir) {
  align(dir)
  agroup(dir)
  align(dir)

  drawNumber()

  updateCanvas()
}

function drawNumber() {
  let row = Math.floor(Math.random() * 4)
  let collumn = Math.floor(Math.random() * 4)

  if (gameState[row][collumn] === 0) {
    gameState[row][collumn] = 2
  } else {
    drawNumber()
  }
}

function align(dir) {
  switch(dir) {
    case 'right':
    case 'left': 
      for(let r = 0; r < 4; r++){
        let temp = []
        for(let d = 0; d < 4; d++) {
          if(gameState[r][d] != 0) {
            temp.push(gameState[r][d])
          }
        }
        while(temp.length < 4) {
          if(dir === 'left') {
            temp.push(0)
          } else {
            temp.unshift(0)
          }
          
        }
        gameState[r] = temp
      }

      break


    case 'up':
    case 'down':
      for(let c = 0; c < 4; c++){
        let temp = []
        for (let d = 0; d < 4; d++ ){
          if(gameState[d][c] != 0) {
            temp.push(gameState[d][c])
          }
          
        }

        while (temp.length < 4) {
          if(dir == 'up') {
            temp.push(0)
          } else if(dir == 'down'){
            temp.unshift(0)
          }
        }
        for(let a = 0; a < 4; a++) {
          gameState[a][c] = temp[a]
        }
      }
      
      break
  }
}

function agroup(dir) {
  switch (dir) {
    case 'left':
    case 'right':
      for(let c = 0; c < 4; c++) {
        for(let s = 0; s < 4; s++) {
          if(gameState[c][s] === gameState[c][s + 1] &&  gameState[c][s] != 0) {
            gameState[c][s] = gameState[c][s] + gameState[c][s + 1]
            gameState[c][s + 1] = 0
          }
        }
      } 
      break
    case 'up':
    case 'down':
      for(let c = 0; c < 4; c++) {
        for(let r = 0; r < 4; r++) {
          if (!(gameState[r + 1] === undefined)) {
            if(gameState[r][c] === gameState[r + 1][c] && gameState[r][c] != 0) {
              gameState[r][c] = gameState[r][c] + gameState[r + 1][c]
              gameState[r + 1][c] = 0
            }
          }
          
        }
      }

      break
  }
}

function updateCanvas() {
  clearCanvas()
  drawGameState()
}

function drawGameState() {
  for (let row = 0; row < 4; row++) {
    for (let collumn = 0; collumn < 4; collumn++) {
      if(!(gameState[row][collumn] === 0)) {
        drawSquare({x: collumn, y: row}, gameState[row][collumn])
      }
    }
  }
}
drawGameState()

function drawSquare(coord, value) {

  ctx.beginPath()
  ctx.rect(square_size * coord.x, square_size * coord.y, square_size, square_size)
  ctx.lineWidth = 2
  ctx.stroke()

  let margin_x
  let margin_y = 62

  if(value < 10) {
    margin_x = 42
  } else if (value < 100) {
    margin_x = 34
  } else if(value < 1000) {
    margin_x = 25
  } else if(value < 10000) {
    margin_x = 17
  }
  
  ctx.font = "600 30px system-ui";
  ctx.fillText(value,  margin_x + square_size * coord.x, margin_y + square_size *coord.y )
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
