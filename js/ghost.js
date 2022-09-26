'use strict'

const GHOST = '&#x2620;'

var gDeadGhosts = []
var gGhosts = []
var gIntervalGhosts
var cherryInterval

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST

}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)

    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            for (let k = 0; k < gGhosts.length; k++) {
                const currGhost = gGhosts[k];
                if (currGhost.location.i === ghost.location.i && currGhost.location.j === ghost.location.j) {
                    var deadGhost = gGhosts.splice(k, 1)[0]
                    gDeadGhosts.push(deadGhost)
                    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
                    renderCell(ghost.location, ghost.currCellContent)
                    return
                }
            }

            console.log('is super');
        } else {
            gameOver()
            return
        }
    }

    // model

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent


    // DOM

    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? '#ffcc66' : ghost.color
    return `<span style= "color: ${color}">${GHOST}</span>`
}

