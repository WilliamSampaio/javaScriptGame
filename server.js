import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.use(express.static('public'))

server.listen(3123, () => {
    console.log('> server listening! on port 3123')
})