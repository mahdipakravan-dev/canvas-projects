const Boundary = require("./objects/boundary")
const Pacman = require("./objects/pacman")
const PacmanEnemy = require("./objects/pacman-enemy")
const {randomArray} = require("./utils");
const PACMAN_VELOCITY = 2

window.canvas = document.querySelector('canvas')
window.context2D = canvas.getContext('2d')
window.setting = {
    game_over : false,
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
        if(setting.key[movement]) setting.key[movement].pressed = false
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
                    color : "#919191"
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

function enemyCollidedToBoundary({enemy , boundary}) {
    return (
        enemy.y - enemy.height <= boundary.y + boundary.height &&
        enemy.x + enemy.width >= boundary.x &&
        enemy.y + enemy.height >= boundary.y &&
        enemy.x - enemy.width <= boundary.x + boundary.width
    )
}
function enemyCollidedToPlayer({player , enemy}) {
    return (
        player.y - player.radius + (player.velocity.y) <= enemy.y + enemy.height &&
        player.x + player.radius + (player.velocity.x) >= enemy.x &&
        player.y + player.radius + (player.velocity.y) >= enemy.y &&
        player.x - player.radius + (player.velocity.x) <= enemy.x + enemy.width
    )
}

const Player = new Pacman(60,60,15,"yellow")
let enemies
(function init() {
    return enemies = [
        new PacmanEnemy({
            fill : "red",
            height : 20,
            width : 20,
            innerText : "😡",
            x : 330,
            y : 130,
        }),
    ]
})()

function animate() {
    if(setting.game_over) {
        alert("GameOver")
        return;
    }
    requestAnimationFrame(animate)
    context2D.clearRect(0, 0, canvas.width, canvas.height)

    let isEnemyCollidedToPlayer = false;
    enemies.forEach((enemy , index) => {
        if (
            enemyCollidedToPlayer({
                player: {
                    ...Player,
                    // velocity: movements[key]
                },
                enemy
            })
        ) {
            isEnemyCollidedToPlayer = true;
        }
    })

    if(isEnemyCollidedToPlayer) {
        setting.game_over = true
        return
    }

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

    Player.update()

    enemies.forEach(object => {
        object.update()
    })
}
animate()
