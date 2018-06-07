export interface orderedPair<T> {
	0: T
	1: T
}

export interface cartesianPair<T> {
	x: T
	y: T
}

export class Vector {
	constructor(
		public x: number,
		public y: number,
		public z?: number
	) {}
}

export class Point implements cartesianPair<number> {
	public x: number
	public y: number

	constructor(x: number, y: number)
	constructor(points: orderedPair<number>)
	constructor(pointsOrX: orderedPair<number> | number, y?: number) {
		if (typeof pointsOrX === 'number') {
			;(this.x = pointsOrX), (this.y = y)
		} else {
			this.x = pointsOrX[0]
			this.y = pointsOrX[1]
		}
	}
}
