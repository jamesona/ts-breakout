import { Mobile } from '../lib/mobile'
import { Point, Vertex } from '../lib/geometry'
import { drawType, ctx, strokeOrFill } from '../lib/draw'

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

	public get center(): Point {
		return {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}
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

	public get vertices(): Vertex[] {
		const points = this.points
		return [
			new Vertex(points[0], points[1]),
			new Vertex(points[1], points[2]),
			new Vertex(points[2], points[3]),
			new Vertex(points[3], points[0])
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
