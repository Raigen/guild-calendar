import * as React from 'react'

import { AddEventAction, AddParticipantAction } from './store/actions'
import { Appointment, AppointmentProps } from './Appointment'
import { Dispatch, connect } from 'react-redux'
import { addEventAsync, addParticipantAsync } from './store/actions'

import { EventDialog } from './EventDialog'
import { EventState } from './store/index'

export interface EventListProps {
  appointments: AppointmentProps[],
  selectedDate: Date,
  dispatch: Dispatch<AddEventAction | AddParticipantAction>
}

export class RawEventList extends React.Component<EventListProps, any> {
  addEvent (title: string, creator: string, from: Date, to: Date) {
    const { dispatch } = this.props
    dispatch(addEventAsync({
      title,
      from,
      to,
      participants: [creator]
    }))
  }

  addParticipant (name: string, eventId: string) {
    const { dispatch } = this.props
    dispatch(addParticipantAsync(name, eventId))
  }

  render () {
    const { appointments, selectedDate } = this.props
    const events = appointments.filter(event => event.from.getDate() === selectedDate.getDate())
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
            onParticipantAdd={this.addParticipant.bind(this)}
          />
        ))}
      </ul>
    </div>
  }
}

export const EventList = connect((rootState: EventState) => ({
  appointments: rootState.appointments,
  selectedDate: rootState.selectedDate
}))(RawEventList)
