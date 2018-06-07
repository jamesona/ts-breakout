import { Point } from './geometry'

export abstract class Mobile {
	public readonly move = () => {
		this.position.x += this.velocity.x * this.scaling.x
		this.position.y += this.velocity.y * this.scaling.y
	}

	public readonly accelerate = (difference: Point) => {
		this.velocity.x += difference.x
		this.velocity.y += difference.y
	}

	public readonly updateScaling = (resolution: Point) => {
		this.scaling.x = resolution.x / 100
		this.scaling.y = resolution.y / 100
	}

	constructor(
		public position: Point, 
		public velocity: Point = {x: 0, y: 0},
		public scaling?: Point
	) {
		if (!scaling) this.updateScaling = () => {}
		this.scaling = {x: 1, y: 1}
	}
}
