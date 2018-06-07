import { Mobile } from '../mobile'
import { drawType, ctx, Point, strokeOrFill } from './'

export class Circle extends Mobile {
	static readonly type = 'Circle'
	public readonly type = Circle.type
	public strokeStyle: string
	public fillStyle: string
	public mode: drawType = 'fill'

	constructor(
		private readonly ctx: ctx,
		public radius: number = 0,
		position?: Point,
		velocity?: Point
	) {
		super(position, velocity)
	}

	public get center(): Point {
		return this.position
	}

	public getPointAtRadian(angle: number): Point {
		const { x, y } = this.position
		const r = this.radius
		return {
			x: x + r * Math.cos(angle),
			y: y + r * Math.sin(angle)
		}
	}

	public getPointAtDegree(angle: number): Point {
		return this.getPointAtRadian(degreesToRadians(angle))
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
			Math.PI * 2,
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
			Math.PI * 2,
			false
		)
		strokeOrFill(this.ctx, this.fillStyle, 'fill')
		this.ctx.closePath()
	}
}

export function degreesToRadians(degrees: number): number {
	return degrees * (Math.PI / 180)
}

export function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI)
}
