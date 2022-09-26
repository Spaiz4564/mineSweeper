'use strict'

var FLAG = '🚩'
var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 3,
}
var gGame = {
    currentHeart: 2,
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    document.querySelector('.bomb-span').innerHTML = '&#128163; ' + '&nbsp;' + gLevel.MINES
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard, '.board-container')
}

function easyLevel() {
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    clearInterval(interval)
    clearInterval(startTime)
    gGame.shownCount = 0
    gLevel.SIZE = 4
    gLevel.MINES = 3
    initGame()
    gGame.markedCount = 0
    clearInterval(interval)
    clearInterval(startTime)
    interval = null
    seconds = 0o0
    tens = 0o0
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    gGame.currentHeart = 2
    document.querySelector('.hearts-container').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[gGame.currentHeart]
}

function mediumLevel() {
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    gGame.shownCount = 0
    gLevel.SIZE = 6
    gLevel.MINES = 6
    initGame()
    gGame.markedCount = 0
    clearInterval(interval)
    clearInterval(startTime)
    interval = null
    seconds = 0o0
    tens = 0o0
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    gGame.currentHeart = 2
    document.querySelector('.hearts-container').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[gGame.currentHeart]
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            document.querySelector(`.cell-${i}-${j}`).style.width = '48px'
            document.querySelector(`.cell-${i}-${j}`).style.height = '48px'

        }
    }
}

function hardLevel() {
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    clearInterval(interval)
    clearInterval(startTime)
    gGame.shownCount = 0
    gLevel.SIZE = 7
    gLevel.MINES = 12
    initGame()
    gGame.markedCount = 0
    clearInterval(interval)
    clearInterval(startTime)
    interval = null
    seconds = 0o0
    tens = 0o0
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    gGame.currentHeart = 2
    document.querySelector('.hearts-container').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[gGame.currentHeart]
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            document.querySelector(`.cell-${i}-${j}`).style.width = '41.5px'
            document.querySelector(`.cell-${i}-${j}`).style.height = '41.5px'
        }
    }
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
    for (let i = 0; i < (gLevel.MINES); i++) {
        function generateLocation() {
            let location = [getRandomInt(0, size - 1), getRandomInt(0, size - 1)];
            if (board[location[0]][location[1]].isMine === true) return generateLocation(); // runs it again and returns the output of the again
            return location; // just return it if it's unique
        }
        let randomLoc = generateLocation();
        board[randomLoc[0]][randomLoc[1]].isMine = true;
    }

    return board
}

function checkIfVictory() {
    if (checkIfHidden() && gGame.markedCount === gLevel.MINES) {
        victory()
    }
}

function gameOver() {
    clearInterval(interval)
    gGame.isOn = false
    document.querySelector('.you-lost').classList.remove('hidden1')
    document.querySelector('.container').style.opacity = "0.3"
    document.getElementById('restart-btn').classList.remove('hidden1')
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
    document.querySelector('.container').style.opacity = "0.3"
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
