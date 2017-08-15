import './App.css'

import * as React from 'react'

import { loadEventsAsync, setAdmin } from './store/actions'

import { Calendar } from './Calendar'
import { EventList } from './EventList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import { appointments } from './store/reducer'
import { createStore } from './store'

const logo = require('./logo.svg')

const initialState = {
  appointments: [],
  selectedDate: new Date(),
  isAdmin: false
}

const store = createStore(appointments, initialState)
store.dispatch(loadEventsAsync())
const urlSearchParams = new URLSearchParams(document.location.search)
if (urlSearchParams.has('admin') && urlSearchParams.get('admin') === 'DEG') {
  store.dispatch(setAdmin(true))
}

class App extends React.Component<any, any> {
  render () {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className='App'>
            <div className='App-header'>
              <img src={logo} className='App-logo' alt='logo' />
              <h2>Die Entdecker Gold Kalender</h2>
            </div>
            <Calendar />
            <EventList />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
