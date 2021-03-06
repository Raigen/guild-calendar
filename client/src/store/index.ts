import * as redux from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createOpbeatMiddleware } from 'opbeat-react/redux'
import thunk from 'redux-thunk'

export interface EventState {
  readonly appointments: ReadonlyArray<IAppointment>
  readonly selectedDate: Date | undefined
  readonly isAdmin: boolean
}

export function createStore (reducer: redux.Reducer<EventState>, initialState: EventState): redux.Store<EventState> {
  return redux.createStore<EventState>(reducer, initialState, composeWithDevTools(
    redux.applyMiddleware(createOpbeatMiddleware(), thunk)
  ))
}
