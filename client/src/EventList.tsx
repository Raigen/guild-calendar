import * as React from 'react'

import { Appointment, AppointmentProps } from './Appointment'
import { Dispatch, connect } from 'react-redux'

import { EventAction } from './store/reducer'
import { EventState } from './store/index'
import { addEventAsync } from './store/actions'

export interface EventListProps {
  appointments: AppointmentProps[],
  dispatch: Dispatch<EventAction>
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
    const events = this.props.appointments.filter(event => event)
    return <div style={{width: '49%', display: 'inline-block'}}>
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
  appointments: rootState.appointments
}))(RawEventList)
