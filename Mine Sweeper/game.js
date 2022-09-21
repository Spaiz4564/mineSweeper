'use strict'

var MINE = '<span> </span>'
var FLAG = '🚩'
var EMPTY = '<span> </span>'



var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0

}


function initGame() {

    var gBoard = buildBoard(4)
    renderBoard(gBoard, '.board-container')
}


function buildBoard(size) {
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
    board[2][1].isShown = true
    board[3][3].isShown = true
    // Manual ///



    return board
}


function renderBoard(board, selector) {
    var strHTML = '<table border="0"><tbody>'
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (let j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = 'cell cell-' + i + '-' + j
            // cell.innerHTML = 
            if (cell.isMine) {
                cell = EMPTY
                className += ' mine'
            } else {
                cell = EMPTY
            }





            strHTML += `\t<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="rightClick(this, ${i}, ${j})";return false;">${cell}</td>`

        }
        strHTML += '</tr>\n'

    }
    strHTML += '</tbody></table>'
    // console.log(strHTML)
    var elSelector = document.querySelector(selector)
    elSelector.innerHTML = strHTML

}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}


function cellClicked(cellEl, rowIdx, colIdx) {
    var gBoard = buildBoard()
    var currentCell = gBoard[rowIdx][colIdx]
    currentCell.isShown = true
    // console.log(currentCell)
    cellEl.classList.add('shown')
    var cellNegMineCount = getLiveMineCount(gBoard, rowIdx, colIdx)


    if (currentCell.isMine) {
        cellEl.innerHTML = '<span>💣</span>'
    }


    if (!cellEl.classList.contains('mine')) {
        cellEl.innerHTML = cellNegMineCount
    } else {

    }

    // if (cell.classList.contains('shown')) {
    //     cellEl.innerHTML = '<span></span>'
    // }


    cellEl.style.color = "#fdfdfd"
    cellEl.style.fontFamily = 'Fredoka One'

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


function rightClick(cell, rowIdx, colIdx) {
    event.preventDefault()
    gBoard = buildBoard()
    var currentC = gBoard[rowIdx][colIdx]
    currentC.isMarked = true
    if (!currentC.isShown) {
        if (currentC.isMarked && cell.innerHTML === EMPTY) {
            cell.innerHTML = FLAG
            currentC.isMarked = false
        } else cell.innerHTML = EMPTY
    }

}
