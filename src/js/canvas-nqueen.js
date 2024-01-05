window.canvas = document.querySelector('canvas')
window.context2D = canvas.getContext('2d')
window.setting = {
    gravity : 1,
    fraction : 0.88,
    key : {
        last_key : undefined,
        w : {
            pressed : false,
        },
        a : {
            pressed : false,
        },
        d : {
            pressed : false,
        },
        s : {
            pressed : false,
        }
    },
    velocity : {
        collided : false,
        x : 0,
        y : 0
    }
}

canvas.width = innerWidth - 10
canvas.height = innerHeight - 10

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

const boardWidth = 200;
const boardHeight = 200;
const squareSize = 25;
const queens = boardWidth / squareSize;

function drawChessBoard() {
    for (let i = 0; i < boardWidth / squareSize; i++) {
        for (let j = 0; j < boardHeight / squareSize; j++) {
            context2D.fillStyle = (i + j) % 2 === 0 ? '#fff' : '#000';
            context2D.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
        }
    }
}

function drawQueens(queenPositions) {
    context2D.fillStyle = '#ff0000'; // Queen color

    queenPositions.forEach((row, col) => {
        context2D.beginPath();
        context2D.arc(col * squareSize + squareSize / 2, row * squareSize + squareSize / 2, squareSize / 3, 0, 2 * Math.PI);
        context2D.fill();
    });
}

function isSafe(board, row, col) {
    // Check if there is a queen in the same column
    for (let i = 0; i < row; i++) {
        if (board[i] === col || board[i] - i === col - row || board[i] + i === col + row) {
            return false;
        }
    }
    return true;
}

function solveNQueens(board, row) {
    if (row === queens) {
        // All queens are placed
        drawChessBoard();
        drawQueens(board);
        return;
    }

    for (let col = 0; col < queens; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col;
            solveNQueens([...board], row + 1);
        }
    }
}

let objects;
(function init() {
    drawChessBoard();
    objects = [];
    solveNQueens(new Array(queens).fill(0), 0); // Start solving with an empty board
    return objects;
})();

function animate() {
    requestAnimationFrame(animate);

    objects.forEach(object => {
        object.update();
    });
}

animate();