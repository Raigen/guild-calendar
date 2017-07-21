import { Action } from 'redux'
import { EventState } from './index'

export interface EventAction extends Action {
  payload: IAppointment
}

export function appointments (state: EventState, action: EventAction): EventState {
  switch (action.type) {
    case 'ADD_EVENT':
      return Object.assign({}, state, {
        events: state.appointments.concat([action.payload])
      })
    case 'REMOVE_EVENT':
      return Object.assign({}, state, {
        events: state.appointments.splice(state.appointments.indexOf(action.payload), 1)
      })
    default:
      return state
  }
}
