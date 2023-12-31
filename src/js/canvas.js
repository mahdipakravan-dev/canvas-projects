const Circle = require("./objects/circle")
const {randomColor, randomIntFromRange , randomArray} = require("./utils");

window.canvas = document.querySelector('canvas')
window.context2D = canvas.getContext('2d')
window.setting = {
    gravity : 1,
    fraction : 0.88
}

canvas.width = innerWidth - 10
canvas.height = innerHeight - 10

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

function getDistance(x1,y1,x2,y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;

    return Math.sqrt(
        Math.pow(xDistance , 2) + Math.pow(yDistance , 2)
    )
}

// Implementation
let objects
function init() {
    objects = [
        ...randomArray(4).map(() =>
            new Circle(
                randomIntFromRange(0,canvas.width) ,
                randomIntFromRange(0,canvas.height),
                80 ,
                "black")
        )
    ]
}
function animate() {
    requestAnimationFrame(animate)
    context2D.clearRect(0, 0, canvas.width, canvas.height)

    objects.forEach(object => {
        object.update()
    })
}

init()
animate()