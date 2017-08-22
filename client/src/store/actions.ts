import { EventState } from './index'
import { Dispatch as ReduxDispatch } from 'redux'

export type Dispatch = ReduxDispatch<EventState>

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
  return (dispatch: Dispatch) => {
    fetch('/api/appointments', {
      method: 'post',
      body: JSON.stringify(event),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then<IAppointmentJSON>(res => res.json())
    .then<IAppointment>(data => ({
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
export type UpdateEventAction = {
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
  return (dispatch: Dispatch) => {
    fetch('/api/appointments', {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then<IAppointmentJSON[]>(res => res.json())
    .then<IAppointment[]>(data => data.map<IAppointment>(app => ({
      ...app,
      from: new Date(app.from),
      to: new Date(app.to)
    })))
    .then(data => dispatch(loadEvents(data)))
    .catch(error => {
      console.log(error)
    })
  }
}

export type DELETE_EVENT = 'appointment/DELETE_EVENT'
export const DELETE_EVENT: DELETE_EVENT = 'appointment/DELETE_EVENT'
export type DeleteEventAction = {
  type: DELETE_EVENT,
  payload: string
}
export function deleteEvent (eventId: string): DeleteEventAction {
  return {
    type: DELETE_EVENT,
    payload: eventId
  }
}
export function deleteEventAsync (eventId: string) {
  return (dispatch: Dispatch) => {
    fetch(`/api/appointments/${eventId}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => dispatch(deleteEvent(eventId)))
    .catch(error => console.log(error))
  }
}

export type ADD_PARTICIPANT = 'appointments/ADD_PARTICIPANT'
export const ADD_PARTICIPANT: ADD_PARTICIPANT = 'appointments/ADD_PARTICIPANT'
export type AddParticipantAction = {
  type: ADD_PARTICIPANT,
  payload: string
}
export function addParticipantAsync (participant: string, eventId: string) {
  return (dispatch: Dispatch) => {
    fetch(`/api/appointments/${eventId}/participant`, {
      method: 'post',
      body: JSON.stringify({participant}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then<IAppointmentJSON>(res => res.json())
    .then<IAppointment>(data => ({
      ...data,
      from: new Date(data.from),
      to: new Date(data.to)
    }))
    .then(data => dispatch(updateEvent(data)))
    .catch(error => {
      console.log(error)
    })
  }
}

export type DELETE_PARTICIPANT = 'appointments/DELETE_PARTICIPANT'
export const DELETE_PARTICIPANT: DELETE_PARTICIPANT = 'appointments/DELETE_PARTICIPANT'
export type DeleteParticipantAction = {
  type: DELETE_PARTICIPANT,
  payload: string
}
export function deleteParticipantAsync (participant: string, eventId: string) {
  return (dispatch: Dispatch) => {
    fetch(`/api/appointments/${eventId}/participant/${participant}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    .then<IAppointmentJSON>(res => res.json())
    .then<IAppointment>(data => ({
      ...data,
      from: new Date(data.from),
      to: new Date(data.to)
    }))
    .then(data => dispatch(updateEvent(data)))
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

export type SET_ADMIN = 'admin/SET_ADMIN'
export const SET_ADMIN: SET_ADMIN = 'admin/SET_ADMIN'
export type SetAdminAction = {
  type: SET_ADMIN,
  payload: boolean
}
export function setAdmin (active: boolean): SetAdminAction {
  return {
    type: SET_ADMIN,
    payload: active
  }
}
