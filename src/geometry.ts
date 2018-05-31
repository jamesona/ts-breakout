export interface orderedPair<T> {
	0: T,
	1: T
}

export interface cartesianPair<T> {
	x: T,
	y: T
}

export class Point implements cartesianPair<number>{
	public x: number
	public y: number

	constructor(x: number, y: number)
	constructor(points: orderedPair<number>)
	constructor(pointsOrX: orderedPair<number> | number, y?: number) {
		if (typeof pointsOrX === 'number') {
			this.x = pointsOrX,
				this.y = y
		} else {
			this.x = pointsOrX[0]
			this.y = pointsOrX[1]
		}
	}
}

export interface Segment {
	a: Point
	b: Point
}

export class Vertex implements Segment {
	constructor(public a: Point, public b: Point) { }

	public toPair() {
		return [this.a, this.b]
	}
}

export function degreesToRadians(degrees: number): number {
	return degrees * (Math.PI / 180)
}

export function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI)
}

export function intersectLines(
	A: Point,
	B: Point,
	C: Point,
	D: Point
): Point | null {

	// line AB as ax + by = c
	const a = B.y - A.y
	const b = A.x - B.x
	const c = a * A.x + b * A.y

	// line CD as dx + ey = f
	const d = D.y - C.y
	const e = C.x - D.x
	const f = d * C.x + e * C.y

	const determinant = a * e - d * b

	if (determinant === 0) return null

	return {
		x: (e * c - b * f) / determinant,
		y: (a * f - d * c) / determinant
	}
}

export function doLinesIntersect(
	A: Point,
	B: Point,
	C: Point,
	D: Point
): boolean {
	return intersectLines(A, B, C, D) !== null
}

export function isPointOnLine(point: Point, line: Segment): boolean {
	const {a, b} = line, c = point
	const crossproduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y)

	return Math.abs(
		( (b.y - a.y) / (b.x - a.x) * (c.x - a.x) + a.y ) - c.y
	) < 1e-6 && c.x >= a.x && c.x <= b.x
}
