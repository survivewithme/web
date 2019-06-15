import React from 'react'
import { inject, observer } from 'mobx-react'
import SignupTextInput from './components/SignupTextInput'
import AuthStore from './stores/auth'
import queryString from 'query-string'
import { Redirect } from 'react-router'
import UserStore from './stores/user'

@inject('auth', 'user')
@observer
export default class CoachCreate extends React.Component<{
  auth: AuthStore
  user: UserStore
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
    isReferral: false,
    referringOrganization: {},
  }

  async componentDidMount() {
    const { token } = queryString.parse(this.props.location.search)
    if (!token) return
    const parsed = await this.props.user.parseSignupToken(token as string)
    this.setState({
      isReferral: true,
      referringOrganization: parsed.organization,
    })
  }

  onSignUp = async () => {
    try {
      const { token } = queryString.parse(this.props.location.search)
      await this.props.auth.createUser({
        ...this.state,
        token: (token as string) || '',
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
        <div style={{ margin: 8 }}>Signup</div>
        <div
          style={{
            backgroundColor: '#efefef',
            borderRadius: 4,
            border: '1px solid black',
            padding: 8,
            maxWidth: 300,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {this.state.isReferral ? (
            <div style={{ margin: 8 }}>
              Organization: {this.state.referringOrganization.name}
            </div>
          ) : null}
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
            onKeyPress={(e: any) => {
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
