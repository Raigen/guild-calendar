import * as redux from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createOpbeatMiddleware } from 'opbeat-react/redux'

export interface EventState {
  appointments: IAppointment[]
}

export function createStore (reducer: redux.Reducer<EventState>, initialState: EventState): redux.Store<EventState> {
  return redux.createStore<EventState>(reducer, initialState, composeWithDevTools(
    redux.applyMiddleware(createOpbeatMiddleware())
  ))
}
