const {randomIntFromRange} = require("../utils");

class Ball {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.dy = 10;
        this.dx = randomIntFromRange(0,5);
    }

    draw() {
        context2D.beginPath()
        context2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context2D.strokeStyle = "#2c2c2c"
        context2D.stroke()
        context2D.fillStyle = this.color
        context2D.fill()
        context2D.closePath()
    }

    update() {
        const isOnGround = (this.y + this.radius) + 100 >= canvas.height;
        if(isOnGround) {
            this.dy = -this.dy * setting.fraction
        } else {
            this.dy += setting.gravity;
            this.x += this.dx;
        }


        this.y += this.dy;
        this.draw()
    }
}

module.exports = Ball