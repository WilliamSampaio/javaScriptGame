import express from 'express'
import { createServer } from 'http'
import createGame from './public/game.js'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const socketio = new Server(server)

app.use(express.static('public'))

const game = createGame()

// game.addPlayer({ name: 'William', position: { x: 0, y: 0 } })
// game.addFruit({ position: { x: 20, y: 9 } })
// game.addFruit({ position: { x: 10, y: 5 } })

console.log(game.players)

socketio.on('connection', (socket) => {
    const playerId = socket.id
    console.log('Server: Player conectado! ' + playerId)

    socketio.emit('setup', { players: game.players, fruits: game.fruits, canvas: game.canvas })
})

server.listen(3000, () => {
    console.log('> server listening! on port 3000')
})