import { Mobile } from '../lib/mobile'
import { Point } from '../lib/geometry'
import { drawType, ctx, strokeOrFill } from '../lib/draw'

export class Ball extends Mobile {
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
