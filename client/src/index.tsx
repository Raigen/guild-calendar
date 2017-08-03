const initOpbeat = require('opbeat-react').default

import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

if (process.env.NODE_ENV === 'production') {
  initOpbeat({
    orgId: '23f6e12725e541fda38d8ef3bf9d927b',
    appId: '64918ad09b'
  })
}

injectTapEventPlugin()

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
