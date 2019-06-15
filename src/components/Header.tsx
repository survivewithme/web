import React from 'react'
import { inject, observer } from 'mobx-react'
import AuthStore from '../stores/auth'
import Colors from '../Colors'
import Button from './Button'

@inject('auth')
@observer
export default class Header extends React.Component<{
  auth?: AuthStore
}> {
  render() {
    return (
      <div
        style={{
          height: 70,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: Colors.offWhite,
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}
        >
          <Button>Survive With Me</Button>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                backgroundColor: Colors.green,
                borderRadius: 4,
                padding: 4,
                color: Colors.offWhite,
                marginRight: 8,
              }}
            >
              {this.props.auth.token
                ? this.props.auth._activeAuth.email
                : 'Not Authenticated'}
            </div>
            <div
              style={{
                backgroundColor: Colors.green,
                borderRadius: 4,
                padding: 4,
                color: Colors.offWhite,
                cursor: 'pointer',
              }}
              onClick={() => {
                this.props.auth.logout()
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    )
  }
}
