// @flow
declare module Reducer {
  declare type State<T> = { [key: string]: * };
  declare type Action<T> = { type: string, payload?: *, error?: Error | string };
  declare type ReducerFn<T> = (state: *, action: *) => *;
}
