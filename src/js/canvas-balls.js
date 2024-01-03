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

// Implementation
window.game_objects = {}
function init() {
    window.game_objects = {
        circles : randomArray(2).map((_,index) =>
            new Circle(
                index,
                randomIntFromRange(0,canvas.width) ,
                randomIntFromRange(0,canvas.height),
                randomIntFromRange(10,30) ,
                randomColor(colors))
        )
    }
}
function animate() {
    requestAnimationFrame(animate)
    context2D.clearRect(0, 0, canvas.width, canvas.height)

    Object.values(window.game_objects)[0].forEach(object => {
        object.update()
    })
}

init()
animate()