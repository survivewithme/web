import React from 'react'
import SignupTextInput from './components/SignupTextInput'
import { inject, observer } from 'mobx-react'
import AuthStore from './stores/auth'
import { Redirect } from 'react-router'

@inject('auth')
@observer
export default class Login extends React.Component<{
  auth: AuthStore
}> {
  state = {
    email: '',
    password: '',
    redirect: false,
  }

  onLogin = async () => {
    try {
      await this.props.auth.login(this.state)
      this.setState({
        redirect: true,
      })
    } catch (err) {
      alert('There was a problem logging in.')
    }
  }

  onForgot = async () => {
    // Stub
    alert('Bummer')
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />
    }
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div>Survive With Me</div>
        <div
          style={{
            backgroundColor: '#efefef',
            borderRadius: 4,
            border: '1px solid black',
            padding: 8,
            maxWidth: 400,
            maxHeight: 200,
          }}
        >
          <SignupTextInput
            autoFocus
            type="text"
            placeholder="email"
            onChange={(e: any) => {
              this.setState({ email: e.target.value })
            }}
            value={this.state.email}
          />
          <SignupTextInput
            type="password"
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                this.onLogin()
              }
            }}
            onChange={(e: any) => {
              this.setState({ password: e.target.value })
            }}
            value={this.state.password}
            placeholder="password"
          />
          <div
            style={{
              margin: 8,
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}
          >
            <div>
              <button onClick={this.onLogin}>Login</button>
            </div>
            <div>
              <button onClick={this.onForgot}>Forgot</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
