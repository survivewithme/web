import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from './components/Header'
import { Redirect } from 'react-router'
import AuthStore from './stores/auth'

@inject('auth')
@observer
export default class Home extends React.Component<{
  auth: AuthStore
}> {
  render() {
    if (!this.props.auth.token) {
      return <Redirect to="login" />
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header />
        <div style={{ padding: 8, flex: 1, backgroundColor: 'red'}}>
          authed home
        </div>
      </div>
    )
  }
}
