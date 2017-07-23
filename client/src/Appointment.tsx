import * as React from 'react'

import { Card, CardText, CardTitle, Chip } from 'material-ui'

export interface AppointmentProps extends IAppointment {}

export class Appointment extends React.Component<AppointmentProps, object> {
  render () {
    const {title, participants, from, to} = this.props
    return <Card>
      <CardTitle
        title={title}
        subtitle={` am ${from.toLocaleDateString('de')} von ${from.toLocaleTimeString('de')} bis ${to.toLocaleTimeString('de')}`}
      />
      <CardText style={{display: 'flex', flexWrap: 'wrap'}}>
        {participants.map(participant =>
          <Chip key={participant}>{participant}</Chip>
        )}
      </CardText>
    </Card>
  }
}
