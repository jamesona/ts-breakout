import { Point, Vector, calculateSlope } from '.'

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

export function vectorToRadians(vector: Vector) {
	return Math.atan2(vector.x, vector.y)
}

export function circleIntersectsRectangle(circle: {
	x: number, y: number, r: number
}, rect: {
	x: number, y: number, w: number, h: number
}) {
	const distX = Math.abs(circle.x - rect.x - rect.w / 2)
	const distY = Math.abs(circle.y - rect.y - rect.h / 2)

	if (distX > (rect.w / 2 + circle.r)) { return false }
	if (distY > (rect.h / 2 + circle.r)) { return false }

	if (distX <= (rect.w / 2)) { return true }
	if (distY <= (rect.h / 2)) { return true }

	const dx = distX - rect.w / 2
	const dy = distY - rect.h / 2
	return (dx * dx + dy * dy <= (circle.r * circle.r))
}
