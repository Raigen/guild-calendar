const initOpbeat = require('opbeat-react').default

import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

initOpbeat({
  orgId: '23f6e12725e541fda38d8ef3bf9d927b',
  appId: '64918ad09b'
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
