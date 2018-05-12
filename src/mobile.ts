export interface cartesianPair {
    x: number,
    y: number
}

export abstract class Mobile {
    public readonly move = () => {
        this.position.x += this.vector.x
        this.position.y += this.vector.y
    }

    public readonly accelerate = (difference: cartesianPair) => {
        this.vector.x += difference.x
        this.vector.y += difference.y
    }

    constructor(
        public position: cartesianPair, 
        public vector: cartesianPair = {x: 0, y: 0}
    ) {}
}