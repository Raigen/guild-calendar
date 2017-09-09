import * as React from 'react'

import { AddEventAction, AddParticipantAction, DeleteEventAction, DeleteParticipantAction } from './store/actions'
import { Dispatch, connect } from 'react-redux'
import { addEventAsync, addParticipantAsync, deleteEventAsync, deleteParticipantAsync } from './store/actions'

import { Appointment } from './Appointment'
import { EventDialog } from './EventDialog'
import { EventState } from './store/index'

export interface EventListProps {
  appointments: IAppointment[],
  selectedDate: Date,
  isAdmin: boolean,
  dispatch: Dispatch<AddEventAction | AddParticipantAction | DeleteEventAction | DeleteParticipantAction>
}

function sortByDateTime (a: IAppointment, b: IAppointment) {
  return a.from > b.from
    ? 1
    : a.from < b.from
      ? -1
      : 0
}

export class RawEventList extends React.Component<EventListProps, any> {
  addEvent (title: string, description: string, creator: string, from: Date, to: Date) {
    const { dispatch } = this.props
    dispatch(addEventAsync({
      title,
      description,
      from,
      to,
      participants: [creator]
    }))
  }

  addParticipant (name: string, eventId: string) {
    const { dispatch } = this.props
    dispatch(addParticipantAsync(name, eventId))
  }

  deleteParticipant (name: string, eventId: string) {
    const { dispatch } = this.props
    dispatch(deleteParticipantAsync(name, eventId))
  }

  deleteEvent (eventId: string) {
    const { dispatch } = this.props
    dispatch(deleteEventAsync(eventId))
  }

  render () {
    const { appointments, selectedDate, isAdmin } = this.props
    const events = appointments
      // first only get all events from the selected month
      .filter(event => event.from.getMonth() === selectedDate.getMonth())
      // second only get all events from the selected day
      .filter(event => event.from.getDate() === selectedDate.getDate())
      .sort(sortByDateTime)

    return <div className='EventList'>
      <EventDialog
        onCreateEvent={this.addEvent.bind(this)}
        selectedDate={selectedDate}
      />
      <ul className='event-list'>
        {events.map(event => (
          <Appointment
            key={event.id}
            id={event.id}
            from={event.from}
            to={event.to}
            participants={event.participants}
            title={event.title}
            description={event.description}
            onParticipantAdd={this.addParticipant.bind(this)}
            onParticipantDelete={this.deleteParticipant.bind(this)}
            onEventDelete={this.deleteEvent.bind(this)}
            isAdmin={isAdmin}
          />
        ))}
      </ul>
    </div>
  }
}

export const EventList = connect((rootState: EventState) => ({
  appointments: rootState.appointments,
  selectedDate: rootState.selectedDate,
  isAdmin: rootState.isAdmin
}))(RawEventList)
