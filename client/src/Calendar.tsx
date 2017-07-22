import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

import * as React from 'react'
import * as moment from 'moment'

import { AppointmentProps } from './Appointment'
import BigCalendar from 'react-big-calendar'
import { EventState } from './store/index'
import { connect } from 'react-redux'
import { selectDate } from './store/actions'

BigCalendar.momentLocalizer(moment)

export interface CalendarProps {
  appointments: AppointmentProps[],
  dispatch: any
}

export class RawCalendar extends React.Component<CalendarProps, any> {
  selectDate (event: any) {
    this.props.dispatch(selectDate(event.start))
  }
  render () {
    return <div className='Calendar'>
      <BigCalendar
        events={this.props.appointments}
        startAccessor='from'
        endAccessor='to'
        selectable={true}
        onSelectSlot={this.selectDate.bind(this)}
      />
    </div>
  }
}

export const Calendar = connect((rootState: EventState) => ({
  appointments: rootState.appointments
}))(RawCalendar)
