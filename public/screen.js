export default function renderScreen(screen, game, requestAnimationFrame) {
    screen.setAttribute('width', game.canvas.width)
    screen.setAttribute('height', game.canvas.height)
    const context = screen.getContext('2d')
    context.clearRect(0, 0, game.canvas.width, game.canvas.height)

    game.players.forEach(player => {
        context.fillStyle = 'yellow'
        context.fillRect(player.position.x, player.position.y, 1, 1)
    })
    game.fruits.forEach(fruit => {
        context.fillStyle = 'green'
        context.fillRect(fruit.position.x, fruit.position.y, 1, 1)
    })

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame)
    })
}