import * as React from 'react'

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
// import TimePicker from 'material-ui/TimePicker'
import { TimePicker } from 'material-ui-time-picker'

interface EventDialogProps {
  onCreateEvent: (title: string, description: string, creator: string, from: Date, to: Date) => void
  selectedDate: Date
}

interface EventDialogState {
  open: boolean
}

export class EventDialog extends React.Component<EventDialogProps, EventDialogState> {
  state = {
    open: false
  }

  form: HTMLFormElement | null = null

  openHandler () {
    this.setState({ open: true })
  }

  closeHandler () {
    this.setState({ open: false })
  }

  saveNewEvent () {
    const dateFrom = new Date(this.props.selectedDate.toDateString())
    const dateTo = new Date(this.props.selectedDate.toDateString())
    const elements: HTMLFormControlsCollection = (this.form as HTMLFormElement).elements
    const titleElement: HTMLInputElement = elements.namedItem('title') as HTMLInputElement
    const descriptionElement: HTMLInputElement = elements.namedItem('description') as HTMLInputElement
    const creatorElement: HTMLInputElement = elements.namedItem('creator') as HTMLInputElement
    const fromElement: HTMLInputElement = elements.namedItem('from') as HTMLInputElement
    const toElement: HTMLInputElement = elements.namedItem('to') as HTMLInputElement
    const title = titleElement.value
    const description = descriptionElement.value
    const creator = creatorElement.value

    const fromHour = Number.parseInt(fromElement.value.substr(0, 2), 10)
    const fromMinute = Number.parseInt(fromElement.value.substr(3, 2), 10)
    const toHour = Number.parseInt(toElement.value.substr(0, 2), 10)
    const toMinute = Number.parseInt(toElement.value.substr(3, 2), 10)

    dateFrom.setHours(fromHour)
    dateFrom.setMinutes(fromMinute)
    dateTo.setHours(toHour)
    dateTo.setMinutes(toMinute)

    this.props.onCreateEvent(title, description, creator, dateFrom, dateTo)
    this.closeHandler()
  }

  render () {
    return <div className='EventDialog'>
      <h2>{this.props.selectedDate.toLocaleDateString('de')}</h2>
      <Button
        raised
        onClick={this.openHandler.bind(this)}
       >Neues Event</Button>
      <Dialog
        open={this.state.open}
        onClose={this.closeHandler.bind(this)}
      >
        <DialogTitle>{`Neues Event am ${this.props.selectedDate.toLocaleDateString('de')}`}</DialogTitle>
        <DialogContent>
          <form method='post' action='#' name='eventForm' ref={form => this.form = form}>
            <TextField
              label='Ersteller'
              required
              name='creator'
            />
            <br />
            <TextField
              label='Eventname'
              name='title'
              required
            />
            <br />
            <TextField
              label='Beschreibung'
              name='description'
              multiline
            />
            <TimePicker
              name='from'
              hintText='Von'
              minutesStep={5}
              mode='24h'
            />
            <TimePicker
              name='to'
              hintText='Bis'
              minutesStep={5}
              mode='24h'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.saveNewEvent.bind(this)} >Speichern</Button>
          <Button onClick={this.closeHandler.bind(this)} >Abbrechen</Button>
        </DialogActions>
      </Dialog>
    </div>
  }
}
