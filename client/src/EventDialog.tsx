import * as React from 'react'

import { Dialog, FlatButton, RaisedButton, TextField } from 'material-ui'

interface EventDialogProps {
  onCreateEvent: (title: string, creator: string) => void
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
    const elements: HTMLFormControlsCollection = (this.form as HTMLFormElement).elements
    const titleElement: HTMLInputElement = elements.namedItem('title') as HTMLInputElement
    const CreatorElement: HTMLInputElement = elements.namedItem('creator') as HTMLInputElement
    const title = titleElement.value
    const creator = CreatorElement.value
    this.props.onCreateEvent(title, creator)
    this.closeHandler()
  }

  render () {
    const actions = [
      <FlatButton label='Speichern' onTouchTap={this.saveNewEvent.bind(this)} />,
      <FlatButton label='Abbrechen' onTouchTap={this.closeHandler.bind(this)} />
    ]
    return <div className='EventDialog'>
      <RaisedButton
        label='Neues Event'
        onTouchTap={this.openHandler.bind(this)}
       />
      <Dialog
        title='Neues Event'
        open={this.state.open}
        actions={actions}
      >
        <form method='post' name='eventForm' ref={form => this.form = form}>
          <TextField
            floatingLabelText='Ersteller'
            name='creator'
          />
          <br />
          <TextField
            floatingLabelText='Eventname'
            name='title'
          />
        </form>
      </Dialog>
    </div>
  }
}
