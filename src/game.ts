import { Renderable } from './app'
import * as fromShapes from './shapes'

export class Game implements Renderable {
    private ctx: CanvasRenderingContext2D
    private ball: fromShapes.Circle

    public init(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        
        const canvasWidth = ctx.canvas.clientWidth
        const canvasHeight = ctx.canvas.clientHeight
        const startingCoords = {
            x: canvasWidth / 2,
            y: canvasHeight -30
        }

        this.ball = new fromShapes.Circle(ctx, 10, startingCoords)
    }

    public render() {
        this.ball.fill('#0095dd')
    }
}