import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import axios from 'axios'
import Admin from './Admin'
import Login from './Login'
import UserCreate from './UserCreate'
import throttle from 'lodash.throttle'
import AuthStore from './stores/auth'
import OrganizationStore from './stores/organization'
import UserStore from './stores/user'

axios.defaults.baseURL = 'https://backend.survivewithme.now.sh'
// axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.headers['content-type'] = 'application/json'

Object.assign(document.body.style, {
  margin: 'auto',
  'font-family': 'Helvetica',
  // 'background-color': Colors.white,
  minHeight: window.innerHeight,
})

const stores = {
  auth: new AuthStore(),
  organization: new OrganizationStore(),
  user: new UserStore(),
}

const appDiv = document.getElementById('app')
const setAppStyle = () => {
  appDiv.setAttribute(
    'style',
    `
min-height: ${window.innerHeight}px;
display: flex;
`
  )
}
window.addEventListener('resize', throttle(setAppStyle, 250))
setAppStyle()

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <Route path="/admin" component={Admin} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={UserCreate} />
    </Router>
  </Provider>,
  appDiv
)
