'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    // console.log(strHTML)

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }
    var randIdx = Math.floor(Math.random() * emptyCells.length)
    // console.log('emptyCells', emptyCells)
    return emptyCells[randIdx]
}


function getPacmanHTML() {
    return `<span class="emoji" style="transform: rotate(${gEmojiDir}deg)">${PACMAN}</span>`
}