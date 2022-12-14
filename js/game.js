'use strict'

var FLAG = '🚩'
var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 3,
}
var gGame = {
    hintCount: 0,
    currentHeart: 2,
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    resetTimer()
    gGame.hintCount = 0
    gGame.shownCount = 0
    gGame.markedCount = 0
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    document.querySelector('.hint img').src = "img/lighton.png"
    document.querySelector('.bomb-span').innerHTML = '&#128163; ' + '&nbsp;' + gLevel.MINES
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard, '.board-container')
}
function buildBoard(size) {
    var board = []
    for (let i = 0; i < size; i++) {
        board.push([])
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    // / Random Mines according to difficulty
    randomMines(gLevel.SIZE, board)

    return board
}

function easyLevel() {
    gLevel.SIZE = 4
    gLevel.MINES = 3
    initGame()
    resetTimer()
    resetHearts()
}

function mediumLevel() {
    gLevel.SIZE = 6
    gLevel.MINES = 6
    initGame()
    resetTimer()
    resetHearts()
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            document.querySelector(`.cell-${i}-${j}`).style.width = '48px'
            document.querySelector(`.cell-${i}-${j}`).style.height = '48px'
        }
    }
}

function hardLevel() {
    gLevel.SIZE = 7
    gLevel.MINES = 12
    initGame()
    resetTimer()
    resetHearts()
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            document.querySelector(`.cell-${i}-${j}`).style.width = '41.5px'
            document.querySelector(`.cell-${i}-${j}`).style.height = '41.5px'
        }
    }
}

function checkIfVictory() {
    if (checkIfHidden() && gGame.markedCount === gLevel.MINES && hearts[0] !== '') {
        victory()
    }
}

function gameOver() {
    var audio = new Audio()
    audio.src = "sounds/lose.wav"
    audio.play()
    clearInterval(interval)
    gGame.isOn = false
    document.querySelector('.you-lost').classList.remove('hidden1')
    document.querySelector('.board-container').style.opacity = "0.2"
    document.getElementById('restart-btn').classList.remove('hidden1')
    document.querySelector('.collapsible').disabled = "true"
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine === true) {
                gBoard[i][j].isShown = true
                document.querySelector(`.cell-${i}-${j}`).style.backgroundColor = '#a30000'
                document.querySelector(`.cell-${i}-${j}`).innerHTML = '💣'
            }
        }
    }

}

function victory() {
    var audio = new Audio()
    audio.src = "sounds/victory.mp3"
    audio.play()
    clearInterval(interval)
    gGame.isOn = false
    document.querySelector('.collapsible').disabled = "true"
    document.querySelector('.board-container').style.opacity = "0.2"
    document.getElementById('restart-btn').classList.remove('hidden1')
    document.querySelector('.you-won').classList.remove('hidden1')
}

function checkIfHidden() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (document.querySelector(`.cell-${i}-${j} span`)?.classList.contains('hidden')) return false
        }
    }
    return true
}
