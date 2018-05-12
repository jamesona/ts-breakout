import { Renderable } from './app'
import * as fromShapes from './shapes'
import { cartesianPair } from './mobile';

const CONFIG = {
    ballRadius: 10,
    ballSpeed: 5,
    ballColor: '#0095dd',
    paddleHeight: 20,
    paddleWidth: 100,
    paddleFloat: 10,
    paddleColor: '#0095dd'
}

export class Game implements Renderable {
    private ctx: CanvasRenderingContext2D
    private ball: fromShapes.Circle
    private previousVelocity: cartesianPair
    private paddle: fromShapes.Rectangle
    private leftPressed: boolean = false
    private rightPressed: boolean = false
    private paused: boolean = true

    public init(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx

        this.initPaddle()
        this.initBall()

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

        if (this.paused) {
            
        } else {
            this.detectPaddleMovement()
            this.ball.move()
            this.detectWallCollision()
        }
        
        this.paddle.draw()
        this.ball.draw()
    }

    public resume() {
        this.paused = false
        this.ball.velocity = this.previousVelocity
    }

    public pause() {
        this.paused = true
        this.previousVelocity = this.ball.velocity
        this.ball.velocity = {x: 0, y: 0}
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
        if (this.rightPressed) {
            this.paddle.position.x += 7
        }
        if (this.leftPressed) {
            this.paddle.position.x -= 7
        }
    }

    private detectWallCollision() {
        const { position, velocity } = this.ball
        const height = this.ctx.canvas.clientHeight - this.ball.radius
        const width = this.ctx.canvas.clientWidth - this.ball.radius

        if (position.x + velocity.x < this.ball.radius ||
            position.x + velocity.x > width) {
            velocity.x = -velocity.x
        }
        
        if (position.y + velocity.y < this.ball.radius ||
            position.y + velocity.y > height) {
            velocity.y = -velocity.y
        }
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
            x: Math.random() * (Math.round(Math.random()) ? 2 : -2),
            y: Math.random() * -2
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
}