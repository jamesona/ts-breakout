import { Mobile } from '../mobile'
import { drawType, ctx, Point, strokeOrFill } from './'

export class Rectangle extends Mobile {
	static readonly type = 'Rectangle'
	public readonly type = Rectangle.type
	public strokeStyle: string
	public fillStyle: string
	public width: number
	public height: number
	public mode: drawType = 'fill'

	constructor(
		private readonly ctx: ctx,
		dimensions: Point = {
			x: 100,
			y: 100
		},
		position?: Point,
		velocity?: Point
	) {
		super(position, velocity)
		this.width = dimensions.x
		this.height = dimensions.y
	}

	public get points(): Point[] {
		const a: Point = { x: this.position.x, y: this.position.y }
		const b: Point = { x: this.position.x + this.width, y: this.position.y }
		const c: Point = {
			x: this.position.x + this.width,
			y: this.position.y + this.height
		}
		const d: Point = {
			x: this.position.x,
			y: this.position.y + this.height
		}
		return [a, b, c, d]
	}

	public get vertices(): Point[][] {
		const points = this.points
		return [
			[points[0], points[1]],
			[points[1], points[2]],
			[points[2], points[3]],
			[points[3], points[0]]
		]
	}

	public draw(style?: string) {
		this[this.mode](style)
	}

	public stroke(style?: string) {
		if (style) this.strokeStyle = style
		this.ctx.beginPath()
		this.ctx.rect(this.position.x, this.position.y, this.width, this.height)
		strokeOrFill(this.ctx, this.strokeStyle, 'stroke')
		this.ctx.closePath()
	}

	public fill(style?: string) {
		if (style) this.fillStyle = style
		this.ctx.beginPath()
		this.ctx.rect(this.position.x, this.position.y, this.width, this.height)
		strokeOrFill(this.ctx, this.fillStyle, 'fill')
		this.ctx.closePath()
	}
}

class Dimensions extends Array<number> {
	public readonly 0: number
	public readonly 1: number
	public readonly 2: number
	public readonly 3: number
	public readonly a: number
	public readonly b: number
	public readonly c: number
	public readonly d: number
	public readonly to: Point
	public readonly from: Point

	constructor(arr: number[])
	constructor(from: Point, to: Point)
	constructor(formOrArr: Point | number[], to: Point = null) {
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
		this.a = this[0]
		this.b = this[1]
		this.c = this[2]
		this.d = this[3]
	}
}
