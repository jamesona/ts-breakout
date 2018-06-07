import { Point } from '.'

export class Circle {

}

export function pointAtRadian(origin: Point, radius: number, angle: number): Point {
	const { x, y } = origin
	const r = radius
	return {
		x: x + r * Math.cos(angle),
		y: y + r * Math.sin(angle)
	}
}

export function pointAtDegree(origin: Point, radius: number, angle: number): Point {
	return this.pointAtRadian(origin, radius, degreesToRadians(angle))
}

export function degreesToRadians(degrees: number): number {
	return degrees * (Math.PI / 180)
}

export function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI)
}
