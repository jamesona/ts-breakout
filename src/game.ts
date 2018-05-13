import { Renderable } from './app'
import * as fromShapes from './shapes'
import { cartesianPair } from './mobile';

const CONFIG = {
    ballRadius: 10,
    ballSpeed: 5,
    ballColor: '#0095dd',
    paddleHeight: 10,
    paddleWidth: 100,
    paddleFloat: 10,
    paddleSpeed: 7,
    paddleColor: '#0095dd',
    brickRows: 6,
    brickColumns: 12,
    brickWidth: 'auto',
    brickHeight: 'auto',
    brickPadding: 10,
    brickHits: 1,
    brickColors: [
        '#0095dd',
        '#00db6e',
        '#49db00',
        '#dbb700',
        '#db0000',
        '#db00b7',
    ]
}

interface BrickData {
    hits: number
    rect: fromShapes.Rectangle
}

export class Game implements Renderable {
    private ctx: CanvasRenderingContext2D
    private ball: fromShapes.Circle
    private paddle: fromShapes.Rectangle
    private bricks: BrickData[][]
    private previousVelocity: cartesianPair
    private leftPressed: boolean = false
    private rightPressed: boolean = false
    private started: boolean = false
    private paused: boolean = true

    public init(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx

        this.initPaddle()
        this.initBall()
        this.initBricks()

        document.addEventListener(
            'keydown',
            (e) => this.onKeyDown(e),
            false
        )
        document.addEventListener(
            'keyup',
            (e) => this.onKeyUp(e),
            false
        )
    }

    public render() {
        const resolution = {
            x: this.ctx.canvas.clientWidth,
            y: this.ctx.canvas.clientHeight
        }
        
        this.paddle.updateScaling(resolution)
        this.ball.updateScaling(resolution)

        if (!this.paused || !this.started) {
            this.detectPaddleMovement()
        }
        if (!this.paused) {
            this.ball.move()
            this.detectWallCollision()
            this.detectBrickCollision()
        }
        
        this.paddle.draw()
        this.ball.draw()
        this.drawBricks()
    }

    public resume() {
        this.started = true
        this.paused = false
        this.ball.velocity = this.previousVelocity
    }

    public pause() {
        this.paused = true
        this.previousVelocity = this.ball.velocity
        this.ball.velocity = {x: 0, y: 0}
    }

    public end() {
        this.paused = true
        alert('Game Over!')
    }

