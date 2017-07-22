import * as React from 'react'

import { Appointment, AppointmentProps } from './Appointment'
import { Dispatch, connect } from 'react-redux'

import { EventAction } from './store/reducer'
import { EventState } from './store/index'
import { addEventAsync } from './store/actions'

export interface EventListProps {
  appointments: AppointmentProps[],
  selectedDate: Date,
  dispatch: Dispatch<EventAction<IAppointment>>
}

export class RawEventList extends React.Component<EventListProps, any> {
  addEvent () {
    const { dispatch } = this.props
    dispatch(addEventAsync({
      id: 'sdgdsfsfdsfds',
      title: 'test',
      from: new Date(),
      to: new Date(),
      participants: []
    }))
  }
  render () {
    const { appointments, selectedDate } = this.props
    const events = appointments.filter(event => event.from.getDate() === selectedDate.getDate())
    return <div className='EventList'>
      <button onClick={this.addEvent.bind(this)}>Add Event</button>
      <ul className='event-list'>
        {events.map(event => (
          <Appointment
            key={event.id}
            id={event.id}
            from={event.from}
            to={event.to}
            participants={event.participants}
            title={event.title}
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
