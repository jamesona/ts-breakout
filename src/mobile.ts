export interface cartesianPair {
    x: number,
    y: number
}

export abstract class Mobile {
    public readonly move = () => {
        this.position.x += this.velocity.x * this.scaling.x
        this.position.y += this.velocity.y * this.scaling.y
    }

    public readonly accelerate = (difference: cartesianPair) => {
        this.velocity.x += difference.x
        this.velocity.y += difference.y
    }

    public readonly updateScaling = (resolution: cartesianPair) => {
        this.scaling.x = resolution.x / 100
        this.scaling.y = resolution.y / 100
    }

    constructor(
        public position: cartesianPair, 
        public velocity: cartesianPair = {x: 0, y: 0},
        public scaling?: cartesianPair
    ) {
        if (!scaling) this.updateScaling = () => {}
        this.scaling = {x: 1, y: 1}
    }
}