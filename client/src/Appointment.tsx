import './Appointment.css'

import * as React from 'react'

import Card from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import CardText from 'material-ui/Card/CardText'
import CardTitle from 'material-ui/Card/CardTitle'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export interface AppointmentProps extends IAppointment {
  onParticipantAdd: (name: string, eventId: string) => void
  onEventDelete: (eventId: string) => void
  isAdmin: boolean
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

  deleteEvent (eventId: string) {
    this.props.onEventDelete(eventId)
  }

  render () {
    const {title, description, participants, from, to, id} = this.props
    const isAdmin = this.props.isAdmin
    return <Card className='appointment'>
      <CardTitle
        title={title}
        subtitle={` am ${from.toLocaleDateString('de')} von ${from.toLocaleTimeString('de')} bis ${to.toLocaleTimeString('de')}`}
      />
      <CardText className='description'>
        {description}
      </CardText>
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
      {isAdmin && <CardActions>
        <FlatButton
          label='löschen'
          onClick={() => this.deleteEvent(id)}
        />
      </CardActions>}
    </Card>
  }
}
