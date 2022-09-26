'use strict'

const WALL = '&#x2630'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍇'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    console.log('Starting Game...')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    cherryInterval = setInterval(addCherry, 10000)
}



function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
        }

    }

    ///// Manual ////
    board[2][5] = WALL
    board[5][2] = WALL
    board[6][6] = WALL
    board[5][3] = FOOD
    board[7][3] = FOOD
    board[6][3] = FOOD
    board[1][1] = SUPERFOOD
    board[1][8] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    ///// Manual ////


    console.log(board)
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    var resetBtn = document.querySelector('.reset-btn')
    var elH2 = document.querySelector('h2')
    resetBtn.classList.remove('hidden')
    elH2.innerHTML = "😵 GAME OVER 😵"
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
}

function gameOverBtn(btn) {
    location.reload()
}

function gameWon() {
    var elH2 = document.querySelector('h2')
    var resetBtn = document.querySelector('.reset-btn')
    resetBtn.classList.remove('hidden')
    elH2.innerHTML = "🏆 VICTORY 🏆"
    elH2.style.textDecoration = "underline"
    elH2.style.textDecorationColor = "#9D00FF"
    elH2.style.textUnderlineOffset = "12px"
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
}


function addCherry() {
    var cell = getEmptyCell()
    // console.log(cell)
    if (!cell) return
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}