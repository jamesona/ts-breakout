import { Mobile, cartesianPair } from './mobile'

class Dimensions extends Array<number> {
    public readonly 0: number
    public readonly 1: number
    public readonly 2: number
    public readonly 3: number
    public readonly to: cartesianPair
    public readonly from: cartesianPair

    constructor(arr: number[])
    constructor(from: cartesianPair, to: cartesianPair)
    constructor(formOrArr: cartesianPair|number[], to: cartesianPair = null) {
        if (Array.isArray(formOrArr)) {
            const dimArr = formOrArr
            super(...dimArr)
            this.from = {
                x: this[0],
                y: this[1]
            }
            this.to = {
                x: this[2],
                y: this[3]
            }
        } else {
            const from = formOrArr
            super(from.x, from.y, to.x, to.y)

            this.from = from
            this.to = to
        }
    }
}
type ctx = CanvasRenderingContext2D
type drawType = 'stroke'|'fill'

function strokeOrFill(ctx: ctx, color: string, mode: drawType) {
    let style
    switch (mode) {
        case 'stroke': {
            style = ctx.strokeStyle
            ctx.strokeStyle = color
            ctx.stroke()
            ctx.strokeStyle = style
        }
        case 'fill': {
            style = ctx.fillStyle
            ctx.fillStyle = color
            ctx.fill()
            ctx.fillStyle = style
        }
    }
}

export class Rectangle extends Mobile {
    public strokeStyle: string
    public fillStyle: string
    public width: number
    public height: number
    public mode: drawType = 'fill'

    constructor(
        private readonly ctx: ctx,
        dimensions: cartesianPair = {
            x: 100, y: 100
        },
        position?: cartesianPair,
        velocity?: cartesianPair
    ) {
        super(position, velocity)
        this.width = dimensions.x
        this.height = dimensions.y
    }

    public draw(style?: string) {
        this[this.mode](style)
    }
    
    public stroke(style?: string) {
        if (style) this.strokeStyle = style
        this.ctx.beginPath()
        this.ctx.rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        strokeOrFill(this.ctx, this.strokeStyle, 'stroke')
        this.ctx.closePath()
    }

    public fill(style?: string) {
        if (style) this.fillStyle = style
        this.ctx.beginPath()
        this.ctx.rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        strokeOrFill(this.ctx, this.fillStyle, 'fill')
        this.ctx.closePath()
    }
}

export class Circle extends Mobile {
    public strokeStyle: string
    public fillStyle: string
    public mode: drawType = 'fill'

    constructor(
        private readonly ctx: ctx,
        public radius: number = 0,
        position?: cartesianPair,
        velocity?: cartesianPair
    ) {
        super(position, velocity)
    }

    public draw(style?: string) {
        this[this.mode](style)
    }

    public stroke(style?: string) {
        if (style) this.strokeStyle = style
        this.ctx.beginPath()
        this.ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI*2,
            false
        )
        strokeOrFill(this.ctx, this.strokeStyle, 'stroke')
        this.ctx.closePath()
    }
    
    public fill(style?: string) {
        if (style) this.fillStyle = style
        this.ctx.beginPath()
        this.ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI*2,
            false
        )
        strokeOrFill(this.ctx, this.fillStyle, 'fill')
        this.ctx.closePath()
    }
}