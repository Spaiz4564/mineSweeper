'use strict'

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
            clearInterval(interval)
            interval = setInterval(startTime, 10)
            gGame.markedCount++
            currentCell.isShown = true
            cellEl.style.backgroundColor = "#a30000"
            cellEl.innerHTML = "💣"
        } else {
            clearInterval(interval)
            interval = setInterval(startTime, 10)
        }
        checkIfVictory()
    } else {
        clearInterval(interval)
        interval = setInterval(startTime, 10)
    }
}


function rightClick(cell, rowIdx, colIdx) {
    event.preventDefault()
    var currentC = gBoard[rowIdx][colIdx]
    const span = cell.querySelector('span')
    if (gGame.isOn) {
        clearInterval(interval)
        interval = setInterval(startTime, 10)
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

        checkIfVictory()
    }
}

function resetGame() {
    location.reload()
}

