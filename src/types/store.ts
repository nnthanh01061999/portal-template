export type ExtractState<S> = S extends {
  getState: () => infer T
}
  ? T
  : never

export type TZustandStore<T> = {
  state: T
  version: number
}
