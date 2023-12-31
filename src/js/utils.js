function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function randomArray(length) {
    return Array.from({length})
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function getDistance(x1,y1,x2,y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;

    return Math.sqrt(
        Math.pow(xDistance , 2) + Math.pow(yDistance , 2)
    )
}


module.exports = { randomIntFromRange, randomArray,randomColor, distance , getDistance }