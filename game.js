'use strict'

var MINE = '<span></span>'
var FLAG = '🚩'
var EMPTY = '<span> </span>'




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
var gBoard = gBoard = buildBoard(4)


function initGame() {

    var gBoard = buildBoard(4)
    renderBoard(gBoard, '.board-container')

}


function buildBoard(size) {
    console.log('build')
    var levelSize = gLevel.SIZE
    var board = []


    for (let i = 0; i < levelSize * 1.5; i++) {
        board.push([])
        for (let j = 0; j < levelSize; j++) {

            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }

    }
    //// Manual ///
    board[2][1].isMine = true
    board[3][3].isMine = true


    // board[2][1].isShown = true
    // board[3][3].isShown = true
    // Manual ///


    // console.log(board)
    return board
}


function renderBoard(board, selector) {
    console.log('render')
    var gBoard = buildBoard()
    var strHTML = '<table border="0"><tbody>'
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = 'cell cell-' + i + '-' + j
            const liveMineCount = getLiveMineCount(gBoard, i, j)
            strHTML += `\t<td class="${className}" cell-value=${liveMineCount} onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="rightClick(this, ${i}, ${j})";return false;"><span class="spans hidden">${liveMineCount}</span></td>`

        }
        strHTML += '</tr>\n'

    }
    strHTML += '</tbody></table>'
    // console.log(strHTML)
    var elSelector = document.querySelector(selector)
    elSelector.innerHTML = strHTML

}



function cellClicked(cellEl, rowIdx, colIdx) {
    var currentCell = gBoard[rowIdx][colIdx]
    const span = cellEl.querySelector('span')
    if (span.innerText === FLAG) return console.log('forbidden')
    if (gGame.isOn === true) {
        cellEl.querySelector('span').classList.remove('hidden')
        currentCell.isShown = true
        console.log(currentCell)

        if (currentCell.isMine) {
            cellEl.querySelector('span').classList.remove('hidden')
            currentCell.isShown = true
            cellEl.innerText = "💣"
            gameOver()
        }
    }
}

function rightClick(cell, rowIdx, colIdx) {
    event.preventDefault()

    var currentC = gBoard[rowIdx][colIdx]
    if (gGame.isOn) {
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


function getLiveMineCount(board, rowIdx, colIdx) {
    var mineCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue

            var currCell = board[i][j]
            if (currCell.isMine) mineCount++
        }
    }
    return mineCount
}

function gameOver() {
    gBoard = buildBoard()
    var spanEl = document.querySelector('cell span')
    gGame.isOn = false
    document.querySelector('h2').innerText = "You Lost!"
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {

            if (gBoard[i][j].isMine) {
                // console.log(gBoard[i][j])
                gBoard[i][j].innerText = "Hello"

            }
        }

    }

}

function resetGame() {
    location.reload()

}
