import React from 'react'
import SignupTextInput from './SignupTextInput'

export default class CoachCreate extends React.Component<{}> {
  onSignUp = () => {}

  render() {
    console.log(this.props.location.search)
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
        <div>Coach Signup</div>
        <div
          style={{
            backgroundColor: '#efefef',
            borderRadius: 4,
            border: '1px solid black',
            padding: 8,
            maxWidth: 400,
          }}
        >
          <SignupTextInput autoFocus type="text" placeholder="email" />
          <SignupTextInput
            type="password"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.onLogin()
              }
            }}
            placeholder="password"
          />
          <SignupTextInput
            type="password"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.onLogin()
              }
            }}
            placeholder="confirm"
          />
          <SignupTextInput type="text" placeholder="First Name" />
          <SignupTextInput type="text" placeholder="Last Name" />
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
