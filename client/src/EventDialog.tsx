import * as React from 'react'

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import { TimePicker } from 'material-ui-pickers'
import * as moment from 'moment'

interface EventDialogProps {
  onCreateEvent: (title: string, description: string, creator: string, from: Date, to: Date) => void
  selectedDate: Date
}

interface EventDialogState {
  open: boolean,
  from: moment.Moment,
  to: moment.Moment
}

export class EventDialog extends React.Component<EventDialogProps, EventDialogState> {
  state = {
    open: false,
    from: moment(),
    to: moment()
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
    const title = titleElement.value
    const description = descriptionElement.value
    const creator = creatorElement.value

    const fromHour = this.state.from.get('hours')
    const fromMinute = this.state.from.get('minutes')
    const toHour = this.state.to.get('hours')
    const toMinute = this.state.to.get('minutes')

    dateFrom.setHours(fromHour)
    dateFrom.setMinutes(fromMinute)
    dateTo.setHours(toHour)
    dateTo.setMinutes(toMinute)

    this.props.onCreateEvent(title, description, creator, dateFrom, dateTo)
    this.closeHandler()
  }

  render () {
    const { from, to } = this.state

    return <div className='EventDialog'>
      <h2>{this.props.selectedDate.toLocaleDateString('de')}</h2>
      <Button
        variant='raised'
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
              margin='normal'
              required
            />
            <br />
            <TextField
              label='Beschreibung'
              name='description'
              margin='normal'
              multiline
            />
            <br />
            <TimePicker
              label='Von'
              cancelLabel='Abbrechen'
              name='from'
              ampm={false}
              value={from}
              onChange={date => this.setState({ from: date })}
            />
            <br />
            <TimePicker
              label='Bis'
              cancelLabel='Abbrechen'
              name='to'
              ampm={false}
              value={to}
              onChange={date => this.setState({ to: date })}
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
