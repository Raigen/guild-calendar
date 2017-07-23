import * as actions from './actions'

import { Action } from 'redux'
import { EventState } from './index'

export interface EventAction<A> extends Action {
  payload: A
}

export function appointments (state: EventState, action: EventAction<any>): EventState {
  switch (action.type) {
    case actions.UPDATE_EVENT:
      const eventIndex = state.appointments.findIndex(event => event.id === action.payload.id)
      state.appointments.splice(eventIndex, 1, action.payload)
      return Object.assign({}, state)
    case 'LOAD_EVENTS':
      return Object.assign({}, state, {
        appointments: action.payload
      })
    case 'ADD_EVENT':
      return Object.assign({}, state, {
        appointments: state.appointments.concat([action.payload])
      })
    case 'REMOVE_EVENT':
      return Object.assign({}, state, {
        appointments: state.appointments.splice(state.appointments.indexOf(action.payload), 1)
      })

    case 'SELECT_DATE':
      return Object.assign({}, state, {
        selectedDate: action.payload
      })
    default:
      return state
  }
}
