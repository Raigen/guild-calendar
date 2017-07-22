import { Dispatch } from 'redux'
import { EventAction } from './reducer'

export const ADD_EVENT = 'ADD_EVENT'
export function addEvent (data: IAppointment): EventAction {
  return {
    type: ADD_EVENT,
    payload: data
  }
}
export function addEventAsync (event: IAppointment) {
  return (dispatch: Dispatch<EventAction>) => {
    fetch('http://localhost:3001/api/appointments', {
      method: 'post',
      body: event,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => ({
      ...data,
      from: new Date(data.from),
      to: new Date(data.to)
    }))
    .then(data => dispatch(addEvent(data)))
    .catch(error => {
      console.log(error)
    })
  }
}
