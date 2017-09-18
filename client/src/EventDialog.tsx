import * as React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'

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
    this.setState({open: true})
  }

  closeHandler () {
    this.setState({open: false})
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
    const actions = [
      <FlatButton label='Speichern' onClick={this.saveNewEvent.bind(this)} />,
      <FlatButton label='Abbrechen' onClick={this.closeHandler.bind(this)} />
    ]
    return <div className='EventDialog'>
      <h2>{this.props.selectedDate.toLocaleDateString('de')}</h2>
      <RaisedButton
        label='Neues Event'
        onClick={this.openHandler.bind(this)}
       />
      <Dialog
        title={`Neues Event am ${this.props.selectedDate.toLocaleDateString('de')}`}
        open={this.state.open}
        actions={actions}
      >
        <form method='post' action='#' name='eventForm' ref={form => this.form = form}>
          <TextField
            floatingLabelText='Ersteller'
            required
            name='creator'
          />
          <br />
          <TextField
            floatingLabelText='Eventname'
            name='title'
            required
          />
          <br />
          <TextField
            floatingLabelText='Beschreibung'
            name='description'
            multiLine
          />
          <TimePicker
            name='from'
            hintText='Von'
            minutesStep={5}
            format='24hr'
          />
          <TimePicker
            name='to'
            hintText='Bis'
            minutesStep={5}
            format='24hr'
          />
        </form>
      </Dialog>
    </div>
  }
}
