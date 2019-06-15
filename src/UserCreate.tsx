import React from 'react'
import { inject, observer } from 'mobx-react'
import SignupTextInput from './components/SignupTextInput'
import AuthStore from './stores/auth'
import queryString from 'query-string'
import { Redirect } from 'react-router'

@inject('auth')
@observer
export default class CoachCreate extends React.Component<{
  auth: AuthStore
  location: any
}> {
  state = {
    username: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
    email: '',
    redirect: false,
  }

  onSignUp = async () => {
    try {
      const { token, organizationId } = queryString.parse(
        this.props.location.search
      )
      console.log(this.state, token)
      await this.props.auth.createUser({
        ...this.state,
        token: token as string,
        organizationId: organizationId as string,
      })
      this.setState({ redirect: true })
    } catch (err) {
      alert('There was a problem creating your account.')
    }
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
        <div>Signup</div>
        <div
          style={{
            backgroundColor: '#efefef',
            borderRadius: 4,
            border: '1px solid black',
            padding: 8,
            maxWidth: 400,
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
            placeholder="password"
            onChange={(e: any) => {
              this.setState({ password: e.target.value })
            }}
            value={this.state.password}
          />
          <SignupTextInput
            type="password"
            placeholder="confirm"
            onChange={(e: any) => {
              this.setState({ passwordConfirm: e.target.value })
            }}
            value={this.state.passwordConfirm}
          />
          <SignupTextInput
            type="text"
            placeholder="First Name"
            onChange={(e: any) => {
              this.setState({ firstname: e.target.value })
            }}
            value={this.state.firstname}
          />
          <SignupTextInput
            type="text"
            onChange={(e: any) => {
              this.setState({ lastname: e.target.value })
            }}
            value={this.state.lastname}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.onSignUp()
              }
            }}
            placeholder="Last Name"
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
              <button onClick={this.onSignUp}>Create Account</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
