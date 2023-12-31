const {randomIntFromRange} = require("../utils");

class Circle {
    constructor(x, y, radius, color) {
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
        context2D.stroke()
        context2D.closePath()
    }

    update() {
        const isOnEndLeft = this.x <= this.radius
        const isOnEndRight = this.x + this.radius >= canvas.width
        const isOnEndTop = this.y <= this.radius
        const isOnEndDown = this.y + this.radius >= canvas.height

        if(isOnEndLeft) {
            this.dx = +randomIntFromRange(5,15)
        }
        if(isOnEndRight) {
            this.dx = -randomIntFromRange(5,15)
        }
        if(isOnEndTop) {
            this.dy = +randomIntFromRange(5,15)
        }
        if(isOnEndDown) {
            this.dy = -randomIntFromRange(5,15)
        }
        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

module.exports = Circle