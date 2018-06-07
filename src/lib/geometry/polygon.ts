import { Vertex, Point, intersectSegments } from '.'

export class Polygon {
	public vertexes: Vertex[]

	public intersectWithPolygon(target: Polygon): Point[] | false {
		let points: Point[] = []
		this.vertexes.forEach(vertex => {
			target.vertexes.forEach(targetVertex => {
				const intersection = intersectSegments(vertex, targetVertex)
				if (intersection) points.push(intersection)
			})
		})
		if (points.length > 0) return points
		return false
	}
}
