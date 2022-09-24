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

// let arr1 = [false, true, true],
//     arr2 = [true, true, true];

// let checker = arr => arr.every(v => v === true);

// console.log(checker(arr1));
// console.log(checker(arr2));







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

    // / Random Mines according to difficulty
    for (let i = 0; i < (gLevel.MINES); i++) {
        function generateLocation() {
            let location = [getRandomInt(0, gLevel.SIZE - 1), getRandomInt(0, gLevel.SIZE - 1)];
            if (board[location[0]][location[1]].isMine === true) return generateLocation(); // runs it again and returns the output of the again
            return location; // just return it if it's unique
        }
        let randomLoc = generateLocation();
        board[randomLoc[0]][randomLoc[1]].isMine = true;
    }



    // var gCheckGameEnd = board.every((cell) => {
    //     return cell.isShown === true

    // })
    // console.log(gCheckGameEnd)

    // if (gCheckGameEnd === true) {
    //     console.log("hello")
    // }

    return board
}

function checkGameOver() {
    if (gGame.shownCount === gLevel.SIZE ** 2) {
        console.log("hello")
        victory()
    }
}


var currentHeart = 2
function cellClicked(cellEl, rowIdx, colIdx) {
    var currentCell = gBoard[rowIdx][colIdx]



    const span = cellEl.querySelector('span')
    if (span.innerText === FLAG) return console.log('forbidden')
    if (gGame.isOn === true) {
        if (!currentCell.isShown) {
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
        checkGameOver()
    }



}


function rightClick(cell, rowIdx, colIdx) {
    event.preventDefault()
    var currentC = gBoard[rowIdx][colIdx]
    if (gGame.isOn) {
        clearInterval(interval)
        interval = setInterval(startTime, 10)
        gBoard.isMarked = true
        if (currentC.isMine && !currentC.isMarked) {
            gGame.shownCount++
        }
        if (!currentC.isShown) {
            const span = cell.querySelector('span')
            if (!currentC.isMarked) {
                span.innerHTML = FLAG
                span.classList.remove('hidden')
            } else {
                gGame.shownCount--
                cell.innerHTML = `<span class="spans hidden">${cell.attributes["cell-value"].value}</span>`
            }
            currentC.isMarked = !currentC.isMarked
        }
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


