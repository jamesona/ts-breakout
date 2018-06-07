export abstract class Action {
	public readonly type: Symbol
	public readonly payload?: object
}

export type Reducer<S extends object = object, A extends Action = Action> = (state: S, action: Action) => S

export type ReducerMap<S extends object, A extends Action = Action> = Map<keyof S, Reducer<S, A>>

export class Store<S extends object = object, A extends Action = Action> {
	private past: Action[] = []
	private future: Action[] = []
	private state: any

	constructor(
		private readonly reducers: ReducerMap<S, A>,
		private readonly initialState: S = {} as S,
	) {
		this.state = initialState
	}

	public register(key: any, reducer: Reducer<S, A>) {
		if (this.reducers.has(key)) return collisionError(key)
		else this.reducers.set(key, reducer)
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
		this.state = {} as S
		this.past.forEach(action => reduce(action, this.state, this.reducers))
	}
}

function reduce<A extends Action = Action, S extends object = {[k: string]: any}>(action: A, state: S, reducers: ReducerMap<S>) {
	reducers.forEach(reducer => {
		state = reducer(state, action)
	})
}

function collisionError(key: any) {
	throw new ReferenceError(`${key} is already a known slice of the global state!`)
}
