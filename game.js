export default function createGame(canvasSize) {

    const players = [
        // { name: 'p_1', position: { x: 1, y: 2 } },
        // { name: 'p_2', position: { x: 9, y: 9 } },
    ]
    const fruits = [
        // { position: { x: 5, y: 5 } }
    ]
    const canvas = {
        width: canvasSize !== undefined ? canvasSize.width : 25,
        height: canvasSize !== undefined ? canvasSize.height : 10
    }

    function addPlayer(command) {
        players.push({
            name: command.name,
            position: command.position
        })
    }

    function removePlayer(command) {
        players.splice(command.playerId, 1)
    }

    function addFruit(command) {
        fruits.push({
            position: command.position
        })
    }

    function removeFruit(command) {
        fruits.splice(command.fruitId, 1)
    }

    // metodo que atualiza a posicao de player
    function movePlayer(command) {
        const keyPressed = command.keyPressed
        const player = players[command.playerId]

        const acceptedMoves = {
            ArrowUp(player) {
                player.position.y - 1 >= 0 ? player.position.y -= 1 : ''
            },
            ArrowRight(player) {
                player.position.x + 1 < canvas.width ? player.position.x += 1 : ''
            },
            ArrowDown(player) {
                player.position.y + 1 < canvas.height ? player.position.y += 1 : ''
            },
            ArrowLeft(player) {
                player.position.x - 1 >= 0 ? player.position.x -= 1 : ''
            }
        }

        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkCollision()
        }
    }

    function checkCollision() {
        for (const playerId in players) {
            for (const fruitId in fruits) {
                if (
                    players[playerId].position.x == fruits[fruitId].position.x &&
                    players[playerId].position.y == fruits[fruitId].position.y
                ) {
                    removeFruit({ fruitId: fruitId })
                    return true
                }
            }
        }
        return false
    }

    // retorna os artefatos
    return {
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        players,
        fruits,
        canvas
    }
}