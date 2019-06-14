import React from 'react'

export default class Login extends React.Component<{}> {
  async onLogin() {
    // Stub
    console.log('onLogin')
  }

  async onForgot() {
    // Stub
    console.log('onForgot')
  }

  render() {
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
          <div>
            <input
              autoFocus
              type="text"
              style={{
                borderRadius: 4,
                border: '1px solid black',
                padding: 8,
                margin: 8,
                flex: 1,
              }}
              placeholder="email"
            />
          </div>
          <div>
            <input
              type="password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.onLogin()
                }
              }}
              style={{
                borderRadius: 4,
                border: '1px solid black',
                padding: 8,
                margin: 8,
                flex: 1,
              }}
              placeholder="password"
            />
          </div>
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
