import { Action } from 'redux'
import { EventState } from './index'

export interface EventAction<A> extends Action {
  payload: A
}

export function appointments (state: EventState, action: EventAction<any>): EventState {
  switch (action.type) {
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
    default:
      return state
  }
}
