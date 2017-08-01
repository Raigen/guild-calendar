import * as React from 'react'

import { Card, CardText, CardTitle, Chip, FlatButton, TextField } from 'material-ui'

export interface AppointmentProps extends IAppointment {
  onParticipantAdd: (name: string, eventId: string) => void
}

interface AppointmentState {
  readonly participant: string
}

export class Appointment extends React.Component<AppointmentProps, AppointmentState> {
  state = {
    participant: ''
  }
  form: HTMLFormElement | null = null

  addParticipant (event: React.FormEvent<HTMLFormElement>) {
    event.stopPropagation()
    event.preventDefault()
    const elements: HTMLFormControlsCollection = (this.form as HTMLFormElement).elements
    const participantElement: HTMLInputElement = elements.namedItem('participant') as HTMLInputElement
    this.props.onParticipantAdd(participantElement.value, this.props.id)
    this.setState({participant: ''})
  }

  render () {
    const {title, participants, from, to} = this.props
    return <Card>
      <CardTitle
        title={title}
        subtitle={` am ${from.toLocaleDateString('de')} von ${from.toLocaleTimeString('de')} bis ${to.toLocaleTimeString('de')}`}
      />
      <CardText>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {participants.map(participant =>
          <Chip key={participant}>{participant}</Chip>
        )}
        </div>
        <div>
          <form
            method='post'
            action='#'
            name='newParticipant'
            ref={form => this.form = form}
            onSubmit={this.addParticipant.bind(this)}
          >
            <TextField
              type='text'
              floatingLabelText='Teilnehmer'
              name='participant'
              required={true}
              value={this.state.participant}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({participant: event.target.value})}
            />
            <FlatButton
              type='submit'
              label='eintragen'
            />
          </form>
        </div>
      </CardText>
    </Card>
  }
}
