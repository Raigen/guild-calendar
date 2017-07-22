import * as React from 'react'

export interface AppointmentProps extends IAppointment {}

export class Appointment extends React.Component<AppointmentProps, object> {
  render () {
    const {title, participants, from, to} = this.props
    return <div>
      <h2>{title} am {from.toLocaleDateString('de')} von {from.toLocaleTimeString('de')} bis {to.toLocaleTimeString('de')}</h2>
      {participants.length > 0 && <ul>
        {participants.map(participant => <p>{participant}</p>)}
      </ul>}
    </div>
  }
}
