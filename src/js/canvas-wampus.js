const Tile = require("./objects/tile")
const Pacman = require("./objects/pacman")
const PACMAN_VELOCITY = 2

/*
* Performance Measure :
*   WIN : +1000 gold
*   LOSE : -1000 heart
* Environment :
*   ✓ Squares adjacent to wumpus are smelly
*   ✓ Squares adjacent to pit are breezy
*   ✓ Glitter iff gold is in the same square
*   ✓ Shooting kills wumpus if you are facing it
*   ✓ Shooting uses up the only arrow
* Sensors :
*   Stench next to Wumpus
*   Breeze next to pit
*   Glitter in square with gold
*   Bump when agent moves into a wall
*  Actuators :
*   Left turn,
*   Right turn,
*   Forward,
*   Grab,
*   Release,
*   Shoo
* */


window.canvas = document.querySelector('canvas')
window.context2D = canvas.getContext('2d')
window.setting = {
    game_over : false,
    game_win : false,
    velocity : {
        collided : false,
        x : 0,
        y : 0
    }
}

canvas.width = innerWidth - 10
canvas.height = innerHeight - 10

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

const stateEnum = {
    blank : "",
    stench : "ST",
    breeze : "BR",
    gold : "GL",
    pit : "PIT",
    target : "WAMPUS",
}
const map = [
    [stateEnum.stench,"",stateEnum.breeze,stateEnum.pit],
    [stateEnum.target,stateEnum.breeze,stateEnum.pit,stateEnum.breeze],
    [stateEnum.stench,"",stateEnum.breeze,""],
    ["",stateEnum.breeze,stateEnum.pit,stateEnum.breeze],
]
const boundaries = []

const TILE_WIDTH = 39;
const TILE_HEIGHT = 39;
const MAP_WIDTH = map[0].length * TILE_WIDTH
const MAP_HEIGHT = map.length * TILE_HEIGHT
map.forEach((row,rowIndex) => {
    row.forEach((item,itemIndex) => {
        const sharedProps = {
            x : itemIndex * 40,
            y : rowIndex * 40,
            width : TILE_WIDTH,
            height : TILE_HEIGHT,
            fill : "#c8c9cc",
            type : item,
        }
        switch (item) {
            case stateEnum.pit : {
                boundaries.push(new Tile({
                    ...sharedProps,
                    innerText : "🕳️"
                }))
                break;
            }
            case stateEnum.breeze : {
                boundaries.push(new Tile({
                    ...sharedProps,
                    innerText : "💨"
                }))
                break;
            }
            case stateEnum.stench : {
                boundaries.push(new Tile({
                    ...sharedProps,
                    innerText : "🍃"
                }))
                break;
            }
            case stateEnum.target : {
                boundaries.push(new Tile({
                    ...sharedProps,
                    innerText : "🎯"
                }))
                break;
            }
            default:
                boundaries.push(new Tile({
                    ...sharedProps,
                    innerText : item
                }))
        }
    })
})

/*
* eg : {
*   ["w,h"] : "PIT"
* }
* */
const knowledge = {}

const MOVEMENT_X = 40
const MOVEMENT_Y = 40
function pacmanInsideBoundary({ player, boundary }) {
    return (
        (player.x + player.radius <= boundary.x + boundary.width) &&
        (player.x >= boundary.x) &&
        player.y + player.radius <= boundary.y + boundary.height &&
        player.y - player.radius >= boundary.y
    );
}

let player_last_x = 20
let player_last_y = 140
let player_last_move;
const Player = new Pacman(20,140,15,"red")
let objects
(function init() {
    return objects = [
    ]
})()

function animate() {
    if(setting.game_over) {
        Player.x = 20
        player_last_x = 20
        Player.y = 140
        player_last_y = 140
        setting.game_over = false;
        alert("GameOver")
    }
    if(setting.game_win) {
        alert("You Won the Game")
        return
    }
    context2D.clearRect(0, 0, canvas.width, canvas.height)

    boundaries.forEach(boundary => {
        boundary.draw()
    })

    Player.update()

    objects.forEach(object => {
        object.update()
    })

    let next_move = "right"
    boundaries.forEach(boundary => {
        if(pacmanInsideBoundary({player : Player, boundary})) {
            if(!knowledge[`${Player.x},${Player.y}`])
                knowledge[`${Player.x},${Player.y}`] = boundary.type;

            //check current tile
            switch (boundary.type) {
                case stateEnum.blank : {
                    break;
                }
                case stateEnum.breeze: {
                    break;
                }
                case stateEnum.stench: {
                    // Player.y += 40
                    break;
                }
                case stateEnum.pit: {
                    setting.game_over = true
                    break;
                }
                case stateEnum.gold: {
                    break;
                }
                case stateEnum.target: {
                    setting.game_win = true
                    break;
                }
            }

            //check knowledge for next movement

            function isSafeInKnowledge(indexStr) {
                if(knowledge[indexStr] === stateEnum.pit) {
                    return false;
                }
                return true
            }
            function isDetectedInKnowledge(indexStr) {
                return Boolean(knowledge[indexStr])
            }

            const canGoTop = Player.y - MOVEMENT_Y >= 0
            const canGoDown = Player.y + MOVEMENT_Y < MAP_HEIGHT
            const canGoLeft = Player.x - MOVEMENT_X >= 0
            const canGoRight = Player.x + MOVEMENT_X < MAP_WIDTH

            const topIndex = `${Player.x},${Player.y - MOVEMENT_Y}`;
            const downIndex = `${Player.x},${Player.y + MOVEMENT_Y}`;
            const leftIndex = `${Player.x - MOVEMENT_X},${Player.y}`;
            const rightIndex = `${Player.x + MOVEMENT_X},${Player.y}`;

            function checkForNextMove() {
                let right_point = 30;
                let left_point = 30;
                let down_point = 30;
                let top_point = 30;

                if(canGoRight && isSafeInKnowledge(rightIndex)) {
                    if(player_last_move === "left") right_point -= 10
                    if(isDetectedInKnowledge(rightIndex)) right_point -= 10
                } else {
                    right_point = 0;
                }
                if(canGoLeft && isSafeInKnowledge(leftIndex)) {
                    if(player_last_move === "right") left_point -= 10
                    if(isDetectedInKnowledge(leftIndex)) left_point -= 10
                } else {
                    left_point = 0;
                }
                if(canGoTop && isSafeInKnowledge(topIndex)) {
                    if(player_last_move === "down") top_point -= 10
                    if(isDetectedInKnowledge(topIndex)) top_point -= 10
                } else {
                    top_point = 0;
                }
                if(canGoDown && isSafeInKnowledge(downIndex)) {
                    if(player_last_move === "top") down_point -= 10
                    if(isDetectedInKnowledge(downIndex)) down_point -= 10
                } else {
                    down_point = 0;
                }

                const maxPoint = Math.max(right_point, left_point, down_point, top_point);

                if (maxPoint === right_point) {
                    return "right";
                } else if (maxPoint === left_point) {
                    return "left";
                } else if (maxPoint === down_point) {
                    return "down";
                } else if (maxPoint === top_point) {
                    return "top";
                }

            }
            next_move = checkForNextMove()
        }
    });

    if(next_move === "right") Player.x += MOVEMENT_X
    if(next_move === "left") Player.x -= MOVEMENT_X
    if(next_move === "down") Player.y += MOVEMENT_Y
    if(next_move === "top") Player.y -= MOVEMENT_Y

    player_last_move = next_move

    setTimeout(animate , 1000)
}
animate()
