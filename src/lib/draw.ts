export type ctx = CanvasRenderingContext2D
export type drawType = 'stroke' | 'fill'

export function strokeOrFill(ctx: ctx, color: string, mode: drawType) {
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
