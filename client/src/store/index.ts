import * as redux from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import { createOpbeatMiddleware } from 'opbeat-react/redux'
import thunk from 'redux-thunk'

export interface EventState {
  appointments: IAppointment[],
  selectedDate: Date | undefined
}

export function createStore (reducer: redux.Reducer<EventState>, initialState: EventState): redux.Store<EventState> {
  return redux.createStore<EventState>(reducer, initialState, composeWithDevTools(
    redux.applyMiddleware(createOpbeatMiddleware(), thunk)
  ))
}
