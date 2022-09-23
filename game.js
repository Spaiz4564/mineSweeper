'use strict'

var FLAG = '🚩'

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard, '.board-container')

}

function buildBoard(size) {
    var board = []
    for (let i = 0; i < gLevel.SIZE * 1.5; i++) {
        board.push([])
        for (let j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }

    /// Random Mines according to difficulty
    for (let i = 0; i < (gLevel.MINES); i++) {
        board[getRandomNum(0, gLevel.SIZE)][getRandomNum(0, gLevel.SIZE)].isMine = true
    }

    return board
}


function cellClicked(cellEl, rowIdx, colIdx) {
    var currentCell = gBoard[rowIdx][colIdx]
    const span = cellEl.querySelector('span')
    if (span.innerText === FLAG) return console.log('forbidden')
    if (gGame.isOn === true) {
        span.classList.remove('hidden')
        currentCell.isShown = true

        if (currentCell.isMine) {
            console.log(currentCell)
            currentCell.isShown = true
            cellEl.style.backgroundColor = "#a30000"
            cellEl.innerHTML = "💣"
            gameOver()
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
        if (!currentC.isShown) {
            const span = cell.querySelector('span')
            if (currentC.isMarked) {
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
    document.querySelector('.smiley').innerHTML = '😖'
    document.querySelector('.smiley').classList.add('shake')
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




