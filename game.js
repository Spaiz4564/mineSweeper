'use strict'

var FLAG = '🚩'
var currentHeart = 2
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
    currentHeart = 2
    document.querySelector('.weird').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[currentHeart]
}



function mediumLevel() {
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    gGame.shownCount = 0
    gLevel.SIZE = 6
    gLevel.MINES = 5


    initGame()
    gGame.markedCount = 0
    clearInterval(interval)
    clearInterval(startTime)
    interval = null
    seconds = 0o0
    tens = 0o0
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    currentHeart = 2
    document.querySelector('.weird').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[currentHeart]

    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            document.querySelector(`.cell-${i}-${j}`).style.width = '50px'
            document.querySelector(`.cell-${i}-${j}`).style.height = '50px'

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
    gLevel.MINES = 10
    initGame()
    gGame.markedCount = 0
    clearInterval(interval)
    clearInterval(startTime)
    interval = null
    seconds = 0o0
    tens = 0o0
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
    currentHeart = 2
    document.querySelector('.weird').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[currentHeart]
    hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            document.querySelector(`.cell-${i}-${j}`).style.width = '41px'
            document.querySelector(`.cell-${i}-${j}`).style.height = '41px'
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

function checkGameOver() {
    if (checkIfGameOver() && gGame.markedCount === gLevel.MINES) {
        console.log("hello")
        victory()
    }
}



function cellClicked(cellEl, rowIdx, colIdx) {



    var currentCell = gBoard[rowIdx][colIdx]
    const span = cellEl.querySelector('span')


    if (span.innerText === FLAG) return console.log('forbidden')
    if (gGame.isOn === true) {

        if (!currentCell.isShown && !currentCell.isMine) {
            for (let i = 0; i < gBoard.length; i++) {
                for (let j = 0; j < gBoard[i].length; j++) {
                    if (span.innerText === '0' && !currentCell.isMine) {
                        var neg1 = document.querySelector(`.cell-${rowIdx - 1}-${colIdx - 1} span`)?.classList.remove('hidden')
                        var neg2 = document.querySelector(`.cell-${rowIdx - 1}-${colIdx} span`)?.classList.remove('hidden')
                        var neg3 = document.querySelector(`.cell-${rowIdx - 1}-${colIdx + 1} span`)?.classList.remove('hidden')
                        var neg4 = document.querySelector(`.cell-${rowIdx}-${colIdx + 1} span`)?.classList.remove('hidden')
                        var neg5 = document.querySelector(`.cell-${rowIdx}-${colIdx - 1} span`)?.classList.remove('hidden')
                        var neg6 = document.querySelector(`.cell-${rowIdx + 1}-${colIdx} span`)?.classList.remove('hidden')
                        var neg7 = document.querySelector(`.cell-${rowIdx + 1}-${colIdx - 1} span`)?.classList.remove('hidden')
                        var neg8 = document.querySelector(`.cell-${rowIdx + 1}-${colIdx + 1} span`)?.classList.remove('hidden')
                    }
                }
            }
            gGame.shownCount++
        }
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
                // document.querySelector('.hearts').classList.add('shake')
                document.querySelector('.heart1').innerHTML = hearts[currentHeart]
                gameOver()
            }
            gGame.markedCount++
            currentCell.isShown = true
            cellEl.style.backgroundColor = "#a30000"
            cellEl.innerHTML = "💣"
        } else {
            clearInterval(startTime)
            clearInterval(interval)
            interval = setInterval(startTime, 10)
        }


        checkGameOver()
    }
}


function rightClick(cell, rowIdx, colIdx) {
    event.preventDefault()
    var currentC = gBoard[rowIdx][colIdx]
    const span = cell.querySelector('span')
    if (gGame.isOn) {
        gBoard.isMarked = true
        if (!currentC.isShown) {
            if (!currentC.isMarked) {
                span.innerHTML = FLAG
                gGame.markedCount++
                span.classList.remove('hidden')
            } else {
                gGame.markedCount--
                cell.innerHTML = `<span class="spans hidden">${cell.attributes["cell-value"].value}</span>`
            }
            currentC.isMarked = !currentC.isMarked
        }

        // if (!currentC.isShown) {
        //     if (!currentC.isMarked && currentC.isMine) {
        //         span.innerHTML = FLAG
        //         gGame.markedCount++
        //         span.classList.toggle('hidden')
        //     } else {

        //         gGame.markedCount--
        //         cell.innerHTML = `<span class="spans hidden">${cell.attributes["cell-value"].value}</span>`
        //     }
        //     currentC.isMarked = !currentC.isMarked
        // }
        checkGameOver()
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
    clearInterval(interval)
    gGame.isOn = false
    document.querySelector('.container').style.opacity = "0.3"
    document.getElementById('restart-btn').classList.remove('hidden1')
    document.querySelector('.you-won').classList.remove('hidden1')

}

function resetGame() {
    location.reload()

}

function checkIfGameOver() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (document.querySelector(`.cell-${i}-${j} span`)?.classList.contains('hidden')) return false
        }
    }

    return true
}
