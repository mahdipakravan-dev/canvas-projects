const {randomIntFromRange} = require("../utils");

class Boundary {
    constructor({x, y, width , height, color}) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        context2D.fillStyle = this.color
        context2D.fillRect(this.x,this.y,this.width,this.height)
    }

    update() {
        this.draw()
    }
}

module.exports = Boundary