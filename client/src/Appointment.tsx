import * as React from 'react'

export interface AppointmentProps extends IAppointment {}

export class Appointment extends React.Component<AppointmentProps, object> {
  render () {
    const {title, from, to, participants} = this.props
    return <div>
      <h2>{title}</h2>
      <p>{from.toLocaleDateString('de-DE')}</p>
      <p>{from.toLocaleTimeString('de-DE')} - {to.toLocaleTimeString('de-DE')}</p>
      {participants.length > 0 && <ul>
        {participants.map(participant => <p>{participant}</p>)}
      </ul>}
    </div>
  }
}
