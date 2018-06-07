import { Point } from './point'

export interface Segment {
	a: Point
	b: Point
}

export class Vertex implements Segment {
	constructor(public a: Point, public b: Point) {}

	public toPair() {
		return [this.a, this.b]
	}

	public slope() {
		return calculateSlope(this.a, this.b)
	}
}

export class Line {
	public static fromSegment(segment: Segment): Line {
		const m = calculateSlope(segment.a, segment.b)
		return new Line(m, segment.a)
	}

	public static fromPoints(a: Point, b: Point) {
		return Line.fromSegment({a, b})
	}

	constructor(public slope: number, public origin: Point) {}
}

export function calculateSlope(a: Point, b: Point) {
	return (b.y - a.y) / (b.x - a.x)
}


export function intersectSegments(segA: Segment, segB: Segment): Point | null {
	const A = segA.a, B = segA.b, C = segB.a, D = segB.b
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

export function isPointOnLine(point: Point, line: Segment): boolean {
	const { a, b } = line,
		c = point
	const crossproduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y)

	return (
		Math.abs((b.y - a.y) / (b.x - a.x) * (c.x - a.x) + a.y - c.y) < 1e-6 &&
		c.x >= a.x &&
		c.x <= b.x
	)
}
