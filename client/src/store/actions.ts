import { Dispatch } from 'redux'
import { EventAction } from './reducer'

export const ADD_EVENT = 'ADD_EVENT'
export function addEvent (data: IAppointment): EventAction<IAppointment> {
  return {
    type: ADD_EVENT,
    payload: data
  }
}
export function addEventAsync (event: INewAppointment) {
  return (dispatch: Dispatch<EventAction<INewAppointment>>) => {
    fetch('/api/appointments', {
      method: 'post',
      body: JSON.stringify(event),
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

export const UPDATE_EVENT = 'UPDATE_EVENT'
export function updateEvent (data: IAppointment): EventAction<IAppointment> {
  return {
    type: UPDATE_EVENT,
    payload: data
  }
}

export const LOAD_EVENTS = 'LOAD_EVENTS'
export function loadEvents (data: IAppointment[]): EventAction<IAppointment[]> {
  return {
    type: LOAD_EVENTS,
    payload: data
  }
}
export function loadEventsAsync () {
  return (dispatch: Dispatch<EventAction<IAppointment[]>>) => {
    fetch('/api/appointments', {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data: any[]) => data.map(app => ({
      ...app,
      from: new Date(app.from),
      to: new Date(app.to)
    })))
    .then((data: IAppointment[]) => dispatch(loadEvents(data)))
    .catch(error => {
      console.log(error)
    })
  }
}

export const ADD_PARTICIPANT = 'ADD_PARTICIPANT'
export function addParticipantAsync (participant: string, eventId: string) {
  return (dispatch: Dispatch<EventAction<string>>) => {
    fetch(`/api/appointments/${eventId}/participant`, {
      method: 'post',
      body: JSON.stringify({participant}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data: any) => ({
      ...data,
      from: new Date(data.from),
      to: new Date(data.to)
    }))
    .then((data: IAppointment) => dispatch(updateEvent(data)))
    .catch(error => {
      console.log(error)
    })
  }
}

export const SELECT_DATE = 'SELECT_DATE'
export function selectDate (date: Date) {
  return {
    type: SELECT_DATE,
    payload: date
  }
}