    private onKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 32) {
            if (this.paused) this.resume()
            else this.pause()
        }
        else if(event.keyCode == 39) {
            this.rightPressed = true
        }
        else if(event.keyCode == 37) {
            this.leftPressed = true
        }
    }

    private onKeyUp(event: KeyboardEvent) {
        if(event.keyCode == 39) {
            this.rightPressed = false
        }
        else if(event.keyCode == 37) {
            this.leftPressed = false
        }
    }

    private detectPaddleMovement() {
        const width = this.ctx.canvas.clientWidth
        let ballOffset = 0

        if (this.rightPressed) {
            this.paddle.position.x += CONFIG.paddleSpeed

            const rightEdge = this.paddle.position.x + this.paddle.width
            ballOffset = CONFIG.paddleSpeed
            
            if (rightEdge > width) {
                this.paddle.position.x = width - this.paddle.width
                ballOffset -= rightEdge - width
            }            
        }
        if (this.leftPressed) {
            this.paddle.position.x -= CONFIG.paddleSpeed

            const leftEdge = this.paddle.position.x + 0
            ballOffset = -CONFIG.paddleSpeed

            if(leftEdge < 0) {
                this.paddle.position.x = 0
                ballOffset += 0 - leftEdge
            }
        }

        if (!this.started) {
            this.ball.position.x += ballOffset
        }
    }

    private detectWallCollision() {
        const { position, velocity } = this.ball
        const height = this.ctx.canvas.clientHeight - this.ball.radius
        const width = this.ctx.canvas.clientWidth - this.ball.radius
        const paddleEdge = height - CONFIG.paddleFloat - CONFIG.paddleHeight
        const paddleLeftEdge = this.paddle.position.x
        const paddleRightEdge = this.paddle.position.x + this.paddle.width
        const ballRightEdge = position.x + this.ball.radius
        const ballLeftEdge = position.x - this.ball.radius

        if (position.x + velocity.x < this.ball.radius ||
            position.x + velocity.x > width) {
            velocity.x = -velocity.x
        }
        
        else if (position.y + velocity.y < this.ball.radius) {
            velocity.y = -velocity.y
        }

        else if (position.y + velocity.y > paddleEdge) {
            if (
                ballRightEdge > paddleLeftEdge &&
                ballLeftEdge < paddleRightEdge
            ) {
                velocity.y = -velocity.y
                const diff = this.paddle.position.x - position.x
                const percent = diff / this.paddle.width
                const factor = Math.abs(Math.round(percent) - percent)
                if (Math.round(percent)) {
                    velocity.x = (1 - factor) * CONFIG.ballSpeed
                } else [
                    velocity.x = -(1 - factor) * CONFIG.ballSpeed
                ]
            }

            else if (position.y + velocity.y > height) {
                this.end()
            }
        }
    }

    private detectBrickCollision() {
        this.bricks.forEach((row, r) => {
            row.forEach((column, c) => {
                const brick = this.bricks[r][c]
                const b = brick.rect.position
                const {width, height} = brick.rect
                const {x, y} = this.ball.position

                if (
                    x > b.x &&
                    x < b.x + width &&
                    y > b.y &&
                    y < b.y + height
                ) {
                    this.ball.velocity.x = -this.ball.velocity.x
                    this.ball.velocity.y = -this.ball.velocity.y
                    brick.hits -= 1
                }
            })
        })
    }

    private initBall() {
        const canvasWidth = this.ctx.canvas.clientWidth
        const canvasHeight = this.ctx.canvas.clientHeight
        const startingCoords = {
            x: canvasWidth / 2,
            y: (
                canvasHeight
                - CONFIG.paddleHeight
                - CONFIG.paddleFloat
                - CONFIG.ballRadius
            )
        }
        this.previousVelocity = {
            x: 0,
            y: -CONFIG.ballSpeed
        }
        this.ball = new fromShapes.Circle(
            this.ctx, CONFIG.ballRadius,
            startingCoords, this.previousVelocity
        )
        this.ball.fillStyle = CONFIG.ballColor
    }

    private initPaddle() {
        const canvasWidth = this.ctx.canvas.clientWidth
        const canvasHeight = this.ctx.canvas.clientHeight
        const startingCoords = {
            x: (canvasWidth - CONFIG.paddleWidth) / 2,
            y: (
                canvasHeight
                - CONFIG.paddleHeight
                - CONFIG.paddleFloat
            )
        }
        const dimensions = {
            x: CONFIG.paddleWidth,
            y: CONFIG.paddleHeight
        }

        this.paddle = new fromShapes.Rectangle(
            this.ctx,
            dimensions,
            startingCoords
        )

        this.paddle.fillStyle = CONFIG.paddleColor
    }

    private initBricks() {
        this.bricks = Array(CONFIG.brickRows).fill(null).map(
            () => Array(CONFIG.brickColumns).fill(null).map(
                () => ({
                    hits: CONFIG.brickHits,
                    rect: new fromShapes.Rectangle(this.ctx)
                })
            )
        )
    }

    private drawBricks() {
        const padding = CONFIG.brickPadding
        const rows = CONFIG.brickRows
        const columns = CONFIG.brickColumns
        const colors = CONFIG.brickColors

        const clientWidth = this.ctx.canvas.clientWidth
        const clientHeight = this.ctx.canvas.clientHeight

        const areaWidth = clientWidth - (padding * 2)
        const areaHeight = clientHeight / 2 - padding

        const totalHorzPadding = (columns - 1) * padding
        const totalVertPadding = (rows - 1) * padding

        const brickWidth = (areaWidth - totalHorzPadding) / columns
        const brickHeight = (areaHeight - totalVertPadding) / rows

        const unitWidth = brickWidth + padding
        const unitHeight = brickHeight + padding

        this.bricks.forEach((row, r) => {
            row.forEach((column, c) => {
                const brick = this.bricks[r][c]
                if (brick.hits === 0) {
                    brick.rect.position = {
                        x: -1,
                        y: -1
                    }
                    brick.rect.width = brick.rect.height = 0
                    return
                }
                brick.rect.width = brickWidth
                brick.rect.height = brickHeight
                brick.rect.position = {
                    x: unitWidth * c + padding,
                    y: unitHeight * r + padding
                }
                brick.rect.draw(colors[brick.hits - 1])
            })
        })
    }
}