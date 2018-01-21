import './Appointment.css'

import * as React from 'react'

import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card'

import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

export interface AppointmentProps extends IAppointment {
  onParticipantAdd: (name: string, eventId: string) => void
  onParticipantDelete: (name: string, eventId: string) => void
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
    this.setState({ participant: '' })
  }

  deleteParticipant (participant: string, eventId: string) {
    this.props.onParticipantDelete(participant, eventId)
  }

  deleteEvent (eventId: string) {
    this.props.onEventDelete(eventId)
  }

  render () {
    const { title, description, participants, from, to, id } = this.props
    const isAdmin = this.props.isAdmin
    const getOnRequestDeleteHandler: Function | null = (participant: string) => {
      if (!isAdmin) return null
      return () => this.deleteParticipant(participant, id)
    }
    return <Card className='appointment'>
      <CardHeader
        title={title}
        subheader={` am ${from.toLocaleDateString('de')} von ${from.toLocaleTimeString('de')} bis ${to.toLocaleTimeString('de')}`}
      />
      <CardContent>
        <Typography className='description' component='p'>
          {description}
        </Typography>
        <Typography component='div'>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {participants.map(participant =>
            <Chip
              key={participant}
              label={participant}
              onDelete={getOnRequestDeleteHandler(participant)}
            />
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
                label='Teilnehmer'
                name='participant'
                required={true}
                value={this.state.participant}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ participant: event.target.value })}
              />
              <Button
                type='submit'
              >eintragen</Button>
            </form>
          </div>
        </Typography>
      </CardContent>
      {isAdmin && <CardActions>
        <Button
          onClick={() => this.deleteEvent(id)}
        >loeschen</Button>
      </CardActions>}
    </Card>
  }
}
