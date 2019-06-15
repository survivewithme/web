import React from 'react'
import { inject, observer } from 'mobx-react'
import AuthStore from '../stores/auth'
import Colors from '../Colors'
import Button from './Button'

@inject('auth')
@observer
export default class Header extends React.Component<{
  screenName?: string
  auth?: AuthStore
}> {
  render() {
    return (
      <div
        style={{
          height: 70,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: Colors.white,
          borderBottom: `1px solid ${Colors.black}`,
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
          <div style={{ display: 'flex' }}>
            <Button style={{ marginRight: 8 }}>Survive With Me</Button>
            {this.props.screenName ? (
              <Button
                style={{
                  backgroundColor: Colors.black,
                  color: Colors.offWhite,
                }}
              >
                {this.props.screenName}
              </Button>
            ) : null}
          </div>
          <div style={{ display: 'flex' }}>
            <Button style={{ marginRight: 8 }}>
              {this.props.auth.token
                ? this.props.auth._activeAuth.email
                : 'Not Authenticated'}
            </Button>
            <Button
              style={{ backgroundColor: Colors.black }}
              onClick={() => {
                this.props.auth.logout()
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
