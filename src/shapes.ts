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

    constructor(
        private readonly ctx: ctx,
        position?: cartesianPair,
        vector?: cartesianPair
    ) {
        super(position, vector)
    }

    public get coords(): Dimensions {
        const from = {...this.position}
        const to = {...this.position}
        to.x += this.width
        to.y += this.height

        return new Dimensions(from, to)
    }

    public stroke(style?: string) {
        if (style) this.strokeStyle = style
        this.ctx.beginPath()
        this.ctx.rect.apply(this.ctx, this.coords)
        strokeOrFill(this.ctx, this.strokeStyle, 'stroke')
        this.ctx.closePath()
    }

    public fill(style?: string) {
        if (style) this.fillStyle = style
        this.ctx.beginPath()
        this.ctx.rect.apply(this.ctx, this.coords)
        strokeOrFill(this.ctx, this.fillStyle, 'fill')
        this.ctx.closePath()
    }
}

export class Circle extends Mobile {
    public strokeStyle: string
    public fillStyle: string

    constructor(
        private readonly ctx: ctx,
        public diameter: number = 0,
        position?: cartesianPair,
        vector?: cartesianPair
    ) {
        super(position, vector)
    }

    public stroke(style?: string) {
        if (style) this.strokeStyle = style
        this.ctx.beginPath()
        this.ctx.arc(
            this.position.x,
            this.position.y,
            this.diameter,
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
            this.diameter,
            0,
            Math.PI*2,
            false
        )
        strokeOrFill(this.ctx, this.fillStyle, 'fill')
        this.ctx.closePath()
    }
}