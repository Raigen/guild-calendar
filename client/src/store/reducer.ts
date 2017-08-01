import {
  ADD_EVENT,
  AddEventAction,
  LOAD_EVENTS,
  LoadEventAction,
  SELECT_DATE,
  SelectDateAction,
  UPDATE_EVENT,
  UpdateEventAction
} from './actions'

import { EventState } from './index'

type EventAction = AddEventAction | LoadEventAction | SelectDateAction | UpdateEventAction

export function appointments (state: EventState, action: EventAction): EventState {
  switch (action.type) {
    case UPDATE_EVENT:
      const eventIndex = state.appointments.findIndex(event => event.id === action.payload.id)
      const newAppointments = state.appointments
        .filter((event, index) => index !== eventIndex)
        .concat(action.payload)
      return {
        ...state,
        appointments: newAppointments
      }
    case LOAD_EVENTS:
      return Object.assign({}, state, {
        appointments: action.payload
      })
    case ADD_EVENT:
      return Object.assign({}, state, {
        appointments: state.appointments.concat([action.payload])
      })
    // case 'REMOVE_EVENT':
    //   return Object.assign({}, state, {
    //     appointments: state.appointments.splice(state.appointments.indexOf(action.payload), 1)
    //   })

    case SELECT_DATE:
      return Object.assign({}, state, {
        selectedDate: action.payload
      })
    default:
      return state
  }
}
