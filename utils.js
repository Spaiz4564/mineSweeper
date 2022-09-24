'use strict'
var interval
var seconds = 0o0
var tens = 0o0
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


function startTime() {
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    tens++
    if (tens <= 9) outputTens.innerHTML = "0" + tens;


    if (tens > 9) outputTens.innerHTML = tens


    if (tens > 99) {
        seconds++
        outputSeconds.innerHTML = "0" + seconds
        tens = 0
        outputTens.innerHTML = "0" + tens
    }

    if (seconds > 9)
        outputSeconds.innerHTML = seconds

}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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