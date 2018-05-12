export abstract class Action {
    public readonly type: string
}

export abstract class State {
    readonly [key: string]: any
}

export type Reducer = (state: State, action: Action) => State

export interface ReducerMap {
    [key: string]: Reducer
}

export class Store {
    private past: Action[] = []
    private future: Action[] = []
    private state: State = {}
    private reducers: ReducerMap = {}

    public register(key: string, reducer: Reducer) {
        if (this.reducers[key]) return collisionError(key)
        else this.reducers[key] = reducer
    }

    public dispatch(action: Action): void {
        this.future.push(action)
        if (this.future.length === 1) this.stepForward()
    }

    public stepForward() {
        const action = this.future.shift()
        reduce(action, this.state, this.reducers)
        this.past.push(action)
    }

    public stepBack() {
        if (this.past.length === 0) return
        const action = this.past.pop()
        this.future.push(action)
        this.state = {}
        this.past.forEach(action => reduce(action, this.state, this.reducers))
    }
}

function reduce(action: Action, state: State, reducers: ReducerMap) {
    Object.keys(reducers).map(key => reducers[key]).forEach(reducer => {
        state = reducer(state, action)
    })
}

function collisionError(key: string) {
    throw new ReferenceError(`${key} is already a known slice of the global state!`)
}