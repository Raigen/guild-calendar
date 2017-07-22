import './App.css'

import * as React from 'react'

import { Calendar } from './Calendar'
import { EventList } from './EventList'
import { Provider } from 'react-redux'
import { appointments } from './store/reducer'
import { createStore } from './store'

const logo = require('./logo.svg')

const initialState = {
  appointments: [
    {
      id: 'fsdfsdfsdfds',
      title: 'Test 1',
      from: new Date(),
      to: new Date(),
      participants: []
    }
  ]
}

const store = createStore(appointments, initialState)

class App extends React.Component<any, any> {
  render () {
    return (
      <Provider store={store}>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h2>Gilden Kalender</h2>
          </div>
          <Calendar />
          <EventList />
        </div>
      </Provider>
    )
  }
}

export default App
