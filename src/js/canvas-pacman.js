const Boundary = require("./objects/boundary")
const Pacman = require("./objects/pacman")
const PACMAN_VELOCITY = 2

window.canvas = document.querySelector('canvas')
window.context2D = canvas.getContext('2d')
window.setting = {
    gravity : 1,
    fraction : 0.88,
    key : {
        last_key : undefined,
        w : {
            pressed : false,
        },
        a : {
            pressed : false,
        },
        d : {
            pressed : false,
        },
        s : {
            pressed : false,
        }
    },
    velocity : {
        collided : false,
        x : 0,
        y : 0
    }
}

canvas.width = innerWidth - 10
canvas.height = innerHeight - 10

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const movements = {
    'w': { x: 0, y: -5 },
    'a': { x: -5, y: 0 },
    's': { x: 0, y: 5 },
    'd': { x: 5, y: 0 }
};

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})
addEventListener("keydown" , ({key}) => {
    Object.keys(movement => {
        setting.key[movement].pressed = false
    })
    setting.key[key].pressed = true
    setting.key.last_key = key
})

const map = [
    ["-","-","-","-","-","-","-","-","-","-"],
    ["-","","","","","","","","","-"],
    ["-","","-","-","","","-","-","","-"],
    ["-","","","","","","","","","-"],
    ["-","-","-","-","-","-","-","-","-","-"],
]
const boundaries = []

map.forEach((row,rowIndex) => {
    row.forEach((item,itemIndex) => {
        switch (item) {
            case "-" : {
                boundaries.push(new Boundary({
                    x : itemIndex * 40,
                    y : rowIndex * 40,
                    width : 40,
                    height : 40,
                    color : "red"
                }))
            }
        }
    })
})

function pacmanCollidedToBoundary({player , boundary}) {
    return (
        player.y - player.radius + (player.velocity.y) <= boundary.y + boundary.height &&
        player.x + player.radius + (player.velocity.x) >= boundary.x &&
        player.y + player.radius + (player.velocity.y) >= boundary.y &&
        player.x - player.radius + (player.velocity.x) <= boundary.x + boundary.width
    )
}

const Player = new Pacman(60,60,15,"yellow")
let objects
function init() {
    objects = [
    ]
}
function animate() {
    requestAnimationFrame(animate)
    context2D.clearRect(0, 0, canvas.width, canvas.height)


    Object.keys(movements).forEach(key => {
        if (setting.key[key].pressed && setting.key.last_key === key) {

            let collisionDetected = false;
            boundaries.forEach(boundary => {
                if (
                    pacmanCollidedToBoundary({
                        player: {
                            ...Player,
                            velocity: movements[key]
                        },
                        boundary
                    })
                ) {
                    collisionDetected = true;
                }
            });

            if (collisionDetected) {
                Player.velocity.y = 0;
                Player.velocity.x = 0;
            } else {
                Player.velocity = {
                    x : movements[key]["x"],
                    y : movements[key]["y"]
                }
            }
        }
    });

    boundaries.forEach(boundary => {
        boundary.draw()

    })

    // if(setting.key.s.pressed && setting.key.last_key === "s") {
    //     setting.velocity.y = PACMAN_VELOCITY
    // }
    // if(setting.key.a.pressed && setting.key.last_key === "a") {
    //     setting.velocity.x = -PACMAN_VELOCITY
    // }
    // if(setting.key.d.pressed && setting.key.last_key === "d") {
    //     setting.velocity.x = PACMAN_VELOCITY
    // }
    Player.update()

    objects.forEach(object => {
        object.update()
    })
}

init()
animate()