import * as React from 'react'

import { Appointment, AppointmentProps } from './Appointment'

import { EventState } from './store/index'
import { connect } from 'react-redux'

export interface EventListProps {
  appointments: AppointmentProps[],
  dispatch: any
}

export class RawEventList extends React.Component<EventListProps, any> {
  render () {
    const events = this.props.appointments.filter(event => event)
    return <div style={{width: '49%', display: 'inline-block'}}>
      <ul className='event-list'>
        {events.map(event => (
          <Appointment
            key={event.title}
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
  appointments: rootState.appointments
}))(RawEventList)
