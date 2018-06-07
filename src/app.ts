import { contexts, CanvasContext } from './lib/contexts'

export abstract class Renderable {
	init: (ctx: CanvasRenderingContext2D) => void
	render: () => void
}

export class App {
	private readonly body: HTMLElement = document.body
	private readonly canvas: HTMLCanvasElement = document.createElement('canvas')
	private readonly context: CanvasRenderingContext2D

	constructor(public readonly client: Renderable) {
		clearBody(this.body)
		this.body.appendChild(this.canvas)

		try {
			this.context = contexts['2D'].getContext(this.canvas)
		} catch (e) {
			document.body.innerHTML = `<h1>${e}</h1>`
			return
		}

		this.client.init(this.context)
		this.tick()
	}

	private tick(): void {
		window.requestAnimationFrame(() => this.tick())
		updateDimensions(this.canvas)
		this.context.clearRect(
			0, 0,
			this.context.canvas.clientWidth,
			this.context.canvas.clientHeight
		)
		this.client.render()
	}
}

function clearBody(body: HTMLElement): void {
	Array.from(body.children).forEach(
		child => body.removeChild(child)
	)
}

function updateDimensions(canvas: HTMLCanvasElement): void {
	canvas.width = canvas.clientWidth
	canvas.height = canvas.clientHeight
}
