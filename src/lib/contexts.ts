export interface ContextFactoryMap {
	[key: string]: {
		[key: string]: Function,
		getContext: <T>(canvas: HTMLCanvasElement) => T
	}
}

export const contexts = {
	'2D': {
		getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
			return canvas.getContext('2d')
		}
	},
	'WebGL': {
		getContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
			const gl = canvas.getContext("webgl")
		
			if (!gl) throw new Error(
				'Unable to initialize WebGL!' +
				'Your browser or machine may not support it.'
			)
			return gl
		},
		clear(gl: WebGLRenderingContext) {
			gl.clearColor(0.0, 0.0, 0.0, 1.0)
			gl.clear(gl.COLOR_BUFFER_BIT)
		}
	}
}

export type CanvasContext =
	WebGLRenderingContext |
	CanvasRenderingContext2D
