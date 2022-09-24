'use strict'

var FLAG = '🚩'

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 3,
}
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    document.querySelector('.bomb-span').innerHTML = '&#128163; ' + '&nbsp;' + gLevel.MINES
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')

}

function buildBoard(size) {
    var board = []
    for (let i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (let j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    /// Random Mines according to difficulty
    for (let i = 0; i < (gLevel.MINES); i++) {
        board[getRandomNum(0, gLevel.SIZE)][getRandomNum(0, gLevel.SIZE)].isMine = true

    }

    return board
}

var currentHeart = 2
function cellClicked(cellEl, rowIdx, colIdx) {
    var currentCell = gBoard[rowIdx][colIdx]
    const span = cellEl.querySelector('span')
    if (span.innerText === FLAG) return console.log('forbidden')
    if (gGame.isOn === true) {
        span.classList.remove('hidden')
        currentCell.isShown = true
        if (currentCell.isMine) {
            if (currentHeart === 2) {
                hearts[2] = ''
                document.querySelector('.heart3').innerHTML = hearts[currentHeart]
                document.querySelector('.weird').classList.add('shake')
                currentHeart--

            } else if (currentHeart === 1) {
                hearts[1] = ''
                document.querySelector('.hearts').classList.add('shake')
                document.querySelector('.heart2').innerHTML = hearts[currentHeart]
                currentHeart--
            } else {
                hearts[0] = ''
                document.querySelector('.hearts').classList.add('shake')
                document.querySelector('.heart1').innerHTML = hearts[currentHeart]
                gameOver()
            }
            currentCell.isShown = true
            cellEl.style.backgroundColor = "#a30000"
            cellEl.innerHTML = "💣"

        } else {
            clearInterval(interval)
            interval = setInterval(startTime, 10)
        }
    }
}



function rightClick(cell, rowIdx, colIdx) {
    event.preventDefault()
    var currentC = gBoard[rowIdx][colIdx]
    if (gGame.isOn) {
        clearInterval(interval)
        interval = setInterval(startTime, 10)
        gBoard.isMarked = true

        if (currentC.isMine) {

        }
        if (!currentC.isShown) {
            const span = cell.querySelector('span')
            if (!currentC.isMarked) {
                span.innerHTML = FLAG
                span.classList.remove('hidden')
            } else {

                cell.innerHTML = `<span class="spans hidden">${cell.attributes["cell-value"].value}</span>`
            }
            currentC.isMarked = !currentC.isMarked
        }
    }
}

function gameOver() {
    clearInterval(interval)
    gGame.isOn = false
    document.querySelector('.container').style.opacity = "0.3"
    document.getElementById('restart-btn').classList.remove('hidden1')
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine === true) {
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = '#a30000'
                document.querySelector(`.cell-${i}-${j}`).innerHTML = '💣'

            }
        }
    }

}

function resetGame() {
    location.reload()

}


