'use strict'

var badClick = new Audio()
badClick.src = "sounds/incorrect.mp3"
var hearts = ['&#10084;&#65039;', '&#10084;&#65039;', '&#10084;&#65039;']
document.querySelector('.heart1').innerHTML = hearts[0]
document.querySelector('.heart2').innerHTML = hearts[1]
document.querySelector('.heart3').innerHTML = hearts[2]

function renderBoard(board, selector) {
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
    var elSelector = document.querySelector(selector)
    elSelector.innerHTML = strHTML
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
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

function checkNeg(cellEl, rowIdx, colIdx) {
    var currentCell = gBoard[rowIdx][colIdx]
    const span = cellEl.querySelector('span')
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
}

function checkHearts() {
    if (gGame.currentHeart === 2) {
        hearts[2] = ''
        document.querySelector('.heart3').innerHTML = hearts[gGame.currentHeart]
        document.querySelector('.hearts-container').classList.add('shake')
        gGame.currentHeart--
    } else if (gGame.currentHeart === 1) {
        hearts[1] = ''
        document.querySelector('.hearts').classList.add('shake')
        document.querySelector('.heart2').innerHTML = hearts[gGame.currentHeart]
        gGame.currentHeart--
    } else {
        hearts[0] = ''
        document.querySelector('.heart1').innerHTML = hearts[gGame.currentHeart]
        gameOver()
    }
}

function resetHearts() {
    document.querySelector('.hearts-container').classList.remove('shake')
    document.querySelector('.hearts').classList.remove('shake')
    document.querySelector('.heart3').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart2').innerHTML = hearts[gGame.currentHeart]
    document.querySelector('.heart1').innerHTML = hearts[gGame.currentHeart]
}

function randomMines(size, board) {
    for (let i = 0; i < (gLevel.MINES); i++) {
        function generateLocation() {
            let location = [getRandomInt(0, size - 1), getRandomInt(0, size - 1)];
            if (board[location[0]][location[1]].isMine === true) return generateLocation(); // runs it again and returns the output of the again
            return location; // just return it if it's unique
        }
        let randomLoc = generateLocation();
        board[randomLoc[0]][randomLoc[1]].isMine = true;
    }
}