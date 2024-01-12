const {randomIntFromRange} = require("../utils");

class Boundary {
    constructor({x, y, width , height, color , image}) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.image = image
    }

    draw() {
        context2D.fillStyle = this.color
        context2D.fillRect(this.x,this.y,this.width,this.height)

        context2D.drawImage(this.image , this.x , this.y)
    }

    update() {
        this.draw()
    }
}

module.exports = Boundary