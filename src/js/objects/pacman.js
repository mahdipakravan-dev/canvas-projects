
class Pacman {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x : 0,
            y : 0
        }
    }

    draw() {
        context2D.beginPath();
        context2D.arc(this.x, this.y, this.radius, 0.2 * Math.PI, 1.8 * Math.PI);
        context2D.lineTo(this.x, this.y);
        context2D.fillStyle = this.color;
        context2D.fill();
        context2D.closePath();

        // Draw the eye
        context2D.beginPath();
        context2D.arc(this.x - this.radius * 0.4, this.y - this.radius * 0.3, this.radius * 0.1, 0, 2 * Math.PI);
        context2D.fillStyle = 'black';
        context2D.fill();
        context2D.closePath();
    }

    update(context, canvas) {
        this.draw(context);

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

module.exports = Pacman