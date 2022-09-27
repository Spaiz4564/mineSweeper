'use strict'


function cellClicked(cellEl, rowIdx, colIdx) {
    var currentCell = gBoard[rowIdx][colIdx]
    const span = cellEl.querySelector('span')
    if (span.innerText === FLAG) return console.log('forbidden')
    if (gGame.isOn === true) {
        clearInterval(interval)
        interval = setInterval(startTime, 10)
        if (!currentCell.isShown && !currentCell.isMine) {
            checkNeg(cellEl, rowIdx, colIdx)
            gGame.shownCount++
        }
        span.classList.remove('hidden')
        currentCell.isShown = true
        if (currentCell.isMine) {
            badClick.play()

            checkHearts()
            gGame.markedCount++
            currentCell.isShown = true
            cellEl.style.backgroundColor = "#a30000"
            cellEl.innerHTML = "💣"
        }
        checkIfVictory()
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

