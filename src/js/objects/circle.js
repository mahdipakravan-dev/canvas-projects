const {randomIntFromRange, getDistance} = require("../utils");

const MIN_X = 1;
const MAX_X = 5
const MAX_Y = 1
const MIN_Y = 5
class Circle {
    constructor(id,x, y, radius, color) {
        this.id = id
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.dy = 10;
        this.dx = randomIntFromRange(5,15)
    }

    draw() {
        context2D.beginPath()
        context2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context2D.strokeStyle = this.color
        context2D.fillStyle = this.color
        context2D.stroke()
        context2D.fill()
        context2D.closePath()
    }

    update() {
        const isOnEndLeft = this.x <= this.radius
        const isOnEndRight = this.x + this.radius >= canvas.width
        const isOnEndTop = this.y <= this.radius
        const isOnEndDown = this.y + this.radius >= canvas.height


        if(isOnEndLeft) {
            this.dx = +randomIntFromRange(MIN_X,MAX_X)
        }
        if(isOnEndRight) {
            this.dx = -randomIntFromRange(MIN_X,MAX_X)
        }
        if(isOnEndTop) {
            this.dy = +randomIntFromRange(MIN_Y,MAX_Y)
        }
        if(isOnEndDown) {
            this.dy = -randomIntFromRange(MIN_Y,MAX_Y)
        }

        window.game_objects["circles"].forEach((circle) => {
            if(circle.id === this.id) return
            if(getDistance(this.x, this.y , circle.x , circle.y) <= this.radius + circle.radius) {
                if(this.y < circle.y)
                    this.dy -= MIN_Y
                else
                    this.dy += MIN_Y
                if(this.x < circle.x)
                    this.dx -= MIN_X
                else
                    this.dx += MIN_X
            }
        })


        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

module.exports = Circle