const {randomIntFromRange} = require("../utils");

class Tile {
    constructor({x, y, width , height, fill , border , innerText , type}) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.fill = fill
        this.border = border
        this.innerText = innerText
        this.type = type
    }

    draw() {
        if(this.border) {
            context2D.strokeStyle = this.border
        }
        if(this.fill) {
            context2D.fillStyle = this.fill
        }
        context2D.fillRect(this.x,this.y,this.width,this.height)

        if(this.innerText) {
            context2D.fillStyle = '#000'; // Black text color
            context2D.font = '10px Arial'; // Set the font size and type
            context2D.textAlign = 'center'; // Center the text horizontally
            context2D.textBaseline = 'middle'; // Center the text vertically
            context2D.fillText(this.innerText, this.x + this.width / 2, this.y + this.height / 2); // Display text in the center
        }
    }

    update() {
        this.draw()
    }
}

module.exports = Tile