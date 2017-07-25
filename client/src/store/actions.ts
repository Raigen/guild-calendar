import { Dispatch } from 'redux'

// const hostname: string = 'http://localhost:3001'
const hostname: string = ''

export type ADD_EVENT = 'appointments/ADD_EVENT'
export const ADD_EVENT: ADD_EVENT = 'appointments/ADD_EVENT'
export type AddEventAction = {
  type: ADD_EVENT,
  payload: IAppointment
}
export function addEvent (data: IAppointment): AddEventAction {
  return {
    type: ADD_EVENT,
    payload: data
  }
}
export function addEventAsync (event: INewAppointment) {
  return (dispatch: Dispatch<AddEventAction>) => {
    fetch(`${hostname}/api/appointments`, {
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

export type UPDATE_EVENT = 'appointments/UPDATE_EVENT'
export const UPDATE_EVENT: UPDATE_EVENT = 'appointments/UPDATE_EVENT'
type UpdateEventAction = {
  type: UPDATE_EVENT,
  payload: IAppointment
}
export function updateEvent (data: IAppointment): UpdateEventAction {
  return {
    type: UPDATE_EVENT,
    payload: data
  }
}

export type LOAD_EVENTS = 'appointments/LOAD_EVENTS'
export const LOAD_EVENTS: LOAD_EVENTS = 'appointments/LOAD_EVENTS'
export type LoadEventAction = {
  type: LOAD_EVENTS,
  payload: IAppointment[]
}
export function loadEvents (data: IAppointment[]): LoadEventAction {
  return {
    type: LOAD_EVENTS,
    payload: data
  }
}
export function loadEventsAsync () {
  return (dispatch: Dispatch<LoadEventAction>) => {
    fetch(`${hostname}/api/appointments`, {
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

export type ADD_PARTICIPANT = 'appointments/ADD_PARTICIPANT'
export const ADD_PARTICIPANT: ADD_PARTICIPANT = 'appointments/ADD_PARTICIPANT'
export type AddParticipantAction = {
  type: ADD_PARTICIPANT,
  payload: string
}
export function addParticipantAsync (participant: string, eventId: string) {
  return (dispatch: Dispatch<UpdateEventAction>) => {
    fetch(`${hostname}/api/appointments/${eventId}/participant`, {
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

export type SELECT_DATE = 'calendar/SELECT_DATE'
export const SELECT_DATE: SELECT_DATE = 'calendar/SELECT_DATE'
export type SelectDateAction = {
  type: SELECT_DATE,
  payload: Date
}
export function selectDate (date: Date): SelectDateAction {
  return {
    type: SELECT_DATE,
    payload: date
  }
}
